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
            stroke="red"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0a9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
        />
    </svg>
</template>

<style lang="scss" scoped></style>
