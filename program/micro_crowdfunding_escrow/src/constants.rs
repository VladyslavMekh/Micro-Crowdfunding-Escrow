use anchor_lang::prelude::*;

#[constant]
pub const CAMPAIGN_SEED: &[u8] = b"campaign";

#[constant]
pub const VAULT_SEED: &[u8] = b"vault";

#[constant]
pub const CONTRIBUTOR_SEED: &[u8] = b"contributor";

/// Minimum contribution to prevent dust transaction (0.001 SOL)
#[constant]
pub const MIN_DONATION_LAMPORTS: u64 = 1_000_000;

/// Maximum campaign duration - 90 days (in seconds)
#[constant]
pub const MAX_CAMPAIGN_DURATION: i64 = 90 * 24 * 60 * 60;
