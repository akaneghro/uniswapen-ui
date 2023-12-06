<script lang="ts" setup>
defineProps({
    text: String,
    required: true,
});
</script>

<template>
    <p class="text-4xl">{{ text }}</p>
</template>

<style lang="scss" scoped></style>
