use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};

use crate::constants::*;
use crate::errors::EscrowError;
use crate::state::Campaign;

#[derive(Accounts)]
pub struct ClaimFunds<'info> {
    #[account(
        mut,
        constraint = creator.key() == campaign.creator @ EscrowError::Unauthorized,
    )]
    pub creator: Signer<'info>,

    #[account(
        mut,
        seeds = [
            CAMPAIGN_SEED,
            campaign.creator.as_ref(),
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
    /// CHECK: Data-less PDA vault managet exclusively via seeds/bump.
    pub vault: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<ClaimFunds>) -> Result<()> {
    let campaign = &ctx.accounts.campaign;

    require!(campaign.is_goal_reached(), EscrowError::TargetNotReached);

    let vault_balance = ctx.accounts.vault.lamports();
    require!(vault_balance > 0, EscrowError::InsufficientVaultBalance);

    let campaign_key = campaign.key();
    let vault_bump = campaign.vault_bump;
    let vault_seeds: &[&[u8]] = &[VAULT_SEED, campaign_key.as_ref(), &[vault_bump]];
    let signer_seeds: &[&[&[u8]]] = &[vault_seeds];

    // invoke_signed: Vault PDA sings the transfer of all collected funds to the creator
    let cpi_accounts = Transfer {
        from: ctx.accounts.vault.to_account_info(),
        to: ctx.accounts.creator.to_account_info(),
    };
    let cpi_ctx = CpiContext::new_with_signer(
        ctx.accounts.system_program.key(),
        cpi_accounts,
        signer_seeds,
    );
    transfer(cpi_ctx, vault_balance)?;

    let campaign = &mut ctx.accounts.campaign;
    campaign.is_finalized = true;

    msg!(
        "Creator {} withdrew {} lamports from campaign {}.",
        ctx.accounts.creator.key(),
        vault_balance,
        campaign_key
    );

    Ok(())
}