import React from 'react';
import { useCryptoPrices } from '../../../hooks/useCryptoPrices';
import './CryptoMarketSection.css';

const generateChartPath = (data: number[]): string => {
  if (!data || data.length === 0) return '';
  
  const width = 100;
  const height = 40;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * (height - 5) - 2.5;
    return `${x},${y}`;
  });
  return `M ${points.join(' L ')}`;
};

const symbolsMap = [
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'tether', symbol: 'USDT', name: 'Tether' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
];

export const CryptoMarketSection: React.FC = () => {
  const ids = symbolsMap.map(item => item.id).join(',');
  const { prices, loading, error } = useCryptoPrices(ids.split(','));

  if (loading) return <div className="crypto-market__loading">Loading data...</div>;
  if (error) return <div className="crypto-market__error">Error: {error}</div>;

  return (
    <section className="crypto-market">
      <div className="crypto-market__container">
        <h2 className="crypto-market__title">Live Market Overview</h2>
        <p className="crypto-market__subtitle">Real-time prices of cryptocurrencies available on the platform.</p>

        <div className="crypto-market__grid">
          {prices.map((asset, index) => {
            const chartPath = generateChartPath(asset.history);
            const isUp = asset.change24h >= 0;
            
            return (
              <div key={asset.symbol} className="crypto-market__card">
                <div className="crypto-market__header">
                  <div className="crypto-market__symbol">{symbolsMap[index]?.symbol || asset.symbol}</div>
                  <span className={`crypto-market__change ${isUp ? 'crypto-market__change--up' : 'crypto-market__change--down'}`}>
                    {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                  </span>
                </div>

                <div className="crypto-market__name">{symbolsMap[index]?.name || asset.name}</div>
                <div className="crypto-market__price">${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>

                <div className="crypto-market__chart">
                  <svg viewBox="0 0 100 40" className="crypto-market__chart-svg">
                    <path
                      d={chartPath}
                      fill="none"
                      stroke={isUp ? '#14F195' : '#EF4444'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};