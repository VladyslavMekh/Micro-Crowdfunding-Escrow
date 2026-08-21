use anchor_lang::prelude::*;

#[error_code]
pub enum EscrowError {
    #[msg("The target amount must be greater than zero.")]
    InvalidTargetAmount,

    #[msg("The campaign deadline must be in the future.")]
    InvalidDeadline,

    #[msg("The campaign duration exceeds the maximum allowed limit.")]
    DurationTooLong,

    #[msg("The contribution amount is less than the minimum required.")]
    DonationTooSmall,

    #[msg("The campaign deadline has passed, contributions are no longer accepted.")]
    CampaignExpired,

    #[msg("The campaign has already been finalized.")]
    CampaignAlreadyFinalized,

    #[msg("The target amount has not been reached yet, funds cannot be withdrawn.")]
    TargetNotReached,

    #[msg("Only the campaign authority can execute the instruction.")]
    Unauthorized,

    #[msg("The campaign is still active, refunds are not available yet.")]
    CampaignStillActive,

    #[msg("The campaign target has already been reached, refunds are disabled.")]
    TargetAlreadyReached,

    #[msg("Insufficient balance in the vault for this operation.")]
    InsufficientVaultBalance,

    #[msg("An arithmetic overflow occurred during calculations.")]
    MathOverflow,

    #[msg("This donor's contribution is zero; nothing to refund.")]
    NothingToRefund,
}