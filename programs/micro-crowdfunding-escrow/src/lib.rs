use anchor_lang::prelude::*;

pub mod constants;
pub mod errors;
pub mod instructions;
pub mod state;

use instructions::*;

declare_id!("A3d9c5HeW5VrrMSiiAqGGTrPTwzESoL4XJV6gWktdbYG");

#[program]
pub mod micro_crowdfunding_escrow {
    use super::*;

    /// Launches a new crowdfunding campaign.
    /// Creates the Campaign PDA and reserves the Vault PDA address.
    pub fn initialize_campaign(
        ctx: Context<InitializeCampaign>,
        campaign_id: u64,
        target_amount: u64,
        deadline: i64,
    ) -> Result<()> {
        instructions::initialize_campaign::handler(ctx, campaign_id, target_amount, deadline)
    }

    /// A donor contributes SOL into the campaign's Vault PDA.
    pub fn donate(ctx: Context<Donate>, amount: u64) -> Result<()> {
        instructions::donate::handler(ctx, amount)
    }

    /// The creator withdraws all accumulated funds if the target goal is reached.
    pub fn claim_funds(ctx: Context<ClaimFunds>) -> Result<()> {
        instructions::claim_funds::handler(ctx)
    }

    /// A donor reclaims their contribution if the deadline has passed and the target goal was not reached.
    pub fn refund(ctx: Context<Refund>) -> Result<()> {
        instructions::refund::handler(ctx)
    }
}