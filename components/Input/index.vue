<script lang="ts" setup>
defineProps({
    coinLogo: {
        type: String,
        required: true,
    },
    coinName: {
        type: String,
        required: true,
    },
    amountPrice: {
        type: String,
        required: false,
        default: "-",
    },
    coinBalance: {
        type: String,
        required: true,
    },
    modelValue: {
        type: String,
        required: false,
        default: "",
    },
});

defineEmits(["update:modelValue"]);
</script>

<template>
    <div class="bg-slate-800 rounded-2xl border border-slate-600 p-3">
        <div class="flex justify-between items-center">
            <input
                class="basis-2/3 w-10 outline-none caret-white bg-slate-800 text-white text-2xl"
                imputmode="decimal"
                autocomplete="off"
                autocorrect="off"
                type="text"
                minlength="1"
                maxlength="79"
                spellcheck="false"
                placeholder="0.0"
                :value="modelValue"
                @input="
                    $emit(
                        'update:modelValue',
                        ($event.target as HTMLInputElement).value
                    )
                "
            />
            <Tag :coinLogo="coinLogo" :coinName="coinName" class="ml-2" />
        </div>
        <div class="flex justify-between items-center text-sm mt-2">
            <p class="text-slate-400">{{ amountPrice }}</p>
            <div class="flex">
                <p>Balance:{{ coinBalance }}</p>
                <p class="text-black bg-slate-50 rounded-2xl px-1 ml-3">MAX</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
