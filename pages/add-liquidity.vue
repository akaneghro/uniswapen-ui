<script lang="ts" setup>
import { getEthPrice, createPosition } from "~/services/api";

definePageMeta({
    title: "Add liquidity",
    layout: "main",
});

const { $ethers } = useNuxtApp();

const ethPrice = ref(0);

const priceInterval: Ref<NodeJS.Timeout | null> = ref(null);

const wethAmount = ref("");

const usdcAmount = ref("");

const getSigner = async () => {
    const signer = await $ethers.getSigner();

    return signer.address;
};

const setWethAmount = (event: any) => {
    if (!validateNumericInput(event)) return;

    wethAmount.value = (Number(usdcAmount.value) / ethPrice.value).toFixed(8);

    if (!usdcAmount.value) wethAmount.value = "";
};

const setUsdcAmount = (event: any) => {
    if (!validateNumericInput(event)) return;

    usdcAmount.value = (Number(wethAmount.value) * ethPrice.value).toFixed(2);

    if (!wethAmount.value) usdcAmount.value = "";
};

const validateNumericInput = (event: any) => {
    let value = event.target.value;

    if (/[^0-9.]/.test(value)) {
        value = value.replace(/[^0-9.]/g, "");
        event.target.value = value;
        return false;
    }

    if (
        (value === "." || value === "0") &&
        event.inputType !== "deleteContentBackward"
    ) {
        event.target.value = "0.";
        return false;
    }

    if (value.includes(".") && value.split(".").length >= 3) {
        event.target.value = value.slice(0, -1);
        return false;
    }

    return true;
};

const addLiquidity = async (wethAmount: string, usdcAmount: string) => {
    if (!wethAmount || !usdcAmount) return;

    if (Number(wethAmount) <= 0 || Number(usdcAmount) <= 0) return;

    const signer = await getSigner();

    const tx = await createPosition({
        token0: "USDC",
        token1: "WETH",
        amount0: usdcAmount,
        amount1: wethAmount,
    });

    console.log(tx);
};

onMounted(async () => {
    ethPrice.value = await getEthPrice();

    // priceInterval.value = setInterval(async () => {
    //     ethPrice.value = await getEthPrice();
    // }, 30000);
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
                    <Tag coinLogo="/images/usdc.png" coinName="USDC" />
                </ButtonSelect>
                <ButtonSelect class="ml-2">
                    <Tag coinLogo="/images/eth.png" coinName="WETH" />
                </ButtonSelect>
            </div>

            <div class="mt-5">
                <p class="text-sm mb-1">Current price:</p>
                <p class="text-lg font-bold">$ {{ ethPrice }}</p>
                <p class="text-sm text-slate-400 mt-1">USDC per WETH</p>
            </div>

            <div class="mt-8">
                <p>Deposit amounts</p>
                <div class="mt-5">
                    <Input
                        coinName="USDC"
                        coinLogo="/images/usdc.png"
                        :amountPrice="`$ ${
                            wethAmount !== ''
                                ? parseInt(wethAmount) * ethPrice
                                : 0
                        }`"
                        coinBalance="0"
                        v-model="usdcAmount"
                        @input="setWethAmount($event)"
                    />
                    <Input
                        coinName="WETH"
                        coinLogo="/images/eth.png"
                        :amountPrice="`$ ${usdcAmount}`"
                        coinBalance="0"
                        v-model="wethAmount"
                        @input="setUsdcAmount($event)"
                        class="mt-3"
                    />
                </div>
            </div>

            <Button
                title="Add liquidity"
                @click="addLiquidity(wethAmount, usdcAmount)"
                class="mt-8"
            />
        </Container>
    </div>
</template>

<style lang="scss" scoped></style>
