import React from 'react';
import { WagmiConfig, createClient } from 'wagmi';
import { rainbowKitProvider, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import 'global.css';

const client = createClient();

const RootLayout = ({ children }) => {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider>
        <div>{children}</div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default RootLayout;