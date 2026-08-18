use anchor_lang::prelude::*;

#[account]
pub struct Campaign {
    /// Autor of the campaign who will receive funds upon success
    pub creator: Pubkey,
    /// Target amount to raise in lamports
    pub target_amount: u64,
    /// Current amount raised in lamports
    pub current_amount: u64,
    /// Unix timestamp of the campaign deadline
    pub deadline: i64,
    /// Bump for restoring the campaign PDA address
    pub bump: u8,
    /// Bump for restoring the vault PDA address
    pub vault_bump: u8,
    /// Whether the author has claimed the funds (to prevent double claiming)
    pub is_finalized: bool,
    /// Sequential identifier for the campaign - allows one author to have multiple independent campaigns simultaneously
    pub campaign_id: u64,
}

impl Campaign {
    // 8 (discriminator) + 32 (creator) + 8 (target) + 8 (current)
    // + 8 (deadline) + 1 (bump) + 1 (vault_bump) + 1 (is_finalized) + 8 (campaign_id)
    pub const SPACE: usize = 8 + 32 + 8 + 8 + 8 + 1 + 1 + 1 + 8;

    pub fn is_goal_reached(&self) -> bool {
        self.current_amount >= self.target_amount
    }

    pub fn is_expired(&self, now: i64) -> bool {
        now > self.deadline
    }
}
