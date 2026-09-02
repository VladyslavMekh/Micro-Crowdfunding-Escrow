import React, { useState, useEffect } from 'react';
import { useCryptoPrices } from "../../../hooks/useCryptoPrices";
import "./CryptoMarketSection.css"

import btcIcon from "../../../assets/icons/bitcoin.png";
import ethIcon from "../../../assets/icons/ethereum.png";
import usdtIcon from "../../../assets/icons/usdt.png";
import bnbIcon from "../../../assets/icons/binance.png";
import solanaIcon from "../../../assets/icons/solana.png";

const cryptoData = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', icon: btcIcon, color: '#F7931A', fillColor: '#F7931A' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', icon: ethIcon, color: '#627EEA', fillColor: '#627EEA' },
  { id: 'tether', symbol: 'USDT', name: 'Tether', icon: usdtIcon, color: '#26A17B', fillColor: '#26A17B' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB', icon: bnbIcon, color: '#F3BA2F', fillColor: '#F3BA2F' },
  { id: 'solana', symbol: 'SOL', name: 'Solana', icon: solanaIcon, color: '#9945FF', fillColor: '#9945FF' },
];

// Function for generation SVG-lines
const generateChartPath = (data: number[], color: string) => {
  if (!data || data.length == 0) return { line: '', area: ''};

  const width = 100;
  const height = 40;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * (height - 8) - 4;
    return { x, y };
  });

  // We build a smooth curve through the point (Catmull-Rom -> Bezier)
  const buildSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length < 2) return '';

    let path = `M ${pts[0].x},${pts[0].y}`;

    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      // Controls dots curve based on neighboring nodes
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }

    return path;
  };

  const line = buildSmoothPath(points);
  const area = `${line} L ${width},${height} L 0,${height} Z`;

  return { line, area }
};

export const CryptoMarketSection: React.FC = () => {
  const { prices, loading, error } = useCryptoPrices(cryptoData.map(item => item.id));

  if (loading) return <div className="crypto-market__loading">Loading...</div>;
  if (error) return <div className="crypto-market__error">Error: {error}</div>;

  return (
      <section className="crypto-market">
        <div className="crypto-market__container">
          <div className="crypto-market__header">
            <h2 className="crypto-market__title">Popular cryptocurrencies</h2>
            <p className="crypto-market__subtitle">Real-time prices and 24h performance</p>
          </div>

          <div className="crypto-market__grid">
            {prices.map((coin, index) => {
              const meta = cryptoData.find(item => item.symbol === coin.symbol) || cryptoData[index];
              const chart = generateChartPath(coin.history || [], meta.color);

              return (
                  <div key={coin.symbol} className="crypto-market__card">
                    <div className="crypto-market__card-header">
                      <div className="crypto-market__coin-info">
                        <img src={meta.icon} alt={meta.symbol} className="crypto-market__coin-icon"/>
                        <div>
                          <div className="crypto-market__coin-name">{meta.name}</div>
                          <div className="crypto-market__coin-symbol">{meta.symbol}</div>
                        </div>
                      </div>
                      <div className="crypto-market__price-info">
                        <div className="crypto-market__price">
                          ${coin.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>

                    <div className="crypto-market__change">
                      <span className={coin.change24h >= 0 ? "crypto-market__change-up" : "crypto-market__change-down"}>
                        ↑ {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                      </span>
                      <span className="crypto-market__time">24h</span>
                    </div>

                    <div className="crypto-market__chart">
                      <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="crypto-market__chart-svg">
                        <defs>
                          <linearGradient id={`gradient-${meta.symbol}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={meta.fillColor} stopOpacity="1" />
                            <stop offset="100%" stopColor={meta.fillColor} stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d={chart.area} fill={`url(#gradient-${meta.symbol})`} />
                        <path d={chart.line} fill="none" stroke={meta.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
              );
            })}
          </div>

          <p className="crypto-market__footer-note">Prices are displayed in USD</p>
        </div>
      </section>
  );
};