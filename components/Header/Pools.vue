<script lang="ts" setup></script>

<template>
    <div class="flex flex-row justify-between">
        <TextTitle text="Pools" />
        <ButtonSmall
            title="+ New position"
            @click="useRouter().push('/add-liquidity')"
        />
    </div>
</template>

<style lang="scss" scoped></style>
