use anchor_lang::prelude::*;

#[account]
pub struct ContributorRecord {
    /// Wallet of the donor
    pub donor: Pubkey,
    /// Campaign to which this contribution belongs
    pub campaign: Pubkey,
    /// Total amount contributed by this donor (in lamports)
    pub amount: u64,
    /// Bump for restoring the PDA address
    pub bump: u8,
}

impl ContributorRecord {
    // 8 (discriminator) + 32 (donor) + 32 (campaign) + 8 (amount) + 1 (bump)
    pub const SPACE: usize = 8 + 32 + 32 + 8 + 1;
}
