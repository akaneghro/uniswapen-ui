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
});
</script>

<template>
    <button
        class="text-center text-base py-1 px-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white rounded-2xl border border-white"
        :disabled="disabled"
    >
        {{ title }}
    </button>
</template>

<style lang="scss" scoped></style>
