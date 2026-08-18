use anchor_lang::prelude::*;

pub mod constants;
pub mod errors;
pub mod instructions;
pub mod state;

use instructions::*;

declare_id!("Escrow111111111111111111111111111111111111");

#[program]
pub mod micro_crowdfunding_escrow {
    use super::*;

    /// Start a new crowdfunding campaign.
    /// Creates a Campaign PDA and reserves the Vault PDA address.
    pub fn initialize_campaign(
        ctx: Context<InitializeCampaign>,
        campaign_id: u64,
        target_amount: u64,
        deadline: i64,
    ) -> Result<()> {
        instructions::initialize_campaign::handler(ctx, campaign_id, target_amount, deadline)
    }

    /// Donor contributes SOL to the campaign's Vault PDA.
    pub fn donate(ctx: Context<Donate>, amount: u64) -> Result<()> {
        instructions::donate::handler(ctx, amount)
    }

    /// Author claims all collected funds if the target is reached.
    pub fn claim_funds(ctx: Context<ClaimFunds>) -> Result<()> {
        instructions::claim_funds::handler(ctx)
    }

    /// Donor refunds their contribution if the deadline has passed and the target is not reached.
    pub fn refund(ctx: Context<Refund>) -> Result<()> {
        instructions::refund::handler(ctx)
    }
}
