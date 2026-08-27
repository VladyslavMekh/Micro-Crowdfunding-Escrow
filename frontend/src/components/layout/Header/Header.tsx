import React from "react";
import { Logo } from '../../shared/Logo/Logo';
import './Header.css';

export const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header__container">
                <Logo />

                <nav className="header__nav">
                    <a href="#" className="header__link header__link--active">Home</a>
                    <a href="#" className="header__link">Create campaign</a>
                    <a href="#" className="header__link">History</a>
                    <a href="#" className="header__link">How it works</a>
                    <a href="#" className="header__link">About us</a>
                </nav>

                <div className="header__action">
                    <button className="header__connect-btn">
                        Connect wallet
                    </button>
                </div>
            </div>
        </header>
    );
};