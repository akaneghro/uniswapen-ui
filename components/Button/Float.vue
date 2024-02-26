<script lang="ts" setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    isLoading: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <button
        class="text-center text-base py-1 px-3 bg-transparent bg-slate-600 text-white rounded-2xl border border-slate-300"
        :disabled="disabled"
    >
        {{ title }}
    </button>
</template>

<style lang="scss" scoped></style>
