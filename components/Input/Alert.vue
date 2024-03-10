<script lang="ts" setup>
defineProps({
    message: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div
        class="flex flex-row justify-start items-center border border-red-600 bg-red-300 rounded-2xl p-2"
    >
        <IconError />
        <p class="text-red-600 text-sm ml-2">{{ message }}</p>
    </div>
</template>

<style lang="scss" scoped></style>
