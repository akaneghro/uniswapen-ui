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
        class="text-center text-base py-1 px-3 bg-slate-50 hover:bg-slate-200 disabled:opacity-50 text-black rounded-2xl"
        :disabled="disabled"
    >
        {{ title }}
    </button>
</template>

<style lang="scss" scoped></style>
