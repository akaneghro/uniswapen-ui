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
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill="#ffffff"
            fill-rule="evenodd"
            d="M10 18a8 8 0 1 0 0-16a8 8 0 0 0 0 16m3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79l-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089z"
            clip-rule="evenodd"
        />
    </svg>
</template>

<style lang="scss" scoped></style>
