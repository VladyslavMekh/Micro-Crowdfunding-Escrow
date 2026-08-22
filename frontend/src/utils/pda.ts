import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import { PROGRAM_ID } from "./constants";

const CAMPAIGN_SEED = Buffer.from("campaign");
const VAULT_SEED = Buffer.from("vault");
const CONTRIBUTOR_SEED = Buffer.from("contributor");

/** Matches: seeds = [b"campaign", creator, campaign_id.to_le_bytes()] */
export function findCampaignPda(creator: PublicKey, campaignId: BN): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [CAMPAIGN_SEED, creator.toBuffer(), campaignId.toArrayLike(Buffer, "le", 8)],
    PROGRAM_ID
  );
}

/** Matches: seeds = [b"vault", campaign.key()] */
export function findVaultPda(campaign: PublicKey): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([VAULT_SEED, campaign.toBuffer()], PROGRAM_ID);
}

/** Matches: seeds = [b"contributor", campaign.key(), donor] */
export function findContributorRecordPda(campaign: PublicKey, donor: PublicKey): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [CONTRIBUTOR_SEED, campaign.toBuffer(), donor.toBuffer()],
    PROGRAM_ID
  );
}
