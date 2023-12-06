<script lang="ts" setup>
definePageMeta({
    title: "Pools",
    layout: "main",
});
</script>

<template>
    <div>
        <HeaderPools />
        <Container class="mt-8">
            <IconBox :size="40" class="m-auto mt-4" />
            <p class="text-center pt-4">
                Your liquidity positions will appear here.
            </p>
        </Container>
    </div>
</template>

<style lang="scss" scoped></style>
