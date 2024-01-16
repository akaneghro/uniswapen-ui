import { POLYGON_CHAINID } from "~/utils/constants/chains";
import { NETWORKS } from "~/utils/constants/networks";

export const useConnectionStore = defineStore("connection", () => {
    const { $client } = useNuxtApp();

    const isConnectedMetamask: Ref<boolean> = ref(false);
    const isConnectedPolygon: Ref<boolean> = ref(false);
    const owner: Ref<string> = ref("");

    const connect = async (): Promise<boolean> => {
        if (!$client) {
            alert("Please install MetaMask!");
            return false;
        }

        await $client.request({
            method: "wallet_addEthereumChain",
            params: [
                NETWORKS.find((network) => network.chainId === POLYGON_CHAINID),
            ],
        });

        const accounts = await $client.request({
            method: "eth_requestAccounts",
        });

        if (accounts.length === 0) {
            alert("Please connect to MetaMask!");
            return false;
        } else {
            owner.value = accounts[0];

            const chainId = await $client.request({ method: "eth_chainId" });

            if (chainId === POLYGON_CHAINID) isConnectedPolygon.value = true;

            $client.on("accountsChanged", (accounts: string[]) => {
                owner.value = accounts[0];
            });

            $client.on("chainChanged", (chainId: string) => {
                if (chainId !== POLYGON_CHAINID)
                    isConnectedPolygon.value = false;
            });

            return true;
        }
    };

    return {
        isConnectedMetamask,
        isConnectedPolygon,
        owner,
        connect,
    };
});
