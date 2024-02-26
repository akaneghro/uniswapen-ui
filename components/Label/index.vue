<script lang="ts" setup>
defineProps({
    message: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div>
        <p class="text-slate-300 text-xl">{{ message }}</p>
    </div>
</template>

<style lang="scss" scoped></style>
