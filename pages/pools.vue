<script lang="ts" setup>
definePageMeta({
    title: "Pools",
    layout: "main",
});

const { positions, getPositions } = usePositionData();

onMounted(async () => {
    await getPositions();
});
</script>

<template>
    <div class="pt-12 pb-12">
        <HeaderPools />

        <Container
            :title="
                positions.length ? `Your positions (${positions.length})` : ''
            "
            class="mt-8"
        >
            <PositionEmpty v-if="!positions.length" />

            <PositionData
                v-else
                v-for="position in positions"
                :position="position"
            />
        </Container>
    </div>
</template>

<style lang="scss" scoped></style>
