import React from 'react';
import { useCryptoPrices } from '../../../hooks/useCryptoPrices';
import './CryptoMarketSection.css';

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

  if (loading) return <div className="crypto-market__loading">Завантаження даних...</div>;
  if (error) return <div className="crypto-market__error">Помилка: {error}</div>;

  return (
    <section className="crypto-market">
      <div className="crypto-market__container">
        <h2 className="crypto-market__title">Live Market Overview</h2>
        <p className="crypto-market__subtitle">Real-time prices of cryptocurrencies available on the platform.</p>

        <div className="crypto-market__grid">
          {prices.map((asset, index) => (
            <div key={asset.symbol} className="crypto-market__card">
              <div className="crypto-market__header">
                <div className="crypto-market__symbol" style={{ backgroundColor: `${asset.symbol}20` }}>
                  {asset.symbol}
                </div>
                <span className={`crypto-market__change ${asset.change24h >= 0 ? 'crypto-market__change--up' : 'crypto-market__change--down'}`}>
                  {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                </span>
              </div>

              <div className="crypto-market__name">{symbolsMap[index].name}</div>
              <div className="crypto-market__price">${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>

              <div className="crypto-market__chart">
                <svg viewBox="0 0 100 40" className="crypto-market__chart-svg">
                  <path
                    d={asset.change24h >= 0 ? 'M0,35 L10,30 L20,32 L30,25 L40,28 L50,20 L60,22 L70,15 L80,18 L90,10 L100,5' : 'M0,5 L10,10 L20,8 L30,15 L40,12 L50,20 L60,18 L70,25 L80,22 L90,30 L100,35'}
                    fill="none"
                    stroke={asset.change24h >= 0 ? '#14F195' : '#EF4444'}
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};