import { getTokens } from "~/apis/token.api";
import { Token } from "~/models/Token";

export const useTokenStore = defineStore("token", () => {
    const networkStore = useNetworkStore();

    const tokens = ref<Token[]>([]);
    const isLoading = ref(false);

    const getNetworkTokens = async () => {
        isLoading.value = true;
        try {
            const response: Token[] = await getTokens(
                networkStore.currentNetwork?.chainId ?? 0
            );

            tokens.value = response;
        } finally {
            isLoading.value = false;
        }
    };

    return {
        tokens,
        isLoading,
        getNetworkTokens,
    };
});
