<script lang="ts" setup>
import { getEthPrice } from "~/services/api";
import type Token from "~/types/Token";

definePageMeta({
    title: "Add liquidity",
    layout: "main",
});

const token0: Token = {
    symbol: "WETH",
    name: "WETH",
    imageUrl: "/images/eth.png",
    decimals: 18,
};

const token1: Token = {
    symbol: "USDC",
    name: "USDC",
    imageUrl: "/images/usdc.png",
    decimals: 6,
};

const { amount0, amount1, setAmount0, setAmount1, addLiquidity } =
    useLiquidityForm(token0, token1);

const token0Price = ref(0);

const token1Price = ref(0);

const priceInterval: Ref<NodeJS.Timeout | null> = ref(null);

onMounted(async () => {
    token0Price.value = await getEthPrice();
    token1Price.value = 1;

    // priceInterval.value = setInterval(async () => {
    //     ethPrice.value = await getEthPrice();
    // }, 30 * 1000);
});

onUnmounted(() => {
    clearInterval(priceInterval.value as NodeJS.Timeout);
});
</script>

<template>
    <div>
        <Container title="Add liquidity" :back="true">
            <div class="flex flex-row">
                <ButtonSelect class="mr-2">
                    <Tag
                        :coinLogo="token0.imageUrl"
                        :coinSymbol="token0.symbol"
                    />
                </ButtonSelect>
                <ButtonSelect class="ml-2">
                    <Tag
                        :coinLogo="token1.imageUrl"
                        :coinSymbol="token1.symbol"
                    />
                </ButtonSelect>
            </div>

            <div class="mt-5">
                <p class="text-sm mb-1">Current price:</p>
                <p class="text-lg font-bold">$ {{ token0Price }}</p>
                <p class="text-sm text-slate-400 mt-1">
                    {{ token1.symbol }} per {{ token0.symbol }}
                </p>
            </div>

            <div class="mt-8">
                <p>Deposit amounts</p>
                <div class="mt-5">
                    <Input
                        :coinSymbol="token0.symbol"
                        :coinLogo="token0.imageUrl"
                        :amountPrice="
                            amount0 !== ''
                                ? (parseFloat(amount0) * token0Price).toFixed(2)
                                : '0'
                        "
                        coinBalance="0"
                        v-model="amount0"
                        @input="setAmount1($event, token0Price)"
                    />
                    <Input
                        :coinSymbol="token1.symbol"
                        :coinLogo="token1.imageUrl"
                        :amountPrice="
                            amount1 !== ''
                                ? (parseFloat(amount1) * token1Price).toFixed(2)
                                : '0'
                        "
                        coinBalance="0"
                        v-model="amount1"
                        @input="setAmount0($event, token0Price)"
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
