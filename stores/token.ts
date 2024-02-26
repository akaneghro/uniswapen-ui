import { getTokens } from "~/services/token.api";
import { Token } from "~/models/Token";

export const useTokenStore = defineStore("token", () => {
    const tokens = ref<Token[]>([]);
    const isLoading = ref(false);

    const getNetworkTokens = async (chainId: string) => {
        isLoading.value = true;
        try {
            const response: Token[] = await getTokens(chainId);

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
