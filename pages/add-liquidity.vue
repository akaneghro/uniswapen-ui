<script lang="ts" setup>
import { FEE_TIERS } from "~/utils/constants/fees";

definePageMeta({
    title: "Add liquidity",
    layout: "main",
});

const tokenStore = useTokenStore();

const {
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
    amount0,
    amount1,
    range,
    lowerRange,
    upperRange,
    setRange,
    setAmount0,
    setAmount1,
    setMaxAmount0,
    setMaxAmount1,
    addLiquidity,
    fee,
    startDataInterval,
    stopDataInterval,
    setBalanceError,
} = useLiquidityForm();

const {
    isLoading,
    isApprovedPM0,
    isApprovedPM1,
    isApprovedSR0,
    isApprovedSR1,
    isApprovingPM0,
    isApprovingPM1,
    isApprovingSR0,
    isApprovingSR1,
    isAllApproved,
    checkApprovePositionManager,
    checkApproveSwapRouter,
    approvePositionManager,
    approveSwapRouter,
} = useTokenContractManager();

watch([() => token0.value, () => token1.value, () => fee.value], async () => {
    if (token0.value && token1.value) {
        if (token0.value?.idToken !== 0 && token1.value?.idToken !== 0) {
            await checkApprovePositionManager(
                token0.value.idToken,
                isApprovedPM0
            );
            await checkApproveSwapRouter(token0.value.idToken, isApprovedSR0);

            await checkApprovePositionManager(
                token1.value.idToken,
                isApprovedPM1
            );
            await checkApproveSwapRouter(token1.value.idToken, isApprovedSR1);

            if (fee.value !== 0) {
                await setPrices();
                await setBalances();
                startDataInterval();
            }
        } else {
            stopDataInterval();
        }
    }
});

onMounted(async () => {
    setToken0(tokenStore.tokens.find((token) => token.code === "USDCE_POL")!);
    setToken1(tokenStore.tokens.find((token) => token.code === "WETH_POL")!);
});
</script>

<template>
    <div class="pt-12 pb-12">
        <Container
            title="Add liquidity"
            :back="true"
            textBack="Back to positions"
        >
            <div class="flex flex-row">
                <ButtonSelect :showText="!token0" class="mr-2">
                    <TokenTag
                        :coinLogo="token0?.logo"
                        :coinSymbol="token0?.symbol"
                    />
                </ButtonSelect>
                <ButtonSelect :showText="!token1" class="ml-2">
                    <TokenTag
                        :coinLogo="token1?.logo"
                        :coinSymbol="token1?.symbol"
                    />
                </ButtonSelect>
            </div>

            <div class="mt-8">
                <p>Fee tier</p>
                <div class="mt-3">
                    <div class="flex justify-between">
                        <FeeTier
                            v-for="(feeTier, index) in FEE_TIERS"
                            :key="index"
                            :title="feeTier.feeTier.toString()"
                            :isSelected="feeTier.fee === fee"
                            @click="fee = feeTier.fee"
                        />
                    </div>
                </div>
            </div>

            <div class="mt-8">
                <p>Set range (%)</p>
                <div class="mt-3">
                    <InputRange
                        :lowerRange="lowerRange ?? '-'"
                        :upperRange="upperRange ?? '-'"
                    >
                        <Input
                            v-model="range"
                            @input="setRange($event)"
                            placeholder="0.0%"
                            :disabled="!fee"
                        />
                    </InputRange>
                </div>
            </div>

            <div class="mt-8">
                <p class="text-sm mb-1">Current price:</p>
                <p class="text-lg font-bold">$ {{ poolPrice }}</p>
                <p class="text-sm text-slate-400 mt-1">
                    {{ token0?.symbol }} per {{ token1?.symbol }}
                </p>
            </div>

            <div class="mt-8">
                <p>Deposit amounts</p>
                <div class="mt-3">
                    <InputAmount
                        :coinSymbol="token0?.symbol"
                        :coinLogo="token0?.logo"
                        :amountUsd="
                            amount0 !== ''
                                ? (
                                      parseFloat(amount0) *
                                      parseFloat(token0UsdPrice)
                                  ).toFixed(2)
                                : '0'
                        "
                        :coinBalance="balance0"
                        @maxBalance="setMaxAmount0()"
                    >
                        <Input
                            v-model="amount0"
                            @input="setAmount1($event)"
                            placeholder="0.0"
                            :disabled="!fee"
                        />
                    </InputAmount>
                    <InputAmount
                        :coinSymbol="token1?.symbol"
                        :coinLogo="token1?.logo"
                        :amountUsd="
                            amount1 !== ''
                                ? (
                                      parseFloat(amount1) *
                                      parseFloat(token1UsdPrice)
                                  ).toFixed(2)
                                : '0'
                        "
                        :coinBalance="balance1"
                        @maxBalance="setMaxAmount1()"
                        class="mt-3"
                    >
                        <Input
                            v-model="amount1"
                            @input="setAmount0($event)"
                            placeholder="0.0"
                            :disabled="!fee"
                        />
                    </InputAmount>
                </div>
            </div>

            <Button
                v-if="!isApprovedPM0"
                :title="`Approve Position Manager ${token0?.symbol}`"
                :disabled="isLoading"
                :isLoading="isApprovingPM0"
                @click="
                    approvePositionManager(
                        token0?.idToken ?? 0,
                        toRef(isApprovedPM0),
                        toRef(isApprovingPM0)
                    )
                "
                class="mt-8"
            />
            <Button
                v-if="!isApprovedSR0"
                :title="`Approve Swap Router ${token0?.symbol}`"
                :disabled="isLoading"
                :isLoading="isApprovingSR0"
                @click="
                    approveSwapRouter(
                        token1?.idToken ?? 0,
                        toRef(isApprovedSR0),
                        toRef(isApprovingSR0)
                    )
                "
                class="mt-5"
            />
            <Button
                v-if="!isApprovedPM1"
                :title="`Approve Position Manager ${token1?.symbol}`"
                :disabled="isLoading"
                :isLoading="isApprovingPM1"
                @click="
                    approvePositionManager(
                        token1?.idToken ?? 0,
                        toRef(isApprovedPM1),
                        toRef(isApprovingPM1)
                    )
                "
                class="mt-8"
            />
            <Button
                v-if="!isApprovedSR1"
                :title="`Approve Swap Router ${token1?.symbol}`"
                :disabled="isLoading"
                :isLoading="isApprovingSR1"
                @click="
                    approveSwapRouter(
                        token1?.idToken ?? 0,
                        toRef(isApprovedSR1),
                        toRef(isApprovingSR1)
                    )
                "
                class="mt-5"
            />

            <Button
                v-if="isAllApproved"
                title="Add liquidity"
                :isLoading="isAddingLiquidity"
                @click="addLiquidity()"
                class="mt-8"
            />
        </Container>

        <ButtonFloat
            v-if="setBalanceError"
            title="Get Balance"
            class="fixed bottom-8 left-8"
            @click="setBalances()"
        />
    </div>
</template>

<style lang="scss" scoped></style>
