import React, { useState, useMemo } from "react";
import "./History.css";

export type CampaignStatus = "active" | "completed" | "failed";

export interface HistoryCampaign {
    id: string;
    title: string;
    category: string;
    status: CampaignStatus;
    imageUrl?: string;
    collected: number;
    target: number;
    currency: string;
    collectedUsd: number;
    targetUsd: number;
    date: string;
}

const FILTERS: { label: string, value: "all" | CampaignStatus }[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
    { label: "Failed", value: "failed" },
];

const STATUS_LABEL: Record<CampaignStatus, string> = {
    active: "Active",
    completed: "Completed",
    failed: "Failed",
};

const MOCK_CAMPAIGNS: HistoryCampaign[] = [
    {
        id: "1",
        title: "Drones for Ukraine!",
        category: "Military",
        status: "active",
        collected: 12.45,
        target: 20,
        currency: "ETH",
        collectedUsd: 24865,
        targetUsd: 40000,
        date: "Aug 12",
    },
    {
        id: "2",
        title: "Medical aid fund",
        category: "Medical",
        status: "completed",
        collected: 8,
        target: 8,
        currency: "ETH",
        collectedUsd: 16000,
        targetUsd: 16000,
        date: "Jul 28",
    },
    {
        id: "3",
        title: "Winter shelters",
        category: "Charity",
        status: "failed",
        collected: 1.8,
        target: 10,
        currency: "ETH",
        collectedUsd: 3600,
        targetUsd: 20000,
        date: "Jun 03",
    },
];

interface  HistoryProps {
    campaigns?: HistoryCampaign[];
}

export const History: React.FC<HistoryProps> = ({ campaigns = MOCK_CAMPAIGNS }) => {
    const [activeFilter, setActiveFilter] = useState<"all" | CampaignStatus>("all");

    const filtered = useMemo(
        () =>
            activeFilter === "all"
                ? campaigns
                : campaigns.filter((c) => c.status === activeFilter),
        [campaigns, activeFilter]
    );

    return (
        <section className="history">
            <div className="history__container">
                <p className="history__eyebrow">YOUR FUNDRAISING ACTIVITY</p>
                <h1 className="history__title">History</h1>
                <p className="history__subtitle">
                    Track the status of every campaign you've created or supported.
                </p>

                <div className="history__filters">
                    {FILTERS.map((f) => (
                        <button
                            key={f.value}
                            className={`history__filter ${
                                activeFilter === f.value ? "history__filter--on" : ""
                            }`}
                            onClick={() => setActiveFilter(f.value)}
                        >
                            {f.value}
                        </button>
                    ))}
                </div>

                {filtered.length === 0 ? (
                    <p className="history__empty">No campaigns in this category yet.</p>
                ) : (
                    <div className="history__list">
                        {filtered.map((c) => {
                            const progressPercent = Math.min(
                                Math.round((c.collected / c.target) * 100),
                                100
                            );

                            return (
                                <a key={c.id} href={`/campaign/${c.id}`} className="history__row">
                                    <div className="history__thumb">
                                        {c.imageUrl ? (
                                            <img src={c.imageUrl} alt={c.title} />
                                        ) : (
                                            <span>IMG</span>
                                        )}
                                    </div>

                                    <div className="history__info">
                                        <div className="history__title-row">
                                            <span className="history__campaign-title">{c.title}</span>
                                            <span className={`history__badge history__badge--${c.status}`}>
                                                {STATUS_LABEL[c.status]}
                                            </span>
                                        </div>
                                        <div className="history__category">{c.category}</div>
                                        <div className="history__bar">
                                            <div
                                                className="history__bar-fill"
                                                style={{ width: `${progressPercent}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="history__amounts">
                                        <div className="history__collected">
                                            {c.collected} / {c.target} {c.currency}
                                        </div>
                                        <div className="history__usd">
                                            = %{c.collectedUsd.toLocaleString("en-US")} / $
                                            {c.targetUsd.toLocaleString("en-US")}
                                        </div>
                                    </div>

                                    <div className="history__date">{c.date}</div>
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};