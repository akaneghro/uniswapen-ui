<script lang="ts" setup>
import { formatDate } from "~/utils/formatFunctions";
import { PositionData } from "~/models/PositionData";

defineProps({
    positionData: {
        type: Object as PropType<PositionData>,
        required: true,
    },
});

const isHovered = ref(false);
</script>

<template>
    <div
        class="group relative border-t py-4"
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
    >
        <div class="flex flex-row justify-between">
            <div class="flex flex-row">
                <p>
                    ({{ positionData.positionSerie.idPositionSerie }})
                    {{ positionData.positionSerie.token0.symbol }}
                    /
                    {{ positionData.positionSerie.token1.symbol }}
                </p>

                <p class="text-gray-400 ml-2">
                    ({{ positionData.positionSerie.feeTier.feePercentage }}%)
                </p>
            </div>

            <PositionStatus :position="positionData" />
        </div>

        <div class="flex flex-col mt-3">
            <p>
                <span class="text-gray-400">Min:</span>
                {{ positionData.lowerPrice }}
            </p>

            <p>
                <span class="text-gray-400">Max:</span>
                {{ positionData.upperPrice }}
            </p>
        </div>

        <div class="mt-3">
            <p class="text-xs text-gray-400">
                Created: {{ formatDate(positionData.creationDate) }}
            </p>
        </div>

        <IconForward
            v-if="isHovered"
            class="absolute right-2 top-1/2 opacity-0 group-hover:opacity-100"
        />
    </div>
</template>

<style lang="scss" scoped></style>
