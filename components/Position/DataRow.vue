<script lang="ts" setup>
import { formatDate } from "~/utils/formatFunctions";
import { PositionData } from "~/models/PositionData";

defineProps({
    positionData: {
        type: Object as PropType<PositionData>,
        required: true,
    },
});
</script>

<template>
    <div class="border-t py-4">
        <div class="flex flex-row justify-between">
            <div class="flex flex-row">
                <p>
                    <a
                        :href="`https://polygonscan.com/token/${positionData.token0.address}`"
                        target="_blank"
                        >{{ positionData.token0.symbol }}</a
                    >
                    /
                    <a
                        :href="`https://polygonscan.com/token/${positionData.token1.address}`"
                        target="_blank"
                        >{{ positionData.token1.symbol }}</a
                    >
                </p>

                <p class="text-gray-400 ml-2">
                    ({{ positionData.feeTier.feePercentage }}%)
                </p>

                <p class="text-gray-400 ml-2">
                    - {{ formatDate(positionData.creationDate) }}
                </p>
            </div>

            <PositionStatus :position="positionData" />
        </div>

        <div class="flex flex-row justify-between mt-3">
            <p class="underline">
                <a
                    :href="`https://app.uniswap.org/pools/${positionData.tokenId}`"
                    target="_blank"
                    >Ver en Uniswap</a
                >
            </p>

            <IconForward
                @click="useRouter().push(`/positions/${positionData.tokenId}`)"
                class="cursor-pointer"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
