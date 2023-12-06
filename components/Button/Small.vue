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
        class="text-center text-base py-1 px-3 bg-slate-50 hover:bg-slate-200 text-black rounded-2xl"
    >
        {{ title }}
    </button>
</template>

<style lang="scss" scoped></style>
