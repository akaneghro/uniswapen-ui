<script lang="ts" setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    isSelected: {
        type: Boolean,
        required: false,
        default: false,
    },
});
</script>

<template>
    <div
        class="cursor-pointer border rounded-2xl w-full mr-2 ml-2 p-5"
        :class="isSelected ? 'border-white cu-box-shadow' : 'border-slate-600'"
    >
        <p>{{ title }} %</p>
    </div>
</template>

<style lang="scss" scoped></style>
