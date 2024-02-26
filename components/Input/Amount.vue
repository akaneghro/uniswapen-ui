<script lang="ts" setup>
defineProps({
    coinLogo: {
        type: String,
        required: true,
        default: "",
    },
    coinSymbol: {
        type: String,
        required: true,
        default: "",
    },
    amountUsd: {
        type: String,
        required: false,
        default: "0",
    },
    coinBalance: {
        type: String,
        required: true,
    },
});

defineEmits(["maxBalance"]);
</script>

<template>
    <ContainerInside>
        <div class="flex justify-between items-center">
            <slot />
            <TokenTag
                :coinLogo="coinLogo"
                :coinSymbol="coinSymbol"
                class="ml-2"
            />
        </div>
        <div class="flex justify-between items-center text-sm mt-2">
            <p class="text-slate-400">$ {{ amountUsd }}</p>
            <div class="flex">
                <p>Balance:{{ coinBalance }}</p>
                <p
                    class="cursor-pointer text-black bg-slate-50 rounded-2xl px-1 ml-3"
                    @click="$emit('maxBalance', coinBalance)"
                >
                    MAX
                </p>
            </div>
        </div>
    </ContainerInside>
</template>

<style lang="scss" scoped></style>
