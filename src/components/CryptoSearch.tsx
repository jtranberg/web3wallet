import { useState } from 'react';
import { useQuery } from 'react-query';
import { Search, X, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

export default function CryptoSearch() {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { data: coins, isLoading } = useQuery<Coin[]>(
    ['search-coins', search],
    async () => {
      if (!search) return [];
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${search}`
      );
      const searchData = await response.json();
      
      // Get detailed data for found coins
      const detailedResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${searchData.coins.slice(0, 5).map(c => c.id).join(',')}&order=market_cap_desc&sparkline=false`
      );
      return detailedResponse.json();
    },
    {
      enabled: search.length > 0,
    }
  );

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search any cryptocurrency..."
          className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-400"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        {search && (
          <button
            onClick={() => {
              setSearch('');
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && search && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 rounded-lg bg-gray-800/95 backdrop-blur-xl border border-gray-700 shadow-xl"
          >
            {isLoading ? (
              <div className="p-4 text-center text-gray-400">
                <Loader className="h-5 w-5 animate-spin mx-auto mb-2" />
                Searching...
              </div>
            ) : coins?.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                No cryptocurrencies found
              </div>
            ) : (
              <div className="divide-y divide-gray-700">
                {coins?.map((coin) => (
                  <motion.div
                    key={coin.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 hover:bg-gray-700/50 transition-colors cursor-pointer"
                    onClick={() => {
                      // Handle coin selection
                      setIsOpen(false);
                      setSearch('');
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <h3 className="font-medium text-white">{coin.name}</h3>
                          <span className="text-sm text-gray-400">
                            {coin.symbol.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white">
                          ${coin.current_price.toLocaleString()}
                        </div>
                        <div
                          className={`text-sm ${
                            coin.price_change_percentage_24h >= 0
                              ? 'text-green-400'
                              : 'text-red-400'
                          }`}
                        >
                          {coin.price_change_percentage_24h >= 0 ? '+' : ''}
                          {coin.price_change_percentage_24h?.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}