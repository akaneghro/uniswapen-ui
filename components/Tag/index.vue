<script lang="ts" setup>
defineProps({
    coinLogo: {
        type: String,
        required: true,
    },
    coinSymbol: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div class="flex flex-row bg-slate-900 rounded-2xl p-2">
        <img :src="coinLogo" class="w-6 h-6 rounded-full" />
        <p class="text-xl ml-3">{{ coinSymbol }}</p>
    </div>
</template>

<style lang="scss" scoped></style>
