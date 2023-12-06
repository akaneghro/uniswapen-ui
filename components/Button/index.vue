<script lang="ts" setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <button
        class="text-center text-xl py-4 px-6 bg-slate-50 hover:bg-slate-200 text-black rounded-2xl w-full"
    >
        {{ title }}
    </button>
</template>

<style lang="scss" scoped></style>
