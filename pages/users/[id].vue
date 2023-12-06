<script lang="ts" setup>
const route = useRoute();

const id = ref("");

onMounted(() => {
    id.value = route.params.id.toString();
});
</script>

<template>
    <div></div>
</template>

<style lang="scss" scoped></style>
