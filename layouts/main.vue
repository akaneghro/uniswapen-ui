<script lang="ts" setup>
import { formatAccount } from "~/utils/formatFunctions";

const connectionStore = useConnectionStore();

const networkStore = useNetworkStore();
</script>

<template>
    <div class="h-screen">
        <div class="flex justify-between p-4">
            <p>Uniswapen V1</p>
            <div class="flex justify-center items-center">
                <img
                    v-if="networkStore.currentNetwork"
                    :src="networkStore.currentNetwork?.logo"
                    class="transition ease-in-out hover:scale-125 duration-300 h-6 mr-5"
                />
                <p class="cursor-default text-s">
                    {{ formatAccount(connectionStore.owner) }}
                </p>
            </div>
        </div>
        <div>
            <div class="flex justify-center">
                <div class="w-full max-w-3xl">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
