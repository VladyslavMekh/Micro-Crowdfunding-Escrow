import { useCallback, useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { useProgram } from "./useProgram";
import { CampaignAccount } from "../idl/micro_crowdfunding_escrow";

export interface CampaignRow {
  publicKey: PublicKey;
  account: CampaignAccount;
}

export function useCampaigns() {
  const { program } = useProgram();
  const [campaigns, setCampaigns] = useState<CampaignRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!program) {
      setCampaigns([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // @ts-expect-error - account namespace is generated at runtime from the IDL
      const accounts = await program.account.campaign.all();
      const rows: CampaignRow[] = accounts
        .map((a: any) => ({ publicKey: a.publicKey as PublicKey, account: a.account as CampaignAccount }))
        .sort((a, b) => b.account.campaignId.cmp(a.account.campaignId));
      setCampaigns(rows);
    } catch (e) {
      console.error(e);
      setError("Failed to load campaigns. Check cluster connection.");
    } finally {
      setLoading(false);
    }
  }, [program]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { campaigns, loading, error, refresh };
}
