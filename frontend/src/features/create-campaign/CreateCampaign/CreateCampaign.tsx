import React, {useState} from "react";
import "./CreateCampaign.css"

type Currency = "BTC" | "ETH" | "USDT" | "BNB" | "SOL";

const CURRENCY_COLORS: Record<Currency, string> = {
    BTC: "#F7931A",
    ETH: "#627EEA",
    USDT: "#26A17B",
    BNB: "#F3BA2F",
    SOL: "#9945FF"
};

const CATEGORIES = ["Military", "Medical", "Tech", "Education", "Charity"];

export const CreateCampaign: React.FC = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [description, setDescription] = useState("");
    const [targetAmount, setTargetAmount] = useState("");
    const [deadlineDays, setDeadlineDays] = useState("30");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedCurrencies, setSelectedCurrencies] = useState<Currency[]>(["BTC", "ETH", "USDT", "BNB", "SOL"]);

    const toggleCurrency = (currency: Currency) => {
        setSelectedCurrencies((prev) =>
            prev.includes(currency)
                ? prev.filter((c) => c !== currency)
                : [...prev, currency]
        );
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: call Anchor instruction / API creating campaign
        console.log({
            title,
            category,
            description,
            targetAmount,
            deadlineDays,
            selectedCurrencies,
        });
    };

    return (
        <section className="create-campaign">
            <div className="create-campaign__container">
                <p className="create-campaign__eyebrow">START A NEW
                    FUNDRAISER</p>
                <h1 className="create-campaign__title">Create campaign</h1>
                <p className="create-campaign__subtitle">
                    Fill in the details below – your fundraiser will be live
                    on-chain right after submission.
                </p>

                <form className="create-campaign__grid" onSubmit={handleSubmit}>
                    <div className="create-campaign__form">
                        <div className="create-campaign__field">
                            <label className="create-campaign__label">Campaign
                                title</label>
                            <input
                                className="create-campaign__input"
                                placeholder="e.g. Drones for Ukraine!"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="create-campaign__field">
                            <label
                                className="create-campaign__label">Category</label>
                            <select
                                className="create-campaign__select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {CATEGORIES.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="create-campaign__field">
                            <label
                                className="create-campaign__label">Description</label>
                            <textarea
                                className="create-campaign__textarea"
                                placeholder="What are you raising funds for?"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="create-campaign__field">
                            <label className="create-campaign__label">Cover
                                image</label>
                            <label className="create-campaign__dropzone">
                                {imagePreview ? "Image selected – click to change" : "Drag & drop an image, or click to upload"}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="create-campaign__file-input"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>

                        <div className="create-campaign__row2">
                            <div className="create-campaign__field">
                                <label className="create-campaign__label">Target
                                    amount</label>
                                <input
                                    className="create-campaign__input"
                                    placeholder="e.g. 20 ETH"
                                    value={targetAmount}
                                    onChange={(e) => setTargetAmount(e.target.value)}
                                />
                            </div>
                            <div className="create-campaign__field">
                                <label className="create-campaign__label">Deadline
                                    (days)</label>
                                <input
                                    className="create-campaign__input"
                                    type="number"
                                    min={1}
                                    value={deadlineDays}
                                    onChange={(e) => setDeadlineDays(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="create-campaign__field">
                            <label className="create-campaign__label">
                                Accepted cryptocurrencies
                            </label>
                            <div className="create-campaign__chip-row">
                                {(Object.keys(CURRENCY_COLORS) as Currency[]).map((c) => (
                                    <button
                                        type="button"
                                        key={c}
                                        className={`create-campaign__chip ${
                                            selectedCurrencies.includes(c)
                                                ? "create-campaign__chip--on"
                                                : ""
                                        }`}
                                        onClick={() => toggleCurrency(c)}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button type="submit"
                                className="create-campaign__submit">
                            Create fundraiser <span>→</span>
                        </button>
                    </div>

                    <aside className="create-campaign__preview">
                        <p className="create-campaign__preview-label">Live
                            preview</p>

                        <div className="create-campaign__preview-header">
                            <span className="create-campaign__preview-title">
                                {title || "Your campaign title"}
                            </span>
                            <span
                                className="create-campaign__preview-badge">Active</span>
                        </div>

                        <div className="create-campaign__preview-image">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Cover preview"/>
                            ) : (
                                "Cover image preview"
                            )}
                        </div>

                        <p className="create-campaign__preview-desc">
                            {description || "Your campaign description will appear here."}
                        </p>

                        <div className="create-campaign__preview-bar">
                            <div className="create-campaign__preview-fill"
                                 style={{width: "%0"}}/>
                        </div>

                        <div className="create-campaign__preview-coins">
                            {selectedCurrencies.map((c) => (
                                <span
                                    key={c}
                                    className="create-campaign__preview-coin"
                                    style={{background: CURRENCY_COLORS[c]}}
                                >
                                    {c}
                                </span>
                            ))}
                        </div>
                    </aside>
                </form>
            </div>
        </section>
    )
}