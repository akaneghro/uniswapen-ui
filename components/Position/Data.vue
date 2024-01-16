<script lang="ts" setup>
import type PositionData from "~/types/PositionData";
import { formatFeeTier } from "~/utils/formatFunctions";

defineProps({
    position: {
        type: Object as PropType<PositionData>,
        required: true,
    },
});
</script>

<template>
    <div class="border-t py-4">
        <div class="flex flex-row">
            <p>
                <a
                    :href="`https://polygonscan.com/token/${position.token0.id}`"
                    target="_blank"
                    >{{ position.token0.symbol }}</a
                >
                /
                <a
                    :href="`https://polygonscan.com/token/${position.token1.id}`"
                    target="_blank"
                    >{{ position.token1.symbol }}</a
                >
            </p>

            <p class="text-gray-400 ml-2">
                <a
                    :href="`https://polygonscan.com/address/${position.pool.id}`"
                    target="_blank"
                    >({{ formatFeeTier(parseInt(position.pool.feeTier)) }})</a
                >
            </p>
        </div>

        <p class="underline mt-2">
            <a
                :href="`https://app.uniswap.org/pools/${position.id}`"
                target="_blank"
                >Ver en Uniswap</a
            >
        </p>
    </div>
</template>

<style lang="scss" scoped></style>
