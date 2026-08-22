import { FormEvent, useState } from "react";
import BN from "bn.js";
import { SystemProgram } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "../hooks/useProgram";
import { findCampaignPda, findVaultPda } from "../utils/pda";
import { solToLamports } from "../utils/constants";

export function CreateCampaignForm({ onCreated }: { onCreated: () => void }) {
  const { program } = useProgram();
  const { publicKey } = useWallet();
  const [targetSol, setTargetSol] = useState("");
  const [days, setDays] = useState("14");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!program || !publicKey) {
      setStatus({ type: "error", text: "Please connect your wallet first." });
      return;
    }
    const target = Number(targetSol);
    const durationDays = Number(days);
    if (!Number.isFinite(target) || target <= 0) {
      setStatus({ type: "error", text: "Please specify the correct target amount in SOL." });
      return;
    }
    if (!Number.isFinite(durationDays) || durationDays <= 0 || durationDays > 90) {
      setStatus({ type: "error", text: "The campaign duration must be between 1 and 90 days." });
      return;
    }

    setSubmitting(true);
    setStatus(null);
    try {
      // A random campaign id lets a single creator run several campaigns in parallel.
      const campaignId = new BN(Date.now());
      const targetAmount = new BN(solToLamports(target));
      const deadline = new BN(Math.floor(Date.now() / 1000) + durationDays * 24 * 60 * 60);

      const [campaignPda] = findCampaignPda(publicKey, campaignId);
      const [vaultPda] = findVaultPda(campaignPda);

      await program.methods
        .initializeCampaign(campaignId, targetAmount, deadline)
        .accounts({
          creator: publicKey,
          campaign: campaignPda,
          vault: vaultPda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      setStatus({ type: "ok", text: "The campaign has been successfully created." });
      setTargetSol("");
      onCreated();
    } catch (err: any) {
      console.error(err);
      setStatus({ type: "error", text: err?.message ?? "Failed to create the campaign." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="card create-form" onSubmit={handleSubmit}>
      <h2>New campaign</h2>
      <div className="field-row">
        <label>
          Target (SOL)
          <input
            type="number"
            min="0"
            step="1"
            placeholder="Example: 5"
            value={targetSol}
            onChange={(e) => setTargetSol(e.target.value)}
            required
            onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity("Please fill out this field.")}
            onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
          />
        </label>
        <label>
          Duration (days)
          <input
            type="number"
            min="1"
            max="90"
            placeholder="Example: 1"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            required
            onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity("Please fill out this field.")}
            onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
          />
        </label>
      </div>
      <button className="btn btn-primary" type="submit" disabled={submitting}>
        {submitting ? "Creating" : "Launch campaign"}
      </button>
      {status && <p className={`form-status ${status.type}`}>{status.text}</p>}
    </form>
  );
}
