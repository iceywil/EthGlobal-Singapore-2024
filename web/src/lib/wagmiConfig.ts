import { cookieStorage, createStorage, http } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, arbitrum } from "@reown/appkit/networks";
import { flowMainnet } from "viem/chains";
import { CaipNetwork } from "@reown/appkit";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error("Project ID is not defined");
}

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

export const networks = [flow, mainnet, arbitrum];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
