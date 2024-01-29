<script lang="ts" setup>
import { formatAccount } from "~/utils/formatFunctions";

const connectionStore = useConnectionStore();
</script>

<template>
    <div class="h-screen">
        <div class="flex justify-between p-4">
            <p>Uniswapen V1</p>
            <div class="flex justify-center items-center">
                <img
                    src="/images/polygon.svg"
                    class="cursor-pointer transition ease-in-out hover:scale-125 duration-300 h-6 mr-5"
                    :class="
                        connectionStore.isConnectedPolygon
                            ? 'opacity-100'
                            : 'opacity-25'
                    "
                    @click="connectionStore.connect()"
                />
                <p class="cursor-default text-s">
                    {{ formatAccount(connectionStore.owner) }}
                </p>
            </div>
        </div>
        <div>
            <div class="flex justify-center">
                <div class="w-full max-w-xl">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
