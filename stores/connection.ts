import { POLYGON_CHAINID } from "~/utils/constants/chains";
import { NETWORKS } from "~/utils/constants/networks";

export const useConnectionStore = defineStore("connection", () => {
    const { $client } = useNuxtApp();

    const tokenStore = useTokenStore();

    const isConnectedMetamask: Ref<boolean> = ref(false);
    const isConnectedPolygon: Ref<boolean> = ref(false);
    const owner: Ref<string> = ref("");
    const chainId: Ref<string> = ref("");

    const connect = async (): Promise<boolean> => {
        if (!$client) {
            alert("Please install MetaMask!");
            return false;
        }

        addChainListener();

        const accounts = await $client.request({
            method: "eth_requestAccounts",
        });

        if (accounts.length === 0) return false;

        owner.value = accounts[0];

        chainId.value = await $client.request({ method: "eth_chainId" });

        await tokenStore.getNetworkTokens(chainId.value);

        return chainId.value === POLYGON_CHAINID;
    };

    const addChainListener = () => {
        $client.on("chainChanged", async (chainId: string) => {
            isConnectedPolygon.value = chainId === POLYGON_CHAINID;

            await tokenStore.getNetworkTokens(chainId);
        });
    };

    const addNetwork = async () => {
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
    };

    return {
        isConnectedMetamask,
        isConnectedPolygon,
        owner,
        chainId,
        connect,
        addChainListener,
    };
});
