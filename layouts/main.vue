<script lang="ts" setup></script>

<template>
    <div class="w-screen h-screen">
        <p class="text-right pt-2 pr-5">Uniswapen V1</p>
        <div class="relative top-1/3 -translate-y-1/3">
            <div class="flex justify-center">
                <div class="w-full max-w-xl">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
