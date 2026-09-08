import React, { useEffect, useRef, useState } from "react";
import './About.css';

interface FocusArea {
    number: string;
    title: string;
    description: string;
}

const focusAreas: FocusArea[] = [
    {
        number: '01',
        title: 'Backend & Systems',
        description:
            'Designing resilient microservices and APIs with Spring Boot, and high-performance applications with Rust.',
    },
    {
        number: '02',
        title: 'Security & Cryptography',
        description:
            'Hands-on vulnerability analysis, system hardening, and cryptographic protocol analysis within PJSEC.',
    },
    {
        number: '03',
        title: 'Web3 Ecosystem',
        description:
            'Smart contract engineering and decentralized architecture on Solana, at the protocol and memory level.',
    },
];

const tags = ['Spring Boot', 'Rust', 'Solana', 'Cryptography'];

interface TimelineItem {
    text: string;
    active: boolean;
}

const timeline: TimelineItem[] = [
    { text: 'Two-day Rust & Solana course with Superteam Poland', active: true },
    { text: 'Built Micro-Crowdfunding Escrow, an on-chain escrow MVP', active: true },
    { text: 'Running on Solana Devnet – still evolving', active: true },
];

export const About: React.FC = () => {
    const sectionRef = useRef<HTMLDListElement>(null);
    const  [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const prefersReduceMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (prefersReduceMotion) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className={`about${isVisible ? ' is-visible' : ''}`} ref={sectionRef}>
            <div className="about__container">
                <div className="about__grid">
                    {/* Left: profile */}
                    <div className="about-profile">
                        <p className="about-profile__eyebrow">about us</p>
                        <img
                            src="https://avatars.githubusercontent.com/VladyslavMekh"
                            alt="Vladyslav Mekh"
                            className="about-profile__avatar"
                        />
                        <h2 className="about-profile__name">
                            Vladyslav Mekh
                        </h2>
                        <p className="about-profile__role">
                            Software Engineer – Developer / Cybersecurity / Engineer.
                            Student at PJATK, contributor to PJSEC.
                        </p>
                        <ul className="about-profile__tags">
                            {tags.map((tag) => (
                                <li key={tag}>– {tag}</li>
                            ))}
                        </ul>

                        <a
                            href="https://github.com/VladyslavMekh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="about-profile__link"
                        >
                            GitHub profile →
                        </a>
                    </div>

                    {/* Right: focus list + timeline */}
                    <div className="about-content">
                        <ul className="about-focus">
                            {focusAreas.map((area) => (
                                <li className="about-focus__item" key={area.number}>
                                    <span className="about-focus__number">{area.number}</span>
                                    <div>
                                        <h3 className="about-focus__title">{area.title}</h3>
                                        <p className="about-focus__desc">{area.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <h3 className="about-story__heading">Why this platform exists</h3>

                        <ul className="about-timeline">
                            {timeline.map((item) => (
                                <li
                                    className={`about-timeline__item${
                                        item.active ? ' is-active' : ''
                                    }`}
                                key={item.text}
                                >
                                    {item.text}
                                </li>
                            ))}
                        </ul>

                        <p className="about-story__note">
                            This project started after on intensive two-day Rust and Solana course with{' '}
                            <a href="https://www.linkedin.com/company/superteam-pl/"
                               target="_blank"
                               rel="noopener noreferrer"
                            >
                                Superteam Poland
                            </a>
                            . The idea is simple: a creator opens a campaign,
                            contributors send funds, and an on-chain escrow holds and
                            releases them based on the campaign&apos;s conditions.
                            Thanks also go to instructor{' '}
                            <a
                                href="https://www.linkedin.com/in/matzayonc/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Mateusz Zając
                            </a>{' '}
                            for the guidance throughout the course.
                        </p>

                        <a
                            href="https://github.com/VladyslavMekh/Micro-Crowdfunding-Escrow"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="about-story__cta"
                        >
                            View project on GitHub →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};