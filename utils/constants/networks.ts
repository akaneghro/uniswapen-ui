import type Network from "~/types/Network";
import { POLYGON_CHAINID, MUMBAI_CHAINID } from "./chains";

const POLYGON_NETWORK: Network = {
    chainId: POLYGON_CHAINID,
    chainName: "Polygon Mainnet",
    rpcUrls: ["https://polygon-rpc.com/"],
    nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
    },
    blockExplorerUrls: ["https://polygonscan.com/"],
};

const MUMBAI_NETWORK: Network = {
    chainId: MUMBAI_CHAINID,
    chainName: "Mumbai Testnet",
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
    nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
    },
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
};

export const NETWORKS: Network[] = [POLYGON_NETWORK, MUMBAI_NETWORK];
