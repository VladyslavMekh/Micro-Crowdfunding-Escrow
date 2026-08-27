import React from "react";
import './HowItWorksSection.css';

interface StepProps {
    number: string;
    title: string;
    text: string;
}

const Step: React.FC<StepProps> = ({ number, title, text }) => (
    <div className="how-it-works__step">
        <div className="how-it-works__step-number">{number}</div>
        <div className="how-it-works__step-content">
            <h3 className="how-it-works__step-title">{title}</h3>
            <p className="how-it-works__step-text">{text}</p>
        </div>
    </div>
);

export const HowItWorksSection: React.FC = () => {
    return (
        <section id="how-it-works" className="how-it-works">
            <div className="how-it-works__container">
                <h2 className="how-it-works__title">How it works?</h2>

                <div className="how-it-works__grid">
                    {/* Left side */}
                    <div className="how-it-works__steps">
                        <Step
                            number="1"
                            title="Create a fundraiser"
                            text="Fill in the information about the fundraiser and set a goal."
                        />
                        <Step
                            number="2"
                            title="Share"
                            text="Share the link to your fundraiser with friends and the community."
                        />
                        <Step
                            number="3"
                            title="Get support"
                            text="Receive cryptocurrency donations and achieve your goal."
                        />
                    </div>

                    {/* Right side */}

                    <div className="how-it-works__illustration">
                        <div className="how-it-works__mockup">
                            <div className="how-it-works__mockup-card">
                                <div className="how-it-works__mockup-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="5" width="20" height="14" rx="2" />
                                        <line x1="2" y1="10" x2="22" y2="10" />
                                    </svg>
                                </div>
                                <span className="how-it-works__mockup-title">Create fundraiser</span>
                            </div>

                            <div className="how-it-works__mockup-arrow">→</div>

                            <div className="how-it-works__mockup-card">
                                <div className="how-it-works__mockup-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                                        <polyline points="16 6 12 2 8 6" />
                                        <line x1="12" y1="2" x2="12" y2="15" />
                                    </svg>
                                </div>
                                <span className="how-it-works__mockup-title">Share</span>
                            </div>

                            <div className="how-it-works__mockup-arrow">→</div>

                            <div className="how-it-works__mockup-card">
                                <div className="how-it-works__mockup-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                </div>
                                <span className="how-it-works__mockup-title">Get support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};