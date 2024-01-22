<script lang="ts" setup>
defineProps({
    showAlert: {
        type: Boolean,
        required: false,
        default: false,
    },
});
</script>

<template>
    <div
        class="bg-slate-800 rounded-2xl border border-slate-600 p-3"
        :class="!showAlert ? 'border-slate-600' : 'border-red-500'"
    >
        <slot />
    </div>
</template>

<style lang="scss" scoped></style>
