import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { mainnet, sepolia, arbitrumSepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export function getConfig() {
  return createConfig({
    chains: [arbitrumSepolia, mainnet, sepolia],
    connectors: [injected()],
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
