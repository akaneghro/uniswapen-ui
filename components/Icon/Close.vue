<script lang="ts" setup>
defineProps({
    size: {
        type: Number,
        default: 24,
    },
});
</script>

<template>
    <svg
        :width="size"
        :height="size"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill="none"
            stroke="#ffffff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
</template>

<style lang="scss" scoped></style>
