import React, { useState, useRef, useEffect } from 'react';
import './HeroSection.css';
import { Link } from "react-router-dom";

import btsIcon from "../../../assets/icons/bitcoin.png";
import ethIcon from "../../../assets/icons/ethereum.png";
import usdtIcon from "../../../assets/icons/usdt.png";
import bnbIcon from "../../../assets/icons/binance.png";
import solanaIcon from "../../../assets/icons/solana.png";

import charityImg from "../../../assets/images/Chairity.png";
import educationImg from "../../../assets/images/Education.png";
import medicalImg from "../../../assets/images/Medical.png";
import militaryImg from "../../../assets/images/Millitary.png";
import techImg from "../../../assets/images/Tech.png";

import verifiedIcon from "../../../assets/icons/other/approved.png";

const activeCampaigns = [
    { id: 1, title: "For Example", raised: "12.45 ETH", progress: 62, category: "Tech" },
    { id: 2, title: "Drones for ZSU", raised: "5.20 ETH", progress: 35, category: "Military" },
    { id: 3, title: "Medical Aid", raised: "2.10 ETH", progress: 15, category: "Tech" },
];

const categoryImages: Record<string, string> = {
    Tech: techImg,
    Military: militaryImg,
    Medical: medicalImg,
    Education: educationImg,
    Charity: charityImg,
};

export const HeroSection: React.FC = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const walletAddress = "0x1234567890abcdef";

    const [activeCampaign, setActiveCampaign] = useState(activeCampaigns[0]);

    const floatingMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isMenuOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (floatingMenuRef.current && !floatingMenuRef.current.contains(e.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsMenuOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isMenuOpen]);

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
                </div>

                {/* Right side: card for fundraisers */}
                <div className='hero__right'>
                    <div className='campaign-card'>

                       <div className='campaign-card__header'>
                           <div className='campaign-card__title-wrapper'>
                               <h3 className='campaign-card__title'>Drones for Ukraine!</h3>
                               <span className='campaign-card__badge'>Active</span>
                           </div>
                       </div>

                        <img
                            src={categoryImages[activeCampaign.category]}
                            className="campaign-card__image"
                        />
                        
                        <div className='campaign-card__author'>
                            <span className='campaign-card__author-name'>{walletAddress}</span>
                            <img
                                src={verifiedIcon}
                                alt='Verified'
                                className='campaign-card__verified-icon'
                            />
                        </div>

                        <p className='campaign-card__desc'>
                            Raising funds for medical treatment, supporting people in difficult situations, or other community-driven initiatives.
                        </p>

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
                            <button className='campaign-card__share-btn'>Share</button>
                        </div>

                        <div className='campaign-card_currencies'>
                            <p className='campaign-card__currencies-label'>We accept cryptocurrencies:</p>
                            <div className='campaign-card__coins'>
                                <div className='coin coin--btc'>
                                    <img src={btsIcon} alt="Bitcoin" className="coin__icon" />
                                    BTC
                                </div>
                                <div className='coin coin--eth'>
                                    <img src={ethIcon} alt="Ethereum" className="coin__icon" />
                                    ETH
                                </div>
                                <div className='coin coin--usdt'>
                                    <img src={usdtIcon} alt="Tether" className="coin__icon" />
                                    USDT
                                </div>
                                <div className='coin coin--bnb'>
                                    <img src={bnbIcon} alt="BNB" className="coin__icon" />
                                    BNB
                                </div>
                                <div className='coin coin--sol'>
                                    <img src={solanaIcon} alt="Solana" className="coin__icon" />
                                    SOL
                                </div>
                            </div>
                        </div>
                        
                        {/* Floating menu icon */}
                        <div className="hero__floating-wrapper" ref={floatingMenuRef}>
                            <button
                                className="hero__floating-btn"
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
                                <div className="hero__floating-menu">
                                    <div className="hero__floating-menu-header">
                                        <span>Active Campaigns</span>
                                    </div>
                                    <div className="hero__floating-menu-list">
                                        {activeCampaigns.map((campaign) => (
                                            <div key={campaign.id} className="hero__floating-menu-item">
                                                <div className="hero__floating-menu-item-top">
                                                    <div className="hero__floating-menu-item-info">
                                                        <div className="hero__floating-menu-item-title">{campaign.title}</div>
                                                        <div className="hero__floating-menu-item-stats">
                                                            <span>{campaign.raised}</span>
                                                            <span className="hero__floating-menu-item-progress">{campaign.progress}%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="hero__floating-menu-item-progress-bar">
                                                    <div className="hero__floating-menu-item-progress-fill" style={{ width: `${campaign.progress}%` }}></div>
                                                </div>
                                            </div>
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