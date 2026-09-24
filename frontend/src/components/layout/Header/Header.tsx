import React from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../../shared/Logo/Logo";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import "./Header.css";

const NAV_ITEMS = [
    { to: "/", label: "Home", end: true },
    { to: "/create", label: "Create campaign" },
    { to: "/history", label: "History" },
    { to: "/how-it-works", label: "How it works" },
    { to: "/about", label: "About us" },
];

export const Header: React.FC = () => {
    const { setVisible } = useWalletModal();
    const { connected, publicKey, disconnect } = useWallet();

    const handleWalletClick = () => {
        if (connected) {
            disconnect();
        } else {
            setVisible(true);
        }
    };

    const shortAddress = publicKey
        ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
        : null;

    return (
        <header className="header">
            <div className="header__container">
                <Logo />

                <nav className="header__nav">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                            `header__link${isActive ? " header__link--active" : ""}`
                        }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="header__actions">
                    <button className="header__connect-btn" onClick={handleWalletClick}>
                        {connected ? shortAddress : "Connect wallet"}
                    </button>
                </div>
            </div>
        </header>
    );
};