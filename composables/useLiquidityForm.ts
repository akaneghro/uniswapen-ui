import { createPosition, getPrice } from "../services/api";
import type Token from "~/types/Token";
import type Price from "~/types/Price";

export const useLiquidityForm = () => {
    const connectionStore = useConnectionStore();

    const { getTokenBalance } = useEthers();

    const token0: Ref<Token | undefined> = ref();
    const token1: Ref<Token | undefined> = ref();
    const price0: Ref<string> = ref("");
    const price1: Ref<string> = ref("");
    const priceUsd0: Ref<string> = ref("");
    const priceUsd1: Ref<string> = ref("");
    const balance0: Ref<string> = ref("");
    const balance1: Ref<string> = ref("");
    const range: Ref<string> = ref("");
    const lowerRange: Ref<string> = ref("");
    const upperRange: Ref<string> = ref("");
    const amount0: Ref<string> = ref("");
    const amount1: Ref<string> = ref("");
    const fee: Ref<number> = ref(0);
    const priceInterval: Ref<NodeJS.Timeout | null> = ref(null);

    const setToken0 = (token: Token) => {
        token0.value = token;
    };

    const setToken1 = (token: Token) => {
        token1.value = token;
    };

    const setPrices = async () => {
        const prices: Price = await getPrice(
            token0.value?.symbol ?? "",
            token1.value?.symbol ?? ""
        );

        price0.value = prices.price0;
        price1.value = prices.price1;
        priceUsd0.value = prices.priceUsd0;
        priceUsd1.value = prices.priceUsd1;
    };

    const setBalances = async () => {
        if (!token0.value || !token1.value) return;

        const token0Balance: string = await getTokenBalance(
            connectionStore.owner,
            token0.value.address,
            token0.value.decimals
        );

        const token1Balance: string = await getTokenBalance(
            connectionStore.owner,
            token1.value.address,
            token1.value.decimals
        );

        balance0.value = token0Balance;
        balance1.value = token1Balance;
    };

    const startPriceInterval = () => {
        priceInterval.value = setInterval(async () => {
            await setPrices();
        }, 30 * 1000);
    };

    const stopPriceInterval = () => {
        if (priceInterval.value)
            clearInterval(priceInterval.value as NodeJS.Timeout);
    };

    const setRange = (event: any) => {
        if (event.target.value === "") {
            lowerRange.value = "";
            upperRange.value = "";
            return;
        }

        if (!validateNumericInput(event)) return;

        range.value = event.target.value;

        lowerRange.value = (
            parseFloat(price1.value) *
            (1 - Number(range.value) / 100)
        ).toFixed(token1.value?.decimals ?? 0);

        upperRange.value = (
            parseFloat(price1.value) *
            (1 + Number(range.value) / 100)
        ).toFixed(token1.value?.decimals ?? 0);
    };

    const setAmount0 = (event: any) => {
        if (!token0.value || !token1.value) return;

        if (!validateNumericInput(event)) return;

        amount0.value = (
            Number(amount1.value) * parseFloat(price0.value)
        ).toFixed(token0.value.decimals);

        if (!amount1.value) amount0.value = "";
    };

    const setAmount1 = (event: any) => {
        if (!token0.value || !token1.value) return;

        if (!validateNumericInput(event)) return;

        amount1.value = (
            Number(amount0.value) * parseFloat(price1.value)
        ).toFixed(token1.value.decimals);

        if (!amount0.value) amount1.value = "";
    };

    const setMaxAmount0 = () => {
        if (!token0.value || !token1.value) return;

        amount0.value = balance0.value;

        setAmount1(amount0.value);
    };

    const setMaxAmount1 = () => {
        if (!token0.value || !token1.value) return;

        amount1.value = balance1.value;

        setAmount0(amount1.value);
    };

    const addLiquidity = async () => {
        if (!token0.value || !token1.value) return;

        if (!amount0.value || !amount1.value) return;

        if (Number(amount0.value) <= 0 || Number(amount1.value) <= 0) return;

        if (!lowerRange.value || !upperRange.value) return;

        if (fee.value == 0) return;

        //const signer = await getSigner();

        const tx = await createPosition({
            token0Symbol: token0.value.symbol,
            token1Symbol: token1.value.symbol,
            amount0: amount0.value,
            amount1: amount1.value,
            fee: fee.value,
            range: parseFloat(range.value) / 100,
        });

        console.log(tx);
    };

    return {
        setToken0,
        setToken1,
        token0,
        token1,
        price1,
        priceUsd0,
        priceUsd1,
        setPrices,
        balance0,
        balance1,
        setBalances,
        range,
        lowerRange,
        upperRange,
        setRange,
        amount0,
        amount1,
        setAmount0,
        setAmount1,
        setMaxAmount0,
        setMaxAmount1,
        fee,
        addLiquidity,
        startPriceInterval,
        stopPriceInterval,
    };
};
