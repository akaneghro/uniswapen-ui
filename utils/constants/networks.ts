import type Network from "~/types/Network";

const POLYGON_NETWORK: Network = {
    chainId: "0x89",
    chainName: "Polygon Mainnet",
    rpcUrls: ["https://polygon-rpc.com/"],
    nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
    },
    blockExplorerUrls: ["https://polygonscan.com/"],
};

export const NETWORKS: Network[] = [POLYGON_NETWORK];
