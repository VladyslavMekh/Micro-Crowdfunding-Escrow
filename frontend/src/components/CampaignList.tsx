import { CampaignRow } from "../hooks/useCampaigns";
import { CampaignCard } from "./CampaignCard";

export function CampaignList({
  campaigns,
  loading,
  error,
  onChanged,
}: {
  campaigns: CampaignRow[];
  loading: boolean;
  error: string | null;
  onChanged: () => void;
}) {
  if (loading && campaigns.length === 0) {
    return <p className="hint">Loading campaigns...</p>;
  }
  if (error) {
    return <p className="hint hint-error">{error}</p>;
  }
  if (campaigns.length === 0) {
    return <p className="hint">No campaigns yet. Create the first one on the left.</p>;
  }
  return (
    <div className="campaign-grid">
      {campaigns.map((row) => (
        <CampaignCard key={row.publicKey.toString()} row={row} onChanged={onChanged} />
      ))}
    </div>
  );
}
