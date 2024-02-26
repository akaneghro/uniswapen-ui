<script lang="ts" setup>
import type { PositionData } from "~/models/PositionData";

defineProps({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    token0Symbol: {
        type: String,
        required: true,
    },
    token1Symbol: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <ContainerInside class="text-center w-full">
        <p class="text-slate-300">{{ title }}</p>
        <p class="mt-2">{{ price }}</p>
        <p class="text-slate-300 mt-2">
            {{ token1Symbol }} per
            {{ token0Symbol }}
        </p>
    </ContainerInside>
</template>

<style lang="scss" scoped></style>
