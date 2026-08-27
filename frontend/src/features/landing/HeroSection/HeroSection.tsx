import React from 'react';
import './HeroSection.css';

export const HeroSection: React.FC = () => {
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
                        <button className='hero__primary-btn'>
                            Create a fundraiser <span className='hero__btn-arrow'>+</span>
                        </button>
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
                            <h3 className='campaign-card__title'>For drones for the Armed Forces of Ukraine</h3>
                            <div className='campaign-card__author'>
                                <div className='campaign-card__author-avatar'></div>
                                <span className='campaign-card--author-name'>HelpUkraine</span>
                                <span className='campaign-card__verified'>✔</span>
                            </div>
                            <p className='campaign-card__decs'>
                                We are raising dunds to purchase FPV drones and components for our defenders.
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
                        
                        {/* Floating BTC icon */}
                        <div className='hero__floating-btc'>B</div>
                    </div>
                </div>
            </div>
        </section>
    );
}