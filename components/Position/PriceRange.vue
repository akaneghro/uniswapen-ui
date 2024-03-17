<script lang="ts" setup>
import { calculatePercentage } from "~/utils/formatFunctions";

defineProps({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    currentPrice: {
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
        <p class="text-sm text-slate-400 mt-4">
            {{
                (
                    calculatePercentage(
                        parseFloat(price),
                        parseFloat(currentPrice)
                    ) - 100
                ).toFixed(2)
            }}% from current
        </p>
    </ContainerInside>
</template>

<style lang="scss" scoped></style>
