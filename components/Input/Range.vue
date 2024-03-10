<script lang="ts" setup>
defineProps({
    title: {
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
    showText: {
        type: Boolean,
        required: false,
        default: true,
    },
});
</script>

<template>
    <ContainerInside>
        <div>
            <p class="text-slate-400 text-sm mb-1">{{ title }}</p>

            <p v-if="showText" class="text-white">Select the range type</p>

            <slot />

            <p class="text-slate-400 text-sm mt-1">
                {{ token1Symbol }} per {{ token0Symbol }}
            </p>
        </div>
    </ContainerInside>
</template>

<style lang="scss" scoped></style>
