export const useConnectionStore = defineStore("connection", () => {
    const { $client } = useNuxtApp();

    const networkStore = useNetworkStore();
    const tokenStore = useTokenStore();

    const isConnectedMetamask: Ref<boolean> = ref(false);
    const owner: Ref<string> = ref("");

    const connect = async (isConnected: Ref<boolean>): Promise<void> => {
        if (!$client) {
            alert("Please install MetaMask!");
            return;
        }

        addChainListener();

        const accounts = await $client.request({
            method: "eth_requestAccounts",
        });

        if (accounts.length === 0) return;

        owner.value = accounts[0];

        const chainId = await $client.request({ method: "eth_chainId" });

        await networkStore.getAllNetworks();

        if (!networkStore.checkNetworkExists(chainId)) return;

        await tokenStore.getNetworkTokens();

        isConnected.value = true;
    };

    const addChainListener = () => {
        $client.on("chainChanged", async (chainId: string) => {
            if (!networkStore.checkNetworkExists(chainId)) return;

            await tokenStore.getNetworkTokens();
        });
    };

    // const addNetwork = async () => {
    //     if (!$client) {
    //         alert("Please install MetaMask!");
    //         return false;
    //     }

    //     await $client.request({
    //         method: "wallet_addEthereumChain",
    //         params: [
    //             NETWORKS.find((network) => network.chainId === POLYGON_CHAINID),
    //         ],
    //     });
    // };

    return {
        isConnectedMetamask,
        owner,
        connect,
        addChainListener,
    };
});
