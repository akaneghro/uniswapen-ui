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
        class="text-center text-xl py-4 px-6 bg-slate-50 hover:bg-slate-200 disabled:opacity-50 text-black rounded-2xl w-full"
        :disabled="disabled || isLoading"
    >
        <p v-if="!isLoading">{{ title }}</p>
        <Loader v-else color="gray" />
    </button>
</template>

<style lang="scss" scoped></style>
