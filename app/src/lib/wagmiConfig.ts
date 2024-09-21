import { cookieStorage, createStorage, http } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, arbitrum } from "@reown/appkit/networks";
import { lineaSepolia } from "viem/chains";
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

const linea: CaipNetwork = {
  id: `eip155:${lineaSepolia.id}`,
  chainId: lineaSepolia.id,
  chainNamespace: "eip155",
  name: lineaSepolia.name,
  rpcUrl: lineaSepolia.rpcUrls.default.http[0],
  explorerUrl: lineaSepolia.blockExplorers.default.url,
  imageUrl:
    "https://docs.lineascan.build/~gitbook/image?url=https%3A%2F%2F3545049868-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fcollections%252F2Jl594MjukDCeX0qYs61%252Ficon%252FjdClg9JGQKmrp03sAdRi%252Flinea.png%3Falt%3Dmedia%26token%3D9959f44b-0582-4935-9204-f5c286960428&width=32&dpr=2&quality=100&sign=636a1fd7&sv=1",
  imageId: "linea",
  currency: "ETH",
};

export const networks = [linea, flow, mainnet, arbitrum];

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
