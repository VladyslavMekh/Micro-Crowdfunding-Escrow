import { WalletContextProvider } from "./components/WalletContextProvider";
import { Header } from "./components/Header";
import { CreateCampaignForm } from "./components/CreateCampaignForm";
import { CampaignList } from "./components/CampaignList";
import { SolPriceChart } from "./components/SolPriceChart";
import { useCampaigns } from "./hooks/useCampaigns";
import "./App.css";

function Dashboard() {
    const { campaigns, loading, error, refresh } = useCampaigns();

    return (
        <div className="layout">
            <Header />

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

// Ten program to zdecentralizowany smart
// kontrakt escrow do mikro-crowdfundingu na
// blockchainie Solana. Jego głównym zadaniem
// jest zapewnienie bezpieczeństwa środków podczas
// zbiórki: twórca kampanii ustala cel (w SOL) i
// termin, a darczyńcy wpłacają środki na oddzielny
// "sejf" (Vault PDA) kontrolowany przez program.
// Jeśli cel zostanie osiągnięty przed terminem
// — twórca otrzymuje całą zebraną kwotę jednorazowo;
// jeśli cel nie zostanie osiągnięty — każdy darczyńca
// samodzielnie odzyskuje dokładnie tę kwotę, którą
// wpłacił. Żadna ze stron (nawet twórca) nie może
// wypłacić środków przedwcześnie ani dowolnie
// — wszystkie zasady są egzekwowane automatycznie
// przez kod kontraktu, bez pośredników.