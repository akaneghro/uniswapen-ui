<script lang="ts" setup>
defineProps({
    showText: {
        type: Boolean,
        required: true,
    },
});
</script>

<template>
    <div
        class="cursor-pointer flex flex-row justify-start items-center border border-slate-600 rounded-2xl w-full p-2"
    >
        <p v-if="showText" class="text-xl ml-3 p-2">Select a token</p>
        <slot v-else />
    </div>
</template>

<style lang="scss" scoped></style>
