import { createPosition, getEthPrice } from "../services/api";
import type Token from "~/types/Token";

export const useLiquidityForm = () => {
    const connectionStore = useConnectionStore();

    const { getTokenBalance } = useEthers();

    const token0: Ref<Token | undefined> = ref();
    const token1: Ref<Token | undefined> = ref();
    const price0: Ref<number> = ref(0);
    const price1: Ref<number> = ref(0);
    const balance0: Ref<string> = ref("");
    const balance1: Ref<string> = ref("");
    const range: Ref<string> = ref("");
    const lowerRange: Ref<string> = ref("");
    const upperRange: Ref<string> = ref("");
    const amount0: Ref<string> = ref("");
    const amount1: Ref<string> = ref("");
    const priceInterval: Ref<NodeJS.Timeout | null> = ref(null);

    const setToken0 = (token: Token) => {
        token0.value = token;
    };

    const setToken1 = (token: Token) => {
        token1.value = token;
    };

    const setPrices = async () => {
        price0.value = 1;
        price1.value = await getEthPrice();
    };

    const setBalances = async () => {
        if (!token0.value || !token1.value) return;

        const tokenBalance0: string = await getTokenBalance(
            connectionStore.owner,
            token0.value.address,
            token0.value.decimals
        );

        const tokenBalance1: string = await getTokenBalance(
            connectionStore.owner,
            token1.value.address,
            token1.value.decimals
        );

        balance0.value = tokenBalance0;
        balance1.value = tokenBalance1;
    };

    const startPriceInterval = () => {
        priceInterval.value = setInterval(async () => {
            price1.value = await getEthPrice();
        }, 30 * 1000);
    };

    const stopPriceInterval = () => {
        if (priceInterval.value)
            clearInterval(priceInterval.value as NodeJS.Timeout);
    };

    const setRange = (event: any, pairPrice: number) => {
        if (!validateNumericInput(event)) return;

        lowerRange.value = (
            pairPrice *
            (1 - Number(range.value) / 100)
        ).toFixed(2);

        upperRange.value = (
            pairPrice *
            (1 + Number(range.value) / 100)
        ).toFixed(2);
    };

    const setAmount0 = (event: any, pairPrice: number) => {
        if (!token0.value || !token1.value) return;

        if (!validateNumericInput(event)) return;

        amount0.value = (Number(amount1.value) * pairPrice).toFixed(
            token0.value.decimals
        );

        if (!amount1.value) amount0.value = "";
    };

    const setAmount1 = (event: any, pairPrice: number) => {
        if (!token0.value || !token1.value) return;

        if (!validateNumericInput(event)) return;

        amount1.value = (Number(amount0.value) / pairPrice).toFixed(
            token1.value.decimals
        );

        if (!amount0.value) amount1.value = "";
    };

    const setMaxAmount0 = () => {
        if (!token0.value || !token1.value) return;

        amount0.value = balance0.value;

        setAmount1(amount0.value, price1.value);
    };

    const setMaxAmount1 = () => {
        if (!token0.value || !token1.value) return;

        amount1.value = balance1.value;

        setAmount0(amount1.value, price1.value);
    };

    const addLiquidity = async () => {
        if (!token0.value || !token1.value) return;

        if (!amount0.value || !amount1.value) return;

        if (Number(amount0.value) <= 0 || Number(amount1.value) <= 0) return;

        if (!lowerRange.value || !upperRange.value) return;

        //const signer = await getSigner();

        const tx = await createPosition({
            token0: token0.value.symbol,
            token1: token1.value.symbol,
            amount0: amount0.value,
            amount1: amount1.value,
            lowerRange: lowerRange.value,
            upperRange: upperRange.value,
        });

        console.log(tx);
    };

    return {
        setToken0,
        setToken1,
        token0,
        token1,
        price0,
        price1,
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
        addLiquidity,
        startPriceInterval,
        stopPriceInterval,
    };
};
