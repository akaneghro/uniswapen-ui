<script lang="ts" setup>
defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        default: "",
    },
    value: {
        type: String,
        required: false,
        default: "",
    },
    label: {
        type: String,
        required: false,
        default: "",
    },
});

defineEmits(["update:modelValue"]);
</script>

<template>
    <div class="flex flex-row items-center">
        <input
            type="radio"
            :id="`idRadio${label}`"
            :name="name"
            :value="value"
            :checked="modelValue === value"
            @change="$emit('update:modelValue', value)"
            class="appearance-none h-3 w-3 border border-slate-400 rounded-full checked:bg-white checked:border-transparent"
        />
        <label :for="`idRadio${label}`" class="text-sm text-white ml-2">{{
            label
        }}</label>
    </div>
</template>

<style lang="scss" scoped></style>
