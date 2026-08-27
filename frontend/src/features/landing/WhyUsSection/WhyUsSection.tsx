import React from "react";
import './WhyUsSection.css'

// Icons (SVG for clean)
const ShieldIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const GlobeIcon = () => (
   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const BoltIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const EyeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

interface FeatureCarProgs {
    icon: React.ReactNode;
    title: string;
    text: string;
}

const FeatureCard: React.FC<FeatureCarProgs> = ({ icon, title, text }) => (
    <div className="why-us__card">
        <div className="why-us__card-icon">{icon}</div>
        <h3 className="why-us__card-title">{title}</h3>
        <p className="why-us__card-text">{text}</p>
    </div>
);

export const WhyUsSection: React.FC = () => {
    return (
        <section id="why-us" className="why-us">
            <div className="why-us__container">
                <h2 className="why-us__title">Why Micro-Crowdfunding Escrow?</h2>

                <div className="why-us__grid">
                    <FeatureCard
                    icon={<ShieldIcon />}
                    title="Safe"
                    text="Your funds and data are protected by modern security protocols."
                    />
                    <FeatureCard
                    icon={<GlobeIcon />}
                    title="Globaly"
                    text="Raise funds from anywhere in the world, without limits or borders."
                    />
                    <FeatureCard
                    icon={<BoltIcon />}
                    title="Quickly"
                    text="Instant transactions and withdrawals without delays."
                    />
                    <FeatureCard
                    icon={<EyeIcon />}
                    title="Transparently"
                    text="All transactions are public and available for verification on the blockchain."
                    />
                </div>

                {/* Statistics */}
                <div className="why-us__stats">
                    <div className="why-us__stat">
                        <span className="why-us__stat-number">0</span>
                        <span className="why-us__stat-label">Active fundraising campaigns</span>
                    </div>
                    <div className="why-us__stat">
                        <span className="why-us__stat-number">0</span>
                        <span className="why-us__stat-label">Collected by the community</span>
                    </div>
                    <div className="why-us__stat">
                        <span className="why-us__stat-number">0</span>
                        <span className="why-us__stat-label">Supporters</span>
                    </div>
                    <div className="why-us__stat">
                        <span className="why-us__stat-number">0</span>
                        <span className="why-us__stat-label">Countries of the world</span>
                    </div>
                </div>
            </div>
        </section>
    )
}