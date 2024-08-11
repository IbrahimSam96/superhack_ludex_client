"use client";

import * as React from "react";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { avalancheFuji } from "wagmi/chains";
import { createWalletClient, custom } from "viem";

export const config = getDefaultConfig({
  appName: "MegaWeapon - Ludex",
  projectId: "52a2dd0d9df4662c8ebee5de93f9770c",
  chains: [avalancheFuji],
  transports: {
    [avalancheFuji.id]: http(
      "https://lively-wiser-cloud.avalanche-testnet.quiknode.pro/76c004da1d4f2c5e9a68bdc61228e985524f8c2e/ext/bc/C/rpc/",
      {
        fetchOptions: {
          headers: {
            Authorization: "Bearer 9b15374db7755f123e1c62bd7b5acf862d1f96f2",
          },
        },
      }
    ),
  },
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export const walletClient = createWalletClient({
  chain: avalancheFuji,
  transport: custom(window?.ethereum),
});

export default function Provider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#7b3fe4",
            accentColorForeground: "white",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          {mounted && children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
