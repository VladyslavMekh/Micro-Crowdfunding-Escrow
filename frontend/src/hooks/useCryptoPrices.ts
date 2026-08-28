import { useState, useEffect } from 'react';

interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
}

const API_URL = 'https://api.coingecko.com/api/v3/simple/price';

export const useCryptoPrices = (symbols: string[]) => {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const ids = symbols.join(',');
        const response = await fetch(`${API_URL}?ids=${ids}&vs_currencies=usd&include_24hr_change=true`);
        
        if (!response.ok) {
          throw new Error('Error loading data.');
        }

        const data = await response.json();
        const formattedData = symbols.map(symbol => {
          const coinData = data[symbol];
          return {
            symbol: symbol,
            name: symbol,
            price: coinData?.usd ?? 0,
            change24h: coinData?.usd_24h_change ?? 0,
          };
        });

        setPrices(formattedData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    const intervalId = setInterval(fetchPrices, 30000);

    return () => clearInterval(intervalId);
  }, [symbols.join(',')]);

  return { prices, loading, error };
};