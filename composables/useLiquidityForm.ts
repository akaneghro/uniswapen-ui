import { createPosition } from "../services/api";
import type Token from "~/types/Token";

export const useLiquidityForm = (_token0: Token, _token1: Token) => {
    const token0: Ref<Token> = ref(_token0);
    const token1: Ref<Token> = ref(_token1);
    const amount0: Ref<string> = ref("");
    const amount1: Ref<string> = ref("");

    const setAmount0 = (event: any, pairPrice: number) => {
        if (!validateNumericInput(event)) return;

        amount0.value = (Number(amount1.value) / pairPrice).toFixed(
            token0.value.decimals
        );

        if (!amount1.value) amount0.value = "";
    };

    const setAmount1 = (event: any, pairPrice: number) => {
        if (!validateNumericInput(event)) return;

        amount1.value = (Number(amount0.value) * pairPrice).toFixed(
            token1.value.decimals
        );

        if (!amount0.value) amount1.value = "";
    };

    const addLiquidity = async () => {
        if (!amount0.value || !amount1.value) return;

        if (Number(amount0.value) <= 0 || Number(amount1.value) <= 0) return;

        //const signer = await getSigner();

        const tx = await createPosition({
            token0: token0.value.symbol,
            token1: token1.value.symbol,
            amount0: amount1.value,
            amount1: amount0.value,
        });

        console.log(tx);
    };

    return { amount0, amount1, setAmount0, setAmount1, addLiquidity };
};
