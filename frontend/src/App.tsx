// import { WalletContextProvider } from "./components/WalletContextProvider";
// import { Header } from "./components/Header";
// import { CreateCampaignForm } from "./components/CreateCampaignForm";
// import { CampaignList } from "./components/CampaignList";
// import { SolPriceChart } from "./components/SolPriceChart";
// import { useCampaigns } from "./hooks/useCampaigns";
// import "./App.css";
//
// function Dashboard() {
//     const { campaigns, loading, error, refresh } = useCampaigns();
//     return (
//         <div className="layout">
//             <Header />
//             <main className="content">
//                 <aside className="sidebar">
//                     <CreateCampaignForm onCreated={refresh} />
//                     <div className="card info-card">
//                         <h3>How it works</h3>
//                         <ol>
//                             <li>
//                                 The creator launches a campaign with a
//                                 funding goal and deadline.
//                             </li>
//                             <li>
//                                 Donors send SOL to the vault (vault PDA).
//                             </li>
//                             <li>
//                                 If the goal is reached, the creator
//                                 withdraws the funds.
//                             </li>
//                             <li>
//                                 If the deadline passes and the goal is
//                                 not met, donors can claim refunds.
//                             </li>
//                         </ol>
//                     </div>
//                 </aside>
//                 <section className="main-column">
//                     <h2 className="section-title">
//                         Active Campaigns
//                     </h2>
//                     <CampaignList
//                         campaigns={campaigns}
//                         loading={loading}
//                         error={error}
//                         onChanged={refresh}
//                     />
//                 </section>
//             </main>
//             <SolPriceChart />
//         </div>
//
//     );
// }
//
// export default function App() {
//     return (
//         <WalletContextProvider>
//             <Dashboard />
//         </WalletContextProvider>
//     );
// }


import { useState } from "react";
import { WalletContextProvider } from "./components/WalletContextProvider";
import { Header } from "./components/Header";
import { CreateCampaignForm } from "./components/CreateCampaignForm";
import { CampaignList } from "./components/CampaignList";
import { SolPriceChart } from "./components/SolPriceChart";
import { useCampaigns } from "./hooks/useCampaigns";
import "./App.css";

function Dashboard() {
    const { campaigns, loading, error, refresh } = useCampaigns();
    const [showInfo, setShowInfo] = useState(false);

    return (
        <div className="layout">
            <Header />

            {/* Info button */}
            <button
                className="info-btn"
                type="button"
                onClick={() => setShowInfo(true)}
            >
                Info
            </button>

            <main className="content">
                <aside className="sidebar">
                    <CreateCampaignForm onCreated={refresh} />

                    <div className="card info-card">
                        <h3>How it works</h3>

                        <ol>
                            <li>
                                The creator launches a campaign with a
                                funding goal and deadline.
                            </li>

                            <li>
                                Donors send SOL to the vault (vault PDA).
                            </li>

                            <li>
                                If the goal is reached, the creator
                                withdraws the funds.
                            </li>

                            <li>
                                If the deadline passes and the goal is
                                not met, donors can claim refunds.
                            </li>
                        </ol>
                    </div>
                </aside>

                <section className="main-column">
                    <h2 className="section-title">
                        Active Campaigns
                    </h2>

                    <CampaignList
                        campaigns={campaigns}
                        loading={loading}
                        error={error}
                        onChanged={refresh}
                    />
                </section>
            </main>

            <SolPriceChart />

            {/* Info modal */}
            {showInfo && (
                <div className="info-modal">
                    <div
                        className="info-modal-overlay"
                        onClick={() => setShowInfo(false)}
                    />

                    <div
                        className="info-modal-card"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="info-modal-title"
                    >
                        <button
                            className="info-modal-close"
                            type="button"
                            onClick={() => setShowInfo(false)}
                            aria-label="Close"
                        >
                            ×
                        </button>

                        <h2 id="info-modal-title">
                            About this program
                        </h2>

                        <p>
                            This program is a decentralized escrow smart
                            contract for micro-crowdfunding on the Solana
                            blockchain. Its primary goal is to ensure the
                            security of funds during fundraising: the campaign
                            creator sets a target (in SOL) and a deadline,
                            while donors send contributions to a separate,
                            program-controlled vault (Vault PDA).
                        </p>

                        <p>
                            If the target is met before the deadline, the
                            creator receives the full amount raised in a lump
                            sum; if the target is not met, each donor can
                            independently reclaim the exact amount they
                            contributed.
                        </p>

                        <p>
                            No party (not even the creator) can withdraw funds
                            prematurely or arbitrarily—all rules are enforced
                            automatically by the contract code without
                            intermediaries.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function App() {
    return (
        <WalletContextProvider>
            <Dashboard />
        </WalletContextProvider>
    );
}