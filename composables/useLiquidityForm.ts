import { getCurrentPrices } from "../apis/pool.api";
import { create } from "../apis/position.api";
import { Token } from "~/models/Token";
import { Price } from "~/models/Price";
import { PositionRequest } from "~/models/PositionRequest";
import { PERCENTAGE_RANGE, PRICE_RANGE } from "~/utils/constants/ranges";
import { validateNumericInput } from "~/utils/formFunctions";
import { StrategyParams } from "~/models/StrategyParams";

export const useLiquidityForm = () => {
    const connectionStore = useConnectionStore();
    const networkStore = useNetworkStore();

    const { getTokenBalance } = useEthers();

    const isAddingLiquidity = ref(false);
    const token0: Ref<Token | undefined> = ref();
    const token1: Ref<Token | undefined> = ref();
    const poolPrice: Ref<string> = ref("");
    const token0UsdPrice: Ref<string> = ref("");
    const token1UsdPrice: Ref<string> = ref("");
    const balance0: Ref<string> = ref("");
    const balance1: Ref<string> = ref("");
    const selectedRangeType: Ref<string> = ref("");
    const strategyParams: Ref<StrategyParams> = ref(new StrategyParams());
    const lowerRangeInput: Ref<string> = ref("");
    const upperRangeInput: Ref<string> = ref("");
    const invalidUpperRange: Ref<boolean> = ref(false);
    const invalidLowerRange: Ref<boolean> = ref(false);
    const amount0: Ref<string> = ref("");
    const amount1: Ref<string> = ref("");
    const invalidAmount0: Ref<boolean> = ref(false);
    const invalidAmount1: Ref<boolean> = ref(false);
    const fee: Ref<number> = ref(0);
    const priceInterval: Ref<NodeJS.Timeout | null> = ref(null);
    const setBalanceError: Ref<boolean> = ref(false);
    const openToken0Modal = ref(false);
    const openToken1Modal = ref(false);

    const invalidRanges = computed(() => {
        return (
            invalidLowerRange.value ||
            invalidUpperRange.value ||
            (lowerRangeInput.value &&
                upperRangeInput.value &&
                selectedRangeType.value !== PERCENTAGE_RANGE &&
                Number(lowerRangeInput.value) >= Number(upperRangeInput.value))
        );
    });

    const invalidAmounts = computed(() => {
        return invalidAmount0.value || invalidAmount1.value;
    });

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
        } catch (error) {
            setBalanceError.value = true;
        }
    };

    const startDataInterval = () => {
        priceInterval.value = setInterval(async () => {
            await setPrices();
            await setBalances();

            if (amount0.value) setAmount1(amount0.value);
            if (amount1.value) setAmount0(amount1.value);
        }, 10 * 1000);
    };

    const stopDataInterval = () => {
        if (priceInterval.value)
            clearInterval(priceInterval.value as NodeJS.Timeout);
    };

    const setLowerRange = (event: any) => {
        invalidLowerRange.value = false;

        if (event.target.value === "") {
            strategyParams.value.lowerRangeRatio = 0;
            return;
        }

        if (!validateNumericInput(event)) {
            invalidLowerRange.value = true;
            return;
        }

        if (selectedRangeType.value === PRICE_RANGE) {
            strategyParams.value.lowerRangeRatio = parseFloat(
                (
                    1 -
                    parseFloat(event.target.value) / parseFloat(poolPrice.value)
                ).toFixed(2)
            );
        } else if (selectedRangeType.value === PERCENTAGE_RANGE) {
            strategyParams.value.lowerRangeRatio = parseFloat(
                (event.target.value / 100).toFixed(2)
            );
        }
    };

    const setUpperRange = (event: any) => {
        invalidUpperRange.value = false;

        if (event.target.value === "") {
            strategyParams.value.upperRangeRatio = 0;
            return;
        }

        if (!validateNumericInput(event)) {
            invalidUpperRange.value = true;
            return;
        }

        if (selectedRangeType.value === PRICE_RANGE) {
            strategyParams.value.upperRangeRatio = parseFloat(
                (
                    parseFloat(event.target.value) /
                        parseFloat(poolPrice.value) -
                    1
                ).toFixed(2)
            );
        } else if (selectedRangeType.value === PERCENTAGE_RANGE) {
            strategyParams.value.upperRangeRatio = parseFloat(
                (event.target.value / 100).toFixed(2)
            );
        }
    };

    const cleanRanges = () => {
        strategyParams.value.lowerRangeRatio = 0;
        strategyParams.value.upperRangeRatio = 0;
        lowerRangeInput.value = "";
        upperRangeInput.value = "";
        invalidLowerRange.value = false;
        invalidUpperRange.value = false;
    };

    const setAmount0 = (event: any) => {
        invalidAmount0.value = false;

        if (!token0.value || !token1.value) return;

        if (!validateNumericInput(event)) {
            invalidAmount0.value = true;
            return;
        }

        amount0.value = (
            Number(amount1.value) / parseFloat(poolPrice.value)
        ).toFixed(token0.value.decimals);

        if (amount0.value > balance0.value) invalidAmount0.value = true;

        if (!amount1.value) amount0.value = "";
    };

    const setAmount1 = (event: any) => {
        invalidAmount1.value = false;

        if (!token0.value || !token1.value) return;

        if (!validateNumericInput(event)) {
            invalidAmount1.value = true;
            return;
        }

        amount1.value = (
            Number(amount0.value) * parseFloat(poolPrice.value)
        ).toFixed(token1.value.decimals);

        if (amount1.value > balance1.value) invalidAmount1.value = true;

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

    const selectToken0 = (token: Token) => {
        setToken0(token);
        openToken0Modal.value = false;
    };

    const selectToken1 = (token: Token) => {
        setToken1(token);
        openToken1Modal.value = false;
    };

    const addLiquidity = async (): Promise<boolean> => {
        try {
            isAddingLiquidity.value = true;

            if (!token0.value || !token1.value) return false;

            if (!amount0.value || !amount1.value) return false;

            if (Number(amount0.value) <= 0 || Number(amount1.value) <= 0)
                return false;

            if (
                !strategyParams.value.lowerRangeRatio ||
                !strategyParams.value.upperRangeRatio
            )
                return false;

            if (fee.value == 0) return false;

            return await create(
                new PositionRequest({
                    publicKey: connectionStore.owner,
                    chainId: networkStore.currentNetwork?.chainId ?? 0,
                    idToken0: token0.value.idToken,
                    idToken1: token1.value.idToken,
                    fee: fee.value,
                    amount0: amount0.value,
                    amount1: amount1.value,
                    strategyParams: strategyParams.value,
                })
            );
        } finally {
            isAddingLiquidity.value = false;
        }
    };

    return {
        isAddingLiquidity,
        token0,
        token1,
        poolPrice,
        token0UsdPrice,
        token1UsdPrice,
        setPrices,
        balance0,
        balance1,
        setBalances,
        selectedRangeType,
        lowerRangeInput,
        upperRangeInput,
        setLowerRange,
        setUpperRange,
        cleanRanges,
        invalidRanges,
        amount0,
        amount1,
        setAmount0,
        setAmount1,
        setMaxAmount0,
        setMaxAmount1,
        invalidAmounts,
        fee,
        addLiquidity,
        startDataInterval,
        stopDataInterval,
        setBalanceError,
        openToken0Modal,
        openToken1Modal,
        selectToken0,
        selectToken1,
    };
};
