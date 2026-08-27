import React from "react";
import { Logo } from "../../shared/Logo/Logo";
import "./Footer.css";

export const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                
                {/* Top section */}
                <div className="footer__top">
                    <div className="footer__brand">
                        <Logo />
                        <p className="footer__description">
                            The safest and fastest way to raise funds in cryptocurrency for important goals.
                        </p>
                    </div>

                    <div className="footer__newsletter">
                        <h4 className="footer__newsletter-title">Stay updated</h4>
                        <p className="footer__newsletter-text">
                            Subscribe to our newsletter to receive the latest news and updates.
                        </p>
                        <div className="footer__newsletter-form">
                            <input 
                                type="email" 
                                placeholder="Your email address" 
                                className="footer__newsletter-input"
                            />
                            <button className="footer__newsletter-btn">Subscribe</button>
                        </div>
                    </div>
                </div>

                {/* Middle section */}
                <div className="footer__links">
                    <div className="footer__links-column">
                        <h4 className="footer__links-title">Company</h4>
                        <a href="#" className="footer__link">About us</a>
                        <a href="#" className="footer__link">Careers</a>
                        <a href="#" className="footer__link">Press</a>
                    </div>

                    <div className="footer__links-column">
                        <h4 className="footer__links-title">Product</h4>
                        <a href="#" className="footer__link">Create fundraiser</a>
                        <a href="#" className="footer__link">My fundraisers</a>
                        <a href="#" className="footer__link">How it works</a>
                    </div>

                    <div className="footer__links-column">
                        <h4 className="footer__links-title">Support</h4>
                        <a href="#" className="footer__link">Help center</a>
                        <a href="#" className="footer__link">Contact us</a>
                        <a href="#" className="footer__link">Terms of service</a>
                        <a href="#" className="footer__link">Privacy policy</a>
                    </div>

                    <div className="footer__links-column">
                        <h4 className="footer__links-title">Social</h4>
                        <a href="https://www.instagram.com/micro_crowdfunding_escrow/" className="footer__link">Instagram</a>
                        <a href="#" className="footer__link">Telegram</a>
                        <a href="https://discord.gg/4a3qTt39W" className="footer__link">Discord</a>
                    </div>
                </div>

                {/* Down section */}
                <div className="footer__bottom">
                    <span className="footer__copyright">
                        © {new Date().getFullYear()} Micro-Crowdfunding Escrow. All rights reserved.
                    </span>
                    <span className="footer__made-with">
                        Built with ❤️ for the community
                    </span>
                </div>
            </div>
        </footer>
    );
};