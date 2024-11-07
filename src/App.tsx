import { useState } from 'react';
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

  const handleLogin = (email: string) => {
    setIsAuthenticated(true);
    // You could store the user's email or other data in state/context if needed
  };

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