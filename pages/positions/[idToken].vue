<script lang="ts" setup>
definePageMeta({
    title: "Position manage",
    layout: "main",
});

const { positionData, getPositionData, closePosition } = usePositionManage();

const close = async () => {
    const result = await closePosition(positionData.value.tokenId);

    if (result) useRouter().push("/positions");
};

onMounted(async () => {
    await getPositionData(parseInt(useRoute().params.idToken.toString()));
});
</script>

<template>
    <div class="pt-12 pb-12">
        <Container :back="true" class="relative">
            <PositionStatus
                :position="positionData"
                :showCircle="true"
                class="absolute top-4 right-4"
            />

            <div class="flex flex-row justify-between">
                <div class="flex flex-row items-baseline">
                    <p class="text-xl">
                        <a
                            :href="`https://polygonscan.com/token/${positionData.positionSerie.token0.address}`"
                            target="_blank"
                            >{{ positionData.positionSerie.token0.symbol }}</a
                        >
                        /
                        <a
                            :href="`https://polygonscan.com/token/${positionData.positionSerie.token1.address}`"
                            target="_blank"
                            >{{ positionData.positionSerie.token1.symbol }}</a
                        >
                    </p>

                    <p class="text-lg text-gray-400 ml-4">
                        {{ positionData.positionSerie.feeTier.feePercentage }}
                    </p>

                    <a
                        :href="`https://app.uniswap.org/pools/${positionData.tokenId}`"
                        target="_blank"
                        ><IconExternalLink :size="20" class="ml-4"
                    /></a>
                </div>
                <div>
                    <ButtonSmall title="Add liquidity" />
                    <ButtonSmallSolid
                        v-if="!positionData.isClosed"
                        title="Close position"
                        class="ml-4"
                        @click="close()"
                    />
                </div>
            </div>

            <div class="mt-8">
                <p>Price Range</p>

                <div class="flex flex-row mt-3">
                    <PositionPriceRange
                        title="Min price"
                        :price="positionData.lowerPrice"
                        :currentPrice="positionData.currentPrice"
                        :token0Symbol="positionData.positionSerie.token0.symbol"
                        :token1Symbol="positionData.positionSerie.token1.symbol"
                        class="mr-2"
                    />

                    <PositionPriceRange
                        title="Max price"
                        :price="positionData.upperPrice"
                        :currentPrice="positionData.currentPrice"
                        :token0Symbol="positionData.positionSerie.token0.symbol"
                        :token1Symbol="positionData.positionSerie.token1.symbol"
                        class="ml-2"
                    />
                </div>
            </div>
            <div class="mt-8">
                <p>Current Price</p>
                <p class="mt-3">
                    {{ positionData.currentPrice }}
                    <span class="text-gray-400 ml-2"
                        >{{ positionData.positionSerie.token1.symbol }} per
                        {{ positionData.positionSerie.token0.symbol }}</span
                    >
                </p>
            </div>
            <div class="mt-8">
                <p>Strategy</p>
                <p>Serie: {{ positionData.positionSerie.idPositionSerie }}</p>
                <p class="text-gray-400 mt-3">
                    {{ positionData.positionSerie.strategyParams }}
                </p>
            </div>
        </Container>
    </div>
</template>

<style lang="scss" scoped></style>
