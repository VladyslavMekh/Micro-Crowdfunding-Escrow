// Typed re-export of the raw IDL JSON so it can be passed straight into
// `new Program<MicroCrowdfundingEscrow>(idl, provider)`.
import idlJson from "./micro_crowdfunding_escrow.json";

export type MicroCrowdfundingEscrow = typeof idlJson;
export const IDL = idlJson as MicroCrowdfundingEscrow;

export interface CampaignAccount {
  creator: import("@solana/web3.js").PublicKey;
  targetAmount: import("@coral-xyz/anchor").BN;
  currentAmount: import("@coral-xyz/anchor").BN;
  deadline: import("@coral-xyz/anchor").BN;
  bump: number;
  vaultBump: number;
  isFinalized: boolean;
  campaignId: import("@coral-xyz/anchor").BN;
}

export interface ContributorRecordAccount {
  donor: import("@solana/web3.js").PublicKey;
  campaign: import("@solana/web3.js").PublicKey;
  amount: import("@coral-xyz/anchor").BN;
  bump: number;
}
