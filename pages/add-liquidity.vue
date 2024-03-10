<script lang="ts" setup>
import { FEE_TIERS } from "~/utils/constants/fees";
import { PERCENTAGE_RANGE, PRICE_RANGE } from "~/utils/constants/ranges";

definePageMeta({
    title: "Add liquidity",
    layout: "main",
});

const tokenStore = useTokenStore();

const {
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
    amount0,
    amount1,
    selectedRangeType,
    lowerRangeInput,
    upperRangeInput,
    setLowerRange,
    setUpperRange,
    cleanRanges,
    invalidRanges,
    setAmount0,
    setAmount1,
    setMaxAmount0,
    setMaxAmount1,
    invalidAmounts,
    addLiquidity,
    fee,
    startDataInterval,
    stopDataInterval,
    setBalanceError,
    openToken0Modal,
    openToken1Modal,
    selectToken0,
    selectToken1,
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
} = useApproveManager();

watch([() => token0.value, () => token1.value, () => fee.value], async () => {
    if (token0.value && token1.value) {
        if (token0.value && token1.value) {
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
</script>

<template>
    <div class="pt-12 pb-12">
        <Container
            title="Add liquidity"
            :back="true"
            textBack="Back to positions"
        >
            <div class="flex flex-row">
                <TokenSelectButton
                    :showText="!token0"
                    class="mr-2"
                    @click="openToken0Modal = true"
                >
                    <TokenTag
                        :coinLogo="token0?.logo"
                        :coinSymbol="token0?.symbol"
                    />
                </TokenSelectButton>
                <TokenSelectButton
                    :showText="!token1"
                    class="ml-2"
                    @click="openToken1Modal = true"
                >
                    <TokenTag
                        :coinLogo="token1?.logo"
                        :coinSymbol="token1?.symbol"
                    />
                </TokenSelectButton>
            </div>

            <div v-if="token0 && token1" class="mt-8">
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

            <div v-if="token0 && token1" class="mt-8">
                <div class="flex flex-row justify-between content-center">
                    <p>{{ `Set ${selectedRangeType} range` }}</p>
                    <div class="flex">
                        <InputRadio
                            :id="PERCENTAGE_RANGE"
                            :value="PERCENTAGE_RANGE"
                            name="rangeType"
                            :label="PERCENTAGE_RANGE"
                            v-model="selectedRangeType"
                            @click="cleanRanges()"
                            class="ml-5"
                        />
                        <InputRadio
                            :id="PRICE_RANGE"
                            :value="PRICE_RANGE"
                            name="rangeType"
                            :label="PRICE_RANGE"
                            v-model="selectedRangeType"
                            @click="cleanRanges()"
                            class="ml-5"
                        />
                    </div>
                </div>

                <div class="mt-3">
                    <InputRange
                        :title="`Lower ${selectedRangeType}`"
                        :token0Symbol="token0?.symbol"
                        :token1Symbol="token1?.symbol"
                        :showText="!selectedRangeType ? true : false"
                    >
                        <Input
                            v-if="selectedRangeType === PERCENTAGE_RANGE"
                            v-model="lowerRangeInput"
                            @input="setLowerRange($event)"
                            placeholder="0.0%"
                            :disabled="!fee"
                        />
                        <Input
                            v-else-if="selectedRangeType === PRICE_RANGE"
                            v-model="lowerRangeInput"
                            @input="setLowerRange($event)"
                            placeholder="0.0"
                            :disabled="!fee"
                        />
                    </InputRange>
                </div>

                <div class="mt-3">
                    <InputRange
                        :title="`Upper ${selectedRangeType}`"
                        :token0Symbol="token0?.symbol"
                        :token1Symbol="token1?.symbol"
                        :showText="!selectedRangeType ? true : false"
                    >
                        <Input
                            v-if="selectedRangeType === PERCENTAGE_RANGE"
                            v-model="upperRangeInput"
                            @input="setUpperRange($event)"
                            placeholder="0.0%"
                            :disabled="!fee"
                        />
                        <Input
                            v-else-if="selectedRangeType === PRICE_RANGE"
                            v-model="upperRangeInput"
                            @input="setUpperRange($event)"
                            placeholder="0.0"
                            :disabled="!fee"
                        />
                    </InputRange>
                </div>

                <InputAlert
                    v-if="invalidRanges"
                    message="Invalid ranges"
                    class="mt-3"
                />
            </div>

            <div v-if="token0 && token1" class="mt-8">
                <p class="text-sm mb-1">Current price:</p>
                <p class="text-lg font-bold">$ {{ poolPrice }}</p>
                <p class="text-sm text-slate-400 mt-1">
                    {{ token0?.symbol }} per {{ token1?.symbol }}
                </p>
            </div>

            <div v-if="token0 && token1" class="mt-8">
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

                <InputAlert
                    v-if="invalidAmounts"
                    message="Invalid amounts"
                    class="mt-3"
                />
            </div>

            <Button
                v-if="token0 && !isApprovedPM0"
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
                v-if="token0 && !isApprovedSR0"
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
                v-if="token1 && !isApprovedPM1"
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
                v-if="token1 && !isApprovedSR1"
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
                v-if="isAllApproved && token0 && token1"
                title="Add liquidity"
                :isLoading="isAddingLiquidity"
                @click="addLiquidity()"
                class="mt-8"
            />
        </Container>

        <Modal v-if="openToken0Modal" @closeModal="openToken0Modal = false">
            <TokenTag
                v-for="token in tokenStore.tokens.filter(
                    (t) => t.idToken !== 0
                )"
                :key="token.idToken"
                :coinLogo="token.logo"
                :coinSymbol="token.symbol"
                class="cursor-pointer p-4 border border-slate-500 m-4"
                @click="selectToken0(token)"
            />
        </Modal>

        <Modal v-if="openToken1Modal" @closeModal="openToken1Modal = false">
            <TokenTag
                v-for="token in tokenStore.tokens.filter(
                    (t) => t.idToken !== token0?.idToken
                )"
                :key="token.idToken"
                :coinLogo="token.logo"
                :coinSymbol="token.symbol"
                class="cursor-pointer p-4 border border-slate-600 m-4"
                @click="selectToken1(token)"
            />
        </Modal>

        <ButtonFloat
            v-if="setBalanceError"
            title="Get Balance"
            class="fixed bottom-8 left-8"
            @click="setBalances()"
        />
    </div>
</template>

<style lang="scss" scoped></style>
