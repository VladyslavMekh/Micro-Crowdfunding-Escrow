use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};

use crate::constants::*;
use crate::errors::EscrowError;
use crate::state::{Campaign, ContributorRecord};

#[derive(Accounts)]
pub struct Refund<'info> {
    #[account(mut)]
    pub donor: Signer<'info>,

    #[account(
        seeds = [
            CAMPAIGN_SEED,
            campaign.key().as_ref(),
            &campaign.campaign_id.to_le_bytes(),
        ],
        bump = campaign.bump,
    )]
    pub campaign: Account<'info, Campaign>,

    #[account(
        mut,
        seeds = [VAULT_SEED, campaign.key().as_ref()],
        bump = campaign.vault_bump,
    )]
    /// CHECK: Data-less PDA vault managed exclusively via seeds/bump.
    pub vault: UncheckedAccount<'info>,

    #[account(
        mut,
        close = donor,
        seeds = [CONTRIBUTOR_SEED, campaign.key().as_ref(), donor.key().as_ref()],
        bump = contributor_record.bump,
        constraint = contributor_record.donor == donor.key() @ EscrowError::Unauthorized,
    )]
    pub contributor_record: Account<'info, ContributorRecord>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<Refund>) -> Result<()> {
    let now = Clock::get()?.unix_timestamp;
    let campaign = &ctx.accounts.campaign;

    require!(campaign.is_expired(now), EscrowError::CampaignStillActive);
    require!(!campaign.is_goal_reached(), EscrowError::TargetAlreadyReached);

    let refund_amount = ctx.accounts.contributor_record.amount;
    require!(refund_amount > 0, EscrowError::NothingToRefund);

    let vault_balance = ctx.accounts.vault.lamports();
    require!(
        vault_balance >= refund_amount,
        EscrowError::InsufficientVaultBalance
    );

    let campaign_key = ctx.accounts.campaign.key();
    let vault_bump = campaign.vault_bump;
    let vault_seeds: &[&[u8]] = &[VAULT_SEED, campaign_key.as_ref(), &[vault_bump]];
    let signer_seeds: &[&[&[u8]]] = &[vault_seeds];

    // Refund funds to the donor from the Vault PDA (the program sings on its own behalf)
    let cpi_accounts = Transfer {
        from: ctx.accounts.vault.to_account_info(),
        to: ctx.accounts.donor.to_account_info(),
    };
    let cpi_ctx = CpiContext::new_with_signer(
        ctx.accounts.system_program.key(),
        cpi_accounts,
        signer_seeds,
    );
    transfer(cpi_ctx, refund_amount)?;

    msg!(
        "Donor {} refunded with {} lamports. Contributor Record will be closed,",
        ctx.accounts.donor.key(),
        refund_amount
    );
    msg!("rent exemption fees are automatically returned via close = donor.");

    // close = donor` in the account attributes will automatically close
    // the contributor_record and return the rent lamports to the donor at the end of the instruction.

    Ok(())
}
