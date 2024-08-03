import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { mainnet, sepolia, arbitrumSepolia } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

export function getConfig() {
  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
  if (!projectId) throw new Error("Wallet Connect projectId is invalid.");
  return createConfig({
    chains: [arbitrumSepolia, mainnet, sepolia],
    connectors: [
      injected(),
      walletConnect({
        projectId,
      }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [arbitrumSepolia.id]: http(),
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  });
}
