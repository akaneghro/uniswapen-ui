<script lang="ts" setup>
defineProps({
    text: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <p class="text-4xl">{{ text }}</p>
</template>

<style lang="scss" scoped></style>
