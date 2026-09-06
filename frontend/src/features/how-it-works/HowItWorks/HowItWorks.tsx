import React, { useState } from "react";
import "./HowItWorks.css";

interface Step {
    icon: string;
    title: string;
    description: string;
}

interface FaqItem {
    question: string;
    answer: string;
}

const STEPS: Step[] = [
    {
        icon: "ti-file-plus",
        title: "Create a fundraiser",
        description:
            "Fill in the title, description, target amount, and choose which cryptocurrencies you'll accept – BTC, ETH, USDT, BNB or SOL.",
    },
    {
        icon: "ti-share-2",
        title: "Share your campaign",
        description:
            "Get a unique link to your fundraiser page and share it with friends, community, or on social media.",
    },
    {
        icon: "ti-wallet",
        title: "Receive contributions",
        description:
            "Supporters send crypto directly to yur campaign's escrow address – funds are held securely on chain until the goal is met.",
    },
    {
        icon: "ti-checkbox",
        title: "Withdraw or get refunded",
        description:
            "If the target is reached before the deadline, you withdraw the funds. If not, every contributor is automatically refunded.",
    },
];

const FAQ_ITEMS: FaqItem[] = [
    {
        question: "What happens if my campaign doesn't reach its goal?",
        answer:
            "All contribution are automatically returned to each supporter's wallet – no fees, no manual requests needed.",
    },
    {
        question: "Which cryptocurrencies are supported?",
        answer:
            "Bitcoin (BTC), Ethereum (ETH), Tether (USDT), BNB and Solana (SOL). You choose which of these to accept when creating your campaign.",
    },
    {
        question: "Are there any platform fees?",
        answer:
            "Only standard network transaction fees apply – the platform itself does not take a cut of your funds.",
    },
    {
        question: "How is my money kept safe before the goal is reached?",
        answer:
            "Funds are held in an on-chain escrow contact, not by us or any third party – they're released only when the campaign's conditions (goal reached or deadline passed) are met.",
    },
];

export const HowItWorks: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const  toggleFaq = (index: number) => {
        setOpenFaq((prev) => (prev === index ? null : index));
    };

    return (
        <section className="how-it-works">
            <div className="how-it-works__container">
                <p className="how-it-works__eyebrow">STEP-BY-STEP GUIDE</p>
                <h1 className="how-it-works__title">
                    How it works,
                    <br />
                    <span className="how-it-works__title-accent">start to finish</span>
                </h1>
                <p className="how-it-works__subtitle">
                    From creating a fundraiser to receiving crypto donations – the full process, in four steps.
                </p>

                <div className="how-it-works__timeline">
                    <div className="how-it-works__line" />

                    {STEPS.map((step, index) => (
                        <div className="how-it-works__step" key={step.title}>
                            <div className="how-it-works__icon-wrap">
                                <i className={`ti ${step.icon}`} aria-hidden="true" />
                            </div>
                            <div className="how-it-works__content">
                                <div className="how-it-works__step-tag">Step {index + 1}</div>
                                <div className="how-it-works__step-title">{step.title}</div>
                                <div className="how-it-works__step-desc">{step.description}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="how-it-works__faq-head">
                    <h2 className="how-it-works__faq-title">
                        Frequently asked questions
                    </h2>
                    <span className="how-it-works__faq-title">
                        {FAQ_ITEMS.length} questions
                    </span>
                </div>

                <div className="how-it-works__faq-list">
                    {FAQ_ITEMS.map((item, index) => {
                        const isOpen = openFaq === index;
                        return (
                            <div className="how-it-works__faq-card" key={item.question}>
                                <button
                                    className="how-it-works__faq-question"
                                    onClick={() => toggleFaq(index)}
                                    aria-expanded={isOpen}
                                >
                                    {item.question}
                                    <span className="how-it-works__faq-chevron">
                                        {isOpen ? "-" : "+"}
                                    </span>
                                    <button>
                                        {isOpen && (
                                            <p className="how-it-works__faq-answer">{item.answer}</p>
                                        )}
                                    </button>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;