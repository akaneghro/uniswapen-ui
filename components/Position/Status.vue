<script lang="ts" setup>
import type { PositionData } from "~/models/PositionData";

const props = defineProps({
    position: {
        type: Object as PropType<PositionData>,
        required: true,
    },
});
</script>

<template>
    <div>
        <div v-if="position.isClosed" class="text-gray-500">Closed</div>

        <div
            v-else-if="
                props.position.currentPrice >= props.position.lowerPrice &&
                props.position.currentPrice <= props.position.upperPrice
            "
            class="text-green-400"
        >
            In range
        </div>
        <div v-else class="text-red-500">Out of range</div>
    </div>
</template>

<style lang="scss" scoped></style>
