import React, { useEffect, useRef, useState } from "react";
import './HowItWorks.css';

interface Step {
    number: string;
    title: string;
    description: string;
}

const steps: Step[] = [
    {
        number: '01',
        title: 'Connect your wallet',
        description:
            'Connect MetaMask, Trust Wallet or any Web3 wallet in a single click. No registration or personal data required.',
    },
    {
        number: '02',
        title: 'Create a fundraiser',
        description:
            'See your goal in crypto, add a cover image and description. Your campaign goes live instantly.',
    },
    {
        number: '03',
        title: 'Share the link',
        description:
            'Share your fundraiser anywhere. Supporters donate directly from their wallet – no middlemen, no fees.',
    },
    {
        number: '04',
        title: 'Receive funds securely',
        description:
            'Funds are held in a smart-contract escrow and released to you once the goal or conditions are met.',
    },
];

export const HowItWorks: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

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
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <section className={`how${isVisible ? ' is-visible' : ''}`} ref={sectionRef}>
            <div className="how__container">
                <div className="how__heading">
                    <p className="how__eyebrow">how it works</p>
                    <h2 className="how__title">
                        Four steps to your <span className="how__title-accent">first fundraiser</span>
                    </h2>
                </div>

                <div className="how__grid">
                    {steps.map((step, index) => (
                        <div className="how-step" key={step.number}>
                            <span className="how-step__number">{step.number}</span>
                            <h3 className="how-step__title">{step.title}</h3>
                            <p className="how-step__desc">{step.description}</p>
                            {index < steps.length - 1 && (
                                <span className="how-step__connector" aria-hidden="true" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};