import { useQuery } from 'react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Crypto {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

export default function TopCryptos() {
  const { data: cryptos, isLoading } = useQuery<Crypto[]>(
    'top-cryptos',
    async () => {
      const { data } = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 5,
            sparkline: false,
          },
        }
      );
      return data;
    },
    {
      refetchInterval: 30000, // Refetch every 30 seconds
    }
  );

  if (isLoading) {
    return (
      <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-700 rounded mb-2"></div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm"
    >
      <h2 className="text-xl font-bold text-white mb-6">Top Cryptocurrencies</h2>
      <div className="space-y-4">
        {cryptos?.map((crypto) => (
          <div
            key={crypto.id}
            className="flex items-center justify-between p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition"
          >
            <div className="flex items-center space-x-4">
              <img src={crypto.image} alt={crypto.name} className="w-8 h-8" />
              <div>
                <h3 className="font-medium text-white">{crypto.name}</h3>
                <span className="text-sm text-gray-400">{crypto.symbol.toUpperCase()}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white">${crypto.current_price.toLocaleString()}</div>
              <div
                className={`flex items-center space-x-1 ${
                  crypto.price_change_percentage_24h >= 0
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {crypto.price_change_percentage_24h >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}