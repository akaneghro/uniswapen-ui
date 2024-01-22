<script lang="ts" setup>
defineProps({
    modelValue: {
        type: String,
        required: false,
        default: "",
    },
});

defineEmits(["update:modelValue"]);
</script>

<template>
    <input
        class="basis-2/3 outline-none caret-white bg-slate-800 text-white text-2xl w-full"
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
</template>

<style lang="scss" scoped></style>
