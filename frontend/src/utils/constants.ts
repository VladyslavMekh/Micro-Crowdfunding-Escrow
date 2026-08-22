import { PublicKey } from "@solana/web3.js";
import idl from "../idl/micro_crowdfunding_escrow.json";

export const PROGRAM_ID = new PublicKey(idl.address);

// Anchor.toml points [provider] cluster at "localnet" by default.
// Change this if you deploy to devnet ("https://api.devnet.solana.com").
export const RPC_ENDPOINT = "http://127.0.0.1:8899";

export const LAMPORTS_PER_SOL = 1_000_000_000;

export function lamportsToSol(lamports: number | bigint): number {
  return Number(lamports) / LAMPORTS_PER_SOL;
}

export function solToLamports(sol: number): number {
  return Math.round(sol * LAMPORTS_PER_SOL);
}
