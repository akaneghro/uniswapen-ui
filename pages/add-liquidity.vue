<script lang="ts" setup>
import { POLYGON_TOKENS } from "~/utils/constants/tokens";

definePageMeta({
    title: "Add liquidity",
    layout: "main",
});

const {
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
    amount0,
    amount1,
    setAmount0,
    setAmount1,
    addLiquidity,
    startPriceInterval,
    stopPriceInterval,
} = useLiquidityForm();

onMounted(async () => {
    setToken0(POLYGON_TOKENS.find((token) => token.symbol === "USDC")!);
    setToken1(POLYGON_TOKENS.find((token) => token.symbol === "WETH")!);

    await setPrices();
    await setBalances();
    startPriceInterval();
});

onUnmounted(() => {
    stopPriceInterval();
});
</script>

<template>
    <div>
        <Container title="Add liquidity" :back="true">
            <div class="flex flex-row">
                <ButtonSelect :showText="!token0" class="mr-2">
                    <Tag
                        :coinLogo="token0?.imageUrl"
                        :coinSymbol="token0?.symbol"
                    />
                </ButtonSelect>
                <ButtonSelect :showText="!token1" class="ml-2">
                    <Tag
                        :coinLogo="token1?.imageUrl"
                        :coinSymbol="token1?.symbol"
                    />
                </ButtonSelect>
            </div>

            <div class="mt-5">
                <p class="text-sm mb-1">Current price:</p>
                <p class="text-lg font-bold">$ {{ price1 }}</p>
                <p class="text-sm text-slate-400 mt-1">
                    {{ token1?.symbol }} per {{ token0?.symbol }}
                </p>
            </div>

            <div class="mt-8">
                <p>Deposit amounts</p>
                <div class="mt-5">
                    <Input
                        :coinSymbol="token0?.symbol"
                        :coinLogo="token0?.imageUrl"
                        :amountPrice="
                            amount0 !== ''
                                ? (parseFloat(amount0) * price0).toFixed(2)
                                : '0'
                        "
                        :coinBalance="balance0"
                        v-model="amount0"
                        @input="setAmount1($event, price1)"
                    />
                    <Input
                        :coinSymbol="token1?.symbol"
                        :coinLogo="token1?.imageUrl"
                        :amountPrice="
                            amount1 !== ''
                                ? (parseFloat(amount1) * price1).toFixed(2)
                                : '0'
                        "
                        :coinBalance="balance1"
                        v-model="amount1"
                        @input="setAmount0($event, price1)"
                        class="mt-3"
                    />
                </div>
            </div>

            <Button
                title="Add liquidity"
                @click="addLiquidity()"
                class="mt-8"
            />
        </Container>
    </div>
</template>

<style lang="scss" scoped></style>
