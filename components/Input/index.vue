<script lang="ts" setup>
defineProps({
    modelValue: {
        type: String,
        required: false,
        default: "",
    },
    type: {
        type: String,
        required: false,
        default: "text",
    },
    maxlength: {
        type: String,
        required: false,
        default: "79",
    },
    placeholder: {
        type: String,
        required: false,
        default: "-",
    },
});

defineEmits(["update:modelValue"]);
</script>

<template>
    <input
        class="basis-2/3 outline-none caret-white bg-slate-800 text-white text-2xl w-full"
        autocomplete="off"
        autocorrect="off"
        :type="type"
        minlength="1"
        :maxlength="maxlength"
        spellcheck="false"
        :placeholder="placeholder"
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
