use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};

use crate::constants::*;
use crate::errors::EscrowError;
use crate::state::{Campaign, ContributorRecord};

#[derive(Accounts)]
pub struct Donate<'info> {
    #[account(mut)]
    pub donor: Signer<'info>,

    #[account(
        mut,
        seeds = [
            CAMPAIGN_SEED,
            campaign.creator.key().as_ref(),
            &campaign.campaign_id.to_le_bytes()
        ],
        bump = campaign.bump,
        constraint = !campaign.is_finalized @ EscrowError::CampaignAlreadyFinalized,
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
        init_if_needed,
        payer = donor,
        space = ContributorRecord::SPACE,
        seeds = [CONTRIBUTOR_SEED, campaign.key().as_ref(), donor.key().as_ref()],
        bump,
    )]
    pub contributor_record: Account<'info, ContributorRecord>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<Donate>, amount: u64) -> Result<()> {
    let now = Clock::get()?.unix_timestamp;
    let campaign = &ctx.accounts.campaign;

    require!(!campaign.is_expired(now), EscrowError::CampaignExpired);
    require!(amount >= MIN_DONATION_LAMPORTS, EscrowError::DonationTooSmall);

    // CPI transfer of SOL from the donor's wallet to the Vault PDA
    let cpi_accounts = Transfer {
        from: ctx.accounts.donor.to_account_info(),
        to: ctx.accounts.vault.to_account_info(),
    };
    let cpi_ctx = CpiContext::new(ctx.accounts.system_program.key(), cpi_accounts);
    transfer(cpi_ctx, amount)?;

    // Update the contributor's record
    let contributor_record = &mut ctx.accounts.contributor_record;
    contributor_record.donor = ctx.accounts.donor.key();
    contributor_record.campaign = ctx.accounts.campaign.key();
    contributor_record.bump = ctx.bumps.contributor_record;
    contributor_record.amount = contributor_record
        .amount
        .checked_add(amount)
        .ok_or(EscrowError::MathOverflow)?;

    //Update the total accumulated amount for the campaign
    let campaign = &mut ctx.accounts.campaign;
    campaign.current_amount = campaign
        .current_amount
        .checked_add(amount)
        .ok_or(EscrowError::MathOverflow)?;

    msg!(
        "Donor {} contributed {} lamports. Total raised: {}/{}.",
        contributor_record.donor,
        amount,
        campaign.current_amount,
        campaign.target_amount
    );

    Ok(())
}