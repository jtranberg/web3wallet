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
      "📌 This is a demo application for exploring blockchain integrations. Please note:\n\n" +
      "⚠️ This demo does not include security features or user registration. Use it for testing purposes only.\n\n" +
      "🛠️ To get started:\n" +
      "1️⃣ Connect your wallet using the 'Connect Wallet' button.\n" +
      "2️⃣ Choose your preferred blockchain network (Mainnet, Polygon, Optimism, or Arbitrum).\n" +
      "3️⃣ Once connected, you can access your Dashboard.\n\n" +
      "🚨 IMPORTANT: Do not use real funds or sensitive information while using this demo."
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
