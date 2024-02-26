import { getCurrentPrices } from "../services/pool.api";
import { create } from "../services/position.api";
import { Token } from "~/models/Token";
import { Price } from "~/models/Price";
import { PositionRequest } from "~/models/PositionRequest";

export const useLiquidityForm = () => {
    const connectionStore = useConnectionStore();

    const { getTokenBalance } = useEthers();

    const isAddingLiquidity = ref(false);
    const token0: Ref<Token | undefined> = ref();
    const token1: Ref<Token | undefined> = ref();
    const poolPrice: Ref<string> = ref("");
    const token0UsdPrice: Ref<string> = ref("");
    const token1UsdPrice: Ref<string> = ref("");
    const balance0: Ref<string> = ref("");
    const balance1: Ref<string> = ref("");
    const range: Ref<string> = ref("");
    const lowerRange: Ref<string> = ref("");
    const upperRange: Ref<string> = ref("");
    const amount0: Ref<string> = ref("");
    const amount1: Ref<string> = ref("");
    const fee: Ref<number> = ref(0);
    const priceInterval: Ref<NodeJS.Timeout | null> = ref(null);
    const setBalanceError: Ref<boolean> = ref(false);

    const setToken0 = (token: Token) => {
        token0.value = token;
    };

    const setToken1 = (token: Token) => {
        token1.value = token;
    };

    const setPrices = async () => {
        const prices: Price = await getCurrentPrices(
            token0.value?.idToken ?? 0,
            token1.value?.idToken ?? 0,
            fee.value
        );

        poolPrice.value = prices.poolPrice;
        token0UsdPrice.value = prices.token0UsdPrice;
        token1UsdPrice.value = prices.token1UsdPrice;
    };

    const setBalances = async () => {
        if (!token0.value || !token1.value) return;

        try {
            setBalanceError.value = false;

            const token0Balance: string = await getTokenBalance(
                connectionStore.owner,
                token0.value.contract,
                token0.value.decimals
            );

            const token1Balance: string = await getTokenBalance(
                connectionStore.owner,
                token1.value.contract,
                token1.value.decimals
            );

            balance0.value = token0Balance;
            balance1.value = token1Balance;
        } catch (error) {
            setBalanceError.value = true;
            console.log(error);
        }
    };

    const startDataInterval = () => {
        priceInterval.value = setInterval(async () => {
            await setPrices();
            await setBalances();

            if (amount0.value) setAmount1(amount0.value);
            if (amount1.value) setAmount0(amount1.value);
        }, 30 * 1000);
    };

    const stopDataInterval = () => {
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
            parseFloat(poolPrice.value) *
            (1 - Number(range.value) / 100)
        ).toFixed(token1.value?.decimals ?? 0);

        upperRange.value = (
            parseFloat(poolPrice.value) *
            (1 + Number(range.value) / 100)
        ).toFixed(token1.value?.decimals ?? 0);
    };

    const setAmount0 = (event: any) => {
        if (!token0.value || !token1.value) return;

        if (!validateNumericInput(event)) return;

        amount0.value = (
            Number(amount1.value) / parseFloat(poolPrice.value)
        ).toFixed(token0.value.decimals);

        if (!amount1.value) amount0.value = "";
    };

    const setAmount1 = (event: any) => {
        if (!token0.value || !token1.value) return;

        if (!validateNumericInput(event)) return;

        amount1.value = (
            Number(amount0.value) * parseFloat(poolPrice.value)
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

    const addLiquidity = async (): Promise<boolean> => {
        try {
            isAddingLiquidity.value = true;

            if (!token0.value || !token1.value) return false;

            if (!amount0.value || !amount1.value) return false;

            if (Number(amount0.value) <= 0 || Number(amount1.value) <= 0)
                return false;

            if (!lowerRange.value || !upperRange.value) return false;

            if (fee.value == 0) return false;

            return await create(
                new PositionRequest({
                    publicKey: connectionStore.owner,
                    chainId: connectionStore.chainId,
                    idToken0: token0.value.idToken,
                    idToken1: token1.value.idToken,
                    amount0: amount0.value,
                    amount1: amount1.value,
                    fee: fee.value,
                    range: parseFloat(range.value) / 100,
                })
            );
        } finally {
            isAddingLiquidity.value = false;
        }
    };

    return {
        isAddingLiquidity,
        setToken0,
        setToken1,
        token0,
        token1,
        poolPrice,
        token0UsdPrice,
        token1UsdPrice,
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
        startDataInterval,
        stopDataInterval,
        setBalanceError,
    };
};
