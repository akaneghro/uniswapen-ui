<script lang="ts" setup>
import type { PositionData } from "~/models/PositionData";

const props = defineProps({
    position: {
        type: Object as PropType<PositionData>,
        required: true,
    },
    showCircle: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <div>
        <div v-if="position.isClosed">
            <div
                v-if="showCircle"
                class="rounded-full h-4 w-4 bg-gray-500"
            ></div>
            <p v-else class="text-gray-500">Closed</p>
        </div>

        <div
            v-else-if="
                props.position.currentPrice >= props.position.lowerPrice &&
                props.position.currentPrice <= props.position.upperPrice
            "
        >
            <div
                v-if="showCircle"
                class="rounded-full h-4 w-4 bg-green-400"
            ></div>
            <p v-else class="text-green-400">In range</p>
        </div>
        <div v-else>
            <div
                v-if="showCircle"
                class="rounded-full h-4 w-4 bg-red-500"
            ></div>
            <p class="text-red-500">Out of range</p>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
