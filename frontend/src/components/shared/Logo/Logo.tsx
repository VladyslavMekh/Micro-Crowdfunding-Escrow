import React from 'react';
import './Logo.css';

export const Logo: React.FC = () => {
    return (
        <a href="/" className="logo">
            <span className='logo__text'>
                Micro-Crowdfunding<span className="logo__accent"> Escrow</span>
            </span>
        </a>
    );
}