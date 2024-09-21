"use client";

import { wagmiAdapter, projectId } from "@/lib/wagmiConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CaipNetwork, createAppKit } from "@reown/appkit/react";
import {
  mainnet,
  arbitrum,
  avalanche,
  base,
  optimism,
  polygon,
} from "@reown/appkit/networks";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
import { flowMainnet } from "viem/chains";

const flow: CaipNetwork = {
  id: "eip155:545",
  chainId: 545,
  chainNamespace: "eip155",
  name: "Flow",
  rpcUrl: "https://testnet.evm.nodes.onflow.org",
  explorerUrl: "https://evm-testnet.flowscan.io",
  imageUrl: "https://developers.flow.com/img/flow-docs-logo-light.png",
  imageId: "flow",
  currency: "FLOW",
};

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Set up metadata
const metadata = {
  name: "appkit-example-scroll",
  description: "AppKit Example - Scroll",
  url: "https://scrollapp.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// Create the modal
const modal = createAppKit({
allowUnsupportedChain: true,
  adapters: [wagmiAdapter],
  projectId,
  networks: [flow, mainnet, arbitrum, avalanche, base, optimism, polygon, ],
  defaultNetwork: flow,
  metadata: metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
