import { useState, useEffect } from 'react';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Dashboard from './components/Dashboard';
import LoginScreen from './components/LoginScreen';

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Modern Crypto Wallet',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
  chains
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});

const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Use useEffect to show an alert when the app loads
  useEffect(() => {
    alert(
      "🔗 Welcome to the Modern Crypto Wallet! 🔗\n\n" +
      "📌 This app allows you to securely connect your wallet and access various blockchain networks.\n\n" +
      "🛠️ To get started:\n" +
      "1️⃣ Connect your wallet using the 'Connect Wallet' button.\n" +
      "2️⃣ Choose your preferred blockchain network (Mainnet, Polygon, Optimism, or Arbitrum).\n" +
      "3️⃣ Once connected, you can access your Dashboard.\n\n" +
      "⚠️ Please make sure your wallet is installed and properly set up before proceeding."
    );
  }, []);

  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider theme={darkTheme()} chains={chains}>
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            {isAuthenticated ? (
              <Dashboard />
            ) : (
              <LoginScreen onLogin={handleLogin} />
            )}
          </div>
        </QueryClientProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
