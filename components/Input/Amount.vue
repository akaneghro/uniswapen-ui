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
    amountPrice: {
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
    <InputContainer>
        <div class="flex justify-between items-center">
            <slot />
            <Tag :coinLogo="coinLogo" :coinSymbol="coinSymbol" class="ml-2" />
        </div>
        <div class="flex justify-between items-center text-sm mt-2">
            <p class="text-slate-400">$ {{ amountPrice }}</p>
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
    </InputContainer>
</template>

<style lang="scss" scoped></style>
