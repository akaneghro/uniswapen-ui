<script lang="ts" setup>
defineEmits(["closeModal"]);
</script>

<template>
    <div
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 w-full h-full overflow-auto"
    >
        <Container
            :isModal="true"
            @close="$emit('closeModal')"
            class="max-w-xl"
        >
            <slot></slot>
        </Container>
    </div>
</template>

<style lang="scss" scoped></style>
