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
        <Container :back="true">
            <div class="flex flex-row justify-between">
                <div class="flex flex-row items-baseline">
                    <p class="text-xl">
                        <a
                            :href="`https://polygonscan.com/token/${positionData.token0.contract}`"
                            target="_blank"
                            >{{ positionData.token0.symbol }}</a
                        >
                        /
                        <a
                            :href="`https://polygonscan.com/token/${positionData.token1.contract}`"
                            target="_blank"
                            >{{ positionData.token1.symbol }}</a
                        >
                    </p>

                    <p class="text-lg text-gray-400 ml-4">
                        {{ positionData.feeTier.feePercentage }}
                    </p>

                    <PositionStatus :position="positionData" class="ml-6" />
                </div>
                <div>
                    <ButtonSmall title="Add liquidity" />
                    <ButtonSmall
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
                        :token0Symbol="positionData.token0.symbol"
                        :token1Symbol="positionData.token1.symbol"
                        class="mr-2"
                    />

                    <PositionPriceRange
                        title="Max price"
                        :price="positionData.upperPrice"
                        :token0Symbol="positionData.token0.symbol"
                        :token1Symbol="positionData.token1.symbol"
                        class="ml-2"
                    />
                </div>
            </div>
        </Container>
    </div>
</template>

<style lang="scss" scoped></style>
