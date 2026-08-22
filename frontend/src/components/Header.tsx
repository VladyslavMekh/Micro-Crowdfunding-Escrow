import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export function Header() {
  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true">
          <ShieldLockIcon />
        </div>
        <div className="brand-text">
          <span className="brand-title">Micro-Crowdfunding Escrow</span>
          <span className="brand-subtitle">Trusted Escrow for Micro-Fundraisers on Solana</span>
        </div>
      </div>
      <WalletMultiButton />
    </header>
  );
}

function ShieldLockIcon() {
  return (
    <svg viewBox="0 0 48 48" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 4 L42 10 V22 C42 33 34.5 41 24 44 C13.5 41 6 33 6 22 V10 Z"
        fill="currentColor"
      />
      <rect x="17" y="22" width="14" height="11" rx="2" fill="var(--surface)" />
      <path
        d="M19.5 22 V18.5 a4.5 4.5 0 0 1 9 0 V22"
        stroke="var(--surface)"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="24" cy="27" r="1.7" fill="currentColor" />
    </svg>
  );
}
