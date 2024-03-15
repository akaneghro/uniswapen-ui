import { getNetworks } from "~/apis/network.api";
import { Network } from "~/models/Network";

export const useNetworkStore = defineStore("network", () => {
    const networks = ref<Network[]>([]);
    const currentNetwork = ref<Network | null>(null);
    const isLoading = ref(false);

    const getAllNetworks = async (): Promise<void> => {
        isLoading.value = true;
        try {
            const response: Network[] = await getNetworks();

            networks.value = response;
        } finally {
            isLoading.value = false;
        }
    };

    const checkNetworkExists = (chainId: string): boolean => {
        const network = networks.value.find(
            (network: Network) => network.chainId === parseInt(chainId)
        );

        setCurrentNetwork(chainId);

        return network ? true : false;
    };

    const setCurrentNetwork = (chainId: string): void => {
        const network = networks.value.find(
            (network: Network) => network.chainId === parseInt(chainId)
        );

        currentNetwork.value = network ?? null;
    };

    return {
        networks,
        currentNetwork,
        isLoading,
        getAllNetworks,
        checkNetworkExists,
    };
});
