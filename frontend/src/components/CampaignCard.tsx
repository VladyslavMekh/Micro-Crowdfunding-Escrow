import { useState } from "react";
import BN from "bn.js";
import { SystemProgram } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "../hooks/useProgram";
import { CampaignRow } from "../hooks/useCampaigns";
import { findContributorRecordPda, findVaultPda } from "../utils/pda";
import { lamportsToSol, solToLamports } from "../utils/constants";
import { formatDeadline, shortenAddress, timeLeft } from "../utils/format";

export function CampaignCard({ row, onChanged }: { row: CampaignRow; onChanged: () => void }) {
  const { program } = useProgram();
  const { publicKey } = useWallet();
  const { account, publicKey: campaignPda } = row;

  const [donateAmount, setDonateAmount] = useState("");
  const [busy, setBusy] = useState<"donate" | "claim" | "refund" | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const target = lamportsToSol(account.targetAmount.toNumber());
  const current = lamportsToSol(account.currentAmount.toNumber());
  const progress = Math.min(100, (current / target) * 100 || 0);
  const deadlineUnix = account.deadline.toNumber();
  const isExpired = Date.now() / 1000 > deadlineUnix;
  const isGoalReached = account.currentAmount.gte(account.targetAmount);
  const isCreator = publicKey?.equals(account.creator) ?? false;

  async function handleDonate() {
    if (!program || !publicKey) return setStatus("Connect your wallet.");
    const sol = Number(donateAmount);
    if (!Number.isFinite(sol) || sol <= 0) return setStatus("Please specify the donation amount in SOL.");

    setBusy("donate");
    setStatus(null);
    try {
      const [vaultPda] = findVaultPda(campaignPda);
      const [contributorPda] = findContributorRecordPda(campaignPda, publicKey);
      const amount = new BN(solToLamports(sol));

      await program.methods
        .donate(amount)
        .accounts({
          donor: publicKey,
          campaign: campaignPda,
          vault: vaultPda,
          contributorRecord: contributorPda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      setStatus("Thank you for the donation.");
      setDonateAmount("");
      onChanged();
    } catch (err: any) {
      console.error(err);
      setStatus(err?.message ?? "Error during donation.");
    } finally {
      setBusy(null);
    }
  }

  async function handleClaim() {
    if (!program || !publicKey) return setStatus("Connect wallet.");
    setBusy("claim");
    setStatus(null);
    try {
      const [vaultPda] = findVaultPda(campaignPda);
      await program.methods
        .claimFunds()
        .accounts({
          creator: publicKey,
          campaign: campaignPda,
          vault: vaultPda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      setStatus("Funds have been withdrawn to your wallet.");
      onChanged();
    } catch (err: any) {
      console.error(err);
      setStatus(err?.message ?? "Error during withdrawal.");
    } finally {
      setBusy(null);
    }
  }

  async function handleRefund() {
    if (!program || !publicKey) return setStatus("Connect wallet.");
    setBusy("refund");
    setStatus(null);
    try {
      const [vaultPda] = findVaultPda(campaignPda);
      const [contributorPda] = findContributorRecordPda(campaignPda, publicKey);
      await program.methods
        .refund()
        .accounts({
          donor: publicKey,
          campaign: campaignPda,
          vault: vaultPda,
          contributorRecord: contributorPda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      setStatus("Funds returned.");
      onChanged();
    } catch (err: any) {
      console.error(err);
      setStatus(err?.message ?? "Error during refund.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <article className="card campaign-card">
      <div className="campaign-card-top">
        <span className="campaign-id">#{account.campaignId.toString()}</span>
        {account.isFinalized && <span className="badge badge-done">Paid out</span>}
        {!account.isFinalized && isExpired && !isGoalReached && (
          <span className="badge badge-expired">Not raised</span>
        )}
        {!account.isFinalized && isGoalReached && <span className="badge badge-success">Goal reached</span>}
      </div>

      <p className="campaign-creator">Creator: {shortenAddress(account.creator.toString())}</p>

      <div className="progress-track" aria-label={`Raised ${progress.toFixed(0)}%`}>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="progress-numbers">
        <span>
          <strong>{current.toFixed(3)}</strong> / {target.toFixed(3)} SOL
        </span>
        <span>{progress.toFixed(0)}%</span>
      </div>

      <p className="campaign-deadline">
        {isExpired ? "" : "Deadline"}: {formatDeadline(deadlineUnix)} · {timeLeft(deadlineUnix)}
      </p>

      {!account.isFinalized && !isExpired && (
        <div className="donate-row">
          <input
            type="number"
            min="1"
            step="1"
            placeholder="Suma in SOL"
            value={donateAmount}
            onChange={(e) => setDonateAmount(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleDonate} disabled={busy !== null}>
            {busy === "donate" ? "Sending" : "Donate"}
          </button>
        </div>
      )}

      {!account.isFinalized && isGoalReached && isCreator && (
        <button className="btn btn-outline" onClick={handleClaim} disabled={busy !== null}>
          {busy === "claim" ? "Withdrawing..." : "Withdraw raised funds"}
        </button>
      )}

      {!account.isFinalized && isExpired && !isGoalReached && (
        <button className="btn btn-outline" onClick={handleRefund} disabled={busy !== null}>
          {busy === "refund" ? "Refunding" : "Refund my donation"}
        </button>
      )}

      {status && <p className="form-status">{status}</p>}
    </article>
  );
}
