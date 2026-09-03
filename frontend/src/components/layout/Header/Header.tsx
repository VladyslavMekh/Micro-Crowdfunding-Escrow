import React from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../../shared/Logo/Logo";
import "./Header.css";

const NAV_ITEMS = [
    { to: "/", label: "Home", end: true },
    { to: "/create", label: "Create campaign" },
    { to: "/history", label: "History" },
    { to: "/how-it-works", label: "How it works" },
    { to: "/about", label: "About us" },
];

export const Header: React.FC = () => {
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
                    <button className="header__connect-btn">
                        Connect wallet
                    </button>
                </div>
            </div>
        </header>
    );
};