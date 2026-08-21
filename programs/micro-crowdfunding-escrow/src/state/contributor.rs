use anchor_lang::prelude::*;

#[account]
pub struct ContributorRecord {
    /// The donor's wallet address
    pub donor: Pubkey,
    /// The campaign this contribution belongs to
    pub campaign: Pubkey,
    /// Total amount contributed by this donor (in lamports)
    pub amount: u64,
    /// Bump seed used to derive the PDA address
    pub bump: u8,
}

impl ContributorRecord {
    // 8 (discriminator) + 32 (donor) + 32 (campaign) + 8 (amount) + 1 (bump)
    pub const SPACE: usize = 8 + 32 + 32 + 8 + 1;
}