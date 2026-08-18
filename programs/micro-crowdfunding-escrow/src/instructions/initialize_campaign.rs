use anchor_lang::prelude::*;

use crate::constants::*;
use crate::errors::EscrowError;
use crate::state::Campaign;

#[derive(Accounts)]
#[instruction(campaign_id: u64, target_amount: u64, deadline: i64)]
pub struct InitializeCampaign<'info> {
    #[account(mut)]
    pub creator: Signer<'info>,

    #[account(
        init,
        payer = creator,
        space = Campaign::SPACE,
        seeds = [
            CAMPAIGN_SEED,
            creator.key().as_ref(),
            &campaign_id.to_le_bytes(),
        ],
        bump,
    )]
    pub campaign: Account<'info, Campaign>,

    /// Vault - this is an "empty" SystemAcount owned by the program PDA.
    /// It physically holds the locked SOL, without its own data.
    #[account(
        seeds = [VAULT_SEED, campaign.key().as_ref()],
        bump,
    )]
    /// CHECK: this is a data-less PDA vault; the address is derived from seeds,
    /// the signature is controlled solely by the program.
    pub vault: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<InitializeCampaign>,
    campaign_id: u64,
    target_amount: u64,
    deadline: i64,
) -> Result<()> {
    let now = Clock::get()?.unix_timestamp;

    require!(target_amount > 0, EscrowError::InvalidTargetAmount);
    require!(deadline > now, EscrowError::InvalidDeadline);
    require!(
        deadline - now <= MAX_CAMPAIGN_DURATION,
        EscrowError::DurationTooLong
    );

    let campaign = &mut ctx.accounts.campaign;
    campaign.creator = ctx.accounts.creator.key();
    campaign.target_amount = target_amount;
    campaign.current_amount = 0;
    campaign.deadline = deadline;
    campaign.bump = ctx.bumps.campaign;
    campaign.vault_bump = ctx.bumps.vault;
    campaign.is_finalized = false;
    campaign.campaign_id = campaign_id;

    msg!(
        "Campaign initialized: creator={}, target={} lamports, deadline={}",
        campaign.creator,
        campaign.target_amount,
        campaign.deadline
    );

    Ok(())
}
