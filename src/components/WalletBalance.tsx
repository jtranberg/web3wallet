import { useBalance } from 'wagmi';
import { motion } from 'framer-motion';

interface WalletBalanceProps {
  address: string;
}

export default function WalletBalance({ address }: WalletBalanceProps) {
  const { data: balance } = useBalance({
    address: address as `0x${string}`,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20"
    >
      <h2 className="text-lg font-medium text-gray-400 mb-2">Total Balance</h2>
      <div className="text-3xl font-bold text-white">
        {balance ? (
          <>
            {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
          </>
        ) : (
          <div className="animate-pulse bg-gray-700/50 h-8 w-32 rounded" />
        )}
      </div>
    </motion.div>
  );
}