 use anchor_lang::prelude::*;

 #[account]
 pub struct Campaign {
  /// The creator of the project who will receive the funds upon success
  pub creator: Pubkey,
  /// The target funding amount in lamports
  pub target_amount: u64,
  /// The current amount raised in lamports
  pub current_amount: u64,
  /// Unix timestamp of the campaign deadline
  pub deadline: i64,
  /// Bump seed used to derive the campaign PDA address
  pub bump: u8,
  /// Bump seed used to derive the vault PDA address
  pub vault_bump: u8,
  /// Indicates whether the creator has withdrawn the funds (prevents double claiming)
  pub is_finalized: bool,
  /// Sequential identifier allowing a single creator to run
  /// multiple independent campaigns simultaneously
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
