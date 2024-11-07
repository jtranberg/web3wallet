import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useQuery } from 'react-query';
import { ArrowUpRight, ArrowDownRight, Wallet, LineChart, RefreshCcw } from 'lucide-react';
import TokenList from './TokenList';
import WalletBalance from './WalletBalance';
import CryptoSearch from './CryptoSearch';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { address } = useAccount();
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: prices } = useQuery(
    ['crypto-prices', refreshKey],
    async () => {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,ripple,cardano&vs_currencies=usd&include_24hr_change=true'
      );
      return response.json();
    },
    {
      refetchInterval: 30000,
    }
  );

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center space-x-2">
            <Wallet className="h-8 w-8 text-purple-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Modern Crypto Wallet
            </h1>
          </div>
          <ConnectButton />
        </header>

        <div className="mb-8 max-w-2xl">
          <CryptoSearch />
        </div>

        <main className="space-y-8">
          {address && <WalletBalance address={address} />}

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-gray-800/50 backdrop-blur-xl border border-gray-700"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <LineChart className="h-5 w-5 mr-2 text-purple-500" />
                  Top Cryptocurrencies
                </h2>
                <button
                  onClick={() => setRefreshKey(k => k + 1)}
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <RefreshCcw className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              <TokenList prices={prices} />
            </motion.div>

            {address && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-2xl bg-gray-800/50 backdrop-blur-xl border border-gray-700"
              >
                <h2 className="text-xl font-semibold text-white mb-6">Recent Transactions</h2>
                <div className="text-gray-400 text-center py-8">
                  Connect your wallet to view transactions
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}