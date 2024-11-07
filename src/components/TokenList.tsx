import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface TokenListProps {
  prices: {
    [key: string]: {
      usd: number;
      usd_24h_change: number;
    };
  };
}

const tokens = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  { id: 'binancecoin', name: 'BNB', symbol: 'BNB' },
  { id: 'ripple', name: 'XRP', symbol: 'XRP' },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
];

export default function TokenList({ prices }: TokenListProps) {
  if (!prices) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-700/50 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tokens.map((token, index) => {
        const price = prices[token.id];
        if (!price) return null;

        const priceChange = price.usd_24h_change;
        const isPositive = priceChange >= 0;

        return (
          <motion.div
            key={token.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <img
                src={`https://assets.coincap.io/assets/icons/${token.symbol.toLowerCase()}@2x.png`}
                alt={token.name}
                className="w-8 h-8"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/32';
                }}
              />
              <div>
                <h3 className="font-medium text-white">{token.name}</h3>
                <span className="text-sm text-gray-400">{token.symbol}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-white">
                ${price.usd.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
              <div className={`flex items-center text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {isPositive ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                <span>{Math.abs(priceChange).toFixed(2)}%</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}