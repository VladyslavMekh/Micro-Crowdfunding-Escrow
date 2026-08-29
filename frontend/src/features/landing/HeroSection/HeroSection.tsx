import React, { useState } from 'react';
import './HeroSection.css';
import { Link } from "react-router-dom";

const activeCampaigns = [
    { id: 1, title: "For Example", raised: "12.45 ETH", progress: 62 },
    { id: 2, title: "Drones for ZSU", raised: "5.20 ETH", progress: 35 },
    { id: 3, title: "Medical Aid", raised: "2.10 ETH", progress: 15 },
];

export const HeroSection: React.FC = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <section className='hero'>
            <div className='hero__container'>

                {/* Left side: text */}
                <div className='hero__content'>
                    <p className='hero__eyebrow'>CRYPTO FUNDRAISING - SIMPLE AND SECURE</p>
                    <h1 className='hero__title'>
                        Create fundraisers <br />
                        <span className='hero__title-accent'>for important goals</span> <br />
                        through cryptocurrency
                    </h1>
                    <p className='hero__description'>
                        Fast, secure and without intermediaries. Collect funds from around the world using cryptocurrencies.
                    </p>

                    <div className='hero__actions'>
                        <Link to="/create" className='hero__primary-btn'>
                            Create a fundraiser <span className='hero__btn-arrow'>+</span>
                        </Link>
                        <button className='hero__secondary-btn'>
                            Learn more <span className='hero__btn-down'>↓</span>
                        </button>
                    </div>

                    <div className='hero__social-proof'>
                        <div className='hero__avatars'>
                            <div className='hero__avatar hero__avatar--1'></div>
                            <div className='hero__avatar hero__avatar--2'></div>
                            <div className='hero__avatar hero__avatar--3'></div>
                            <div className='hero__avatar hero__avatar--4'></div>
                        </div>
                        <p className='hero__social-text'>
                            0 active fundraisers <br />
                            and $0 raised by the community
                        </p>
                    </div>
                </div>

                {/* Right side: card for fundraisers */}
                <div className='hero__right'>
                    <div className='campaign-card'>
                        <div className='campaign-card__header'>
                            <span className='campaign-card__badge'>Active fundraising campaign</span>
                            <h3 className='campaign-card__title'>For Example</h3>
                            <div className='campaign-card__author'>
                                <div className='campaign-card__author-avatar'></div>
                                <span className='campaign-card--author-name'>TestUser</span>
                                <span className='campaign-card__verified'>✔</span>
                            </div>
                            <p className='campaign-card__decs'>
                                Raising funds for medical treatment, supporting people in difficult situations, or other community-driven initiatives.
                            </p>
                        </div>

                        <div className='campaign-card__stats'>
                            <div className='campaign-card__stat'>
                                <span className='campaign-card__label'>Collected</span>
                                <span className='campaign-card__value'>12,45 ETH</span>
                                <span className='campaign-card__sub'>= $24,865</span>
                            </div>
                            <div className='campaign-card__stat'>
                                <span className='campaign-card__label'>Target</span>
                                <span className='campaign-card__value'>20 ETH</span>
                                <span className='campaign-card__sub'>= $40,000</span>
                            </div>
                            <div className='campaign-card__stat campaign-card__stat--progress'>
                                <span className='campaign-card__label'>Progress</span>
                                <span className='campaign-card__value campaign-card__value--orange'>62%</span>
                            </div>
                        </div>

                        <div className='campaign-card__progress-bar'>
                            <div className='campaign-card__progress-fill' style={{ width: '62%' }}></div>
                        </div>

                        <div className='campaign-card__actions'>
                            <button className='campaign-card__support-btn'>Support <span>→</span></button>
                            <button className='campaign-card__share-btn'>Share <span>↪</span></button>
                        </div>

                        <div className='campaign-card_currencies'>
                            <p className='campaign-card__currencies-label'>We accept cryptocurrencies:</p>
                            <div className='campaign-card__coins'>
                                <span className="coin coin--btc">₿ BTC</span>
                                <span className="coin coin--eth">Ξ ETH</span>
                                <span className="coin coin--usdt">T USDT</span>
                                <span className="coin coin--bnb">B BNB</span>
                            </div>
                        </div>
                        
                        {/* Floating menu icon */}
                        <div className='hero__floating-wrapper'>
                            <button 
                                className='hero__floating-btn'
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="8" y1="6" x2="21" y2="6"></line>
                                    <line x1="8" y1="12" x2="21" y2="12"></line>
                                    <line x1="8" y1="18" x2="21" y2="18"></line>
                                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                </svg>
                            </button>

                            {isMenuOpen && (
                                <div className='hero__floating-menu'>
                                    <div className='hero__floating-menu-header'>
                                        <span>Active Campaigns</span>
                                    </div>
                                    <div className='hero__floating-menu-list'>
                                        {activeCampaigns.map((campaign) => (
                                            <a href={`/campaign/${campaign.id}`} key={campaign.id} className="hero__floating-menu-item">
                                                <div className='hero__floating-menu-item-title'>{campaign.title}</div>
                                                <div className='hero__floating-menu-item-stats'>
                                                    <span>{campaign.raised}</span>
                                                    <span className='hero__floating-menu-item-progress'>{campaign.progress}%</span>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}