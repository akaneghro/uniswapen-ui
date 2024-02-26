<script lang="ts" setup>
definePageMeta({
    title: "Positions",
    layout: "main",
});

const { positions, getOwnerPositions } = usePositionList();

onMounted(async () => {
    await getOwnerPositions();
});
</script>

<template>
    <div class="pt-12 pb-12">
        <HeaderPositions />

        <Container
            :title="
                positions.length ? `Your positions (${positions.length})` : ''
            "
            class="mt-8"
        >
            <PositionEmpty v-if="!positions.length" />

            <PositionDataRow
                v-else
                v-for="position in positions"
                :positionData="position"
            />
        </Container>
    </div>
</template>

<style lang="scss" scoped></style>
