import { useEffect, useMemo, useState } from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

interface SolPricePoint {
    timestamp: number;
    price: number;
    time: string;
}

interface CoinGeckoResponse {
    prices: [number, number][];
}

const API_URL =
    "https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=1&interval=hourly";

export function SolPriceChart() {
    const [data, setData] = useState<SolPricePoint[]>([]);
    const [currentPrice, setCurrentPrice] = useState<number | null>(null);
    const [change24h, setChange24h] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const fetchSolPrice = async (): Promise<void> => {
        try {
            setError("");

            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error("Failed to fetch SOL price");
            }

            const json: CoinGeckoResponse = await response.json();

            const formatted: SolPricePoint[] = json.prices.map(
                ([timestamp, price]) => ({
                    timestamp,
                    price,
                    time: new Date(timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                })
            );

            setData(formatted);

            if (formatted.length > 0) {
                const latest = formatted[formatted.length - 1].price;
                const first = formatted[0].price;

                setCurrentPrice(latest);
                setChange24h(((latest - first) / first) * 100);
            }
        } catch (err) {
            console.error(err);
            setError("Unable to get SOL price.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSolPrice();

        const interval = window.setInterval(fetchSolPrice, 30_000);

        return () => {
            window.clearInterval(interval);
        };
    }, []);

    const minPrice = useMemo<number>(() => {
        if (!data.length) return 0;

        return Math.min(...data.map((item) => item.price));
    }, [data]);

    const maxPrice = useMemo<number>(() => {
        if (!data.length) return 0;

        return Math.max(...data.map((item) => item.price));
    }, [data]);

    if (loading) {
        return (
            <section className="sol-chart-card card">
                <div className="sol-chart-header">
                    <div>
                        <h2>SOL / USD</h2>
                        <p>Solana price</p>
                    </div>
                </div>

                <div className="sol-chart-loading">
                    Loading graphics…
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="sol-chart-card card">
                <div className="sol-chart-header">
                    <div>
                        <h2>SOL / USD</h2>
                        <p>Solana price</p>
                    </div>
                </div>

                <div className="sol-chart-error">{error}</div>
            </section>
        );
    }

    return (
        <section className="sol-chart-card card">
            <div className="sol-chart-header">
                <div>
                    <h2>SOL / USD</h2>
                    <p>Solana · last 24 hours</p>
                </div>

                <div className="sol-price-info">
                    <strong>
                        $
                        {currentPrice?.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </strong>

                    {change24h !== null && (
                        <span
                            className={
                                change24h >= 0
                                    ? "sol-change positive"
                                    : "sol-change negative"
                            }
                        >
              {change24h >= 0 ? "+" : ""}
                            {change24h.toFixed(2)}%
            </span>
                    )}
                </div>
            </div>

            <div className="sol-chart">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid
                            stroke="var(--border)"
                            strokeDasharray="4 4"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="time"
                            stroke="var(--ink-muted)"
                            tick={{
                                fill: "var(--ink-muted)",
                                fontSize: 11,
                            }}
                            tickLine={false}
                            axisLine={false}
                        />

                        <YAxis
                            domain={[
                                Math.floor(minPrice * 0.995),
                                Math.ceil(maxPrice * 1.005),
                            ]}
                            stroke="var(--ink-muted)"
                            tick={{
                                fill: "var(--ink-muted)",
                                fontSize: 11,
                            }}
                            tickLine={false}
                            axisLine={false}
                            width={65}
                            tickFormatter={(value: number) => `$${value.toFixed(0)}`}
                        />

                        <Tooltip
                            contentStyle={{
                                background: "var(--surface)",
                                border: "1px solid var(--border)",
                                borderRadius: "10px",
                                boxShadow: "var(--shadow-card)",
                            }}
                            labelStyle={{
                                color: "var(--ink-muted)",
                                marginBottom: "4px",
                            }}
                            formatter={(value) => [
                                `$${Number(value).toFixed(2)}`,
                                "SOL",
                            ]}
                        />

                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="var(--orange)"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{
                                r: 5,
                                fill: "var(--orange)",
                                stroke: "var(--surface)",
                                strokeWidth: 2,
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="sol-chart-footer">
        <span>
          Low: <strong>${minPrice.toFixed(2)}</strong>
        </span>

                <span>
          High: <strong>${maxPrice.toFixed(2)}</strong>
        </span>

                <span className="sol-live">
          <span className="sol-live-dot" />
          Live
        </span>
            </div>
        </section>
    );
}