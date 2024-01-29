<script lang="ts" setup>
definePageMeta({
    title: "Connect wallet",
    layout: "main",
});

const { $client } = useNuxtApp();

const connectionStore = useConnectionStore();

const isConnected = ref(false);

watch(isConnected, async (newValue) => {
    if (newValue) {
        connectionStore.isConnectedMetamask = true;
        useRouter().push("/pools");
    } else {
        connectionStore.isConnectedMetamask = false;
        useRouter().push("/");
    }
});

const startConnection = async () => {
    isConnected.value = await connectionStore.connect();
};

onMounted(async () => {
    isConnected.value = await connectionStore.connect();

    if (isConnected.value) {
        $client.on("accountsChanged", (accounts: string[]) => {
            if (accounts.length === 0) isConnected.value = false;
            else connectionStore.owner = accounts[0];
        });
    }
});
</script>

<template>
    <div class="h-screen">
        <div class="relative top-1/3">
            <Button title="Connect wallet" @click="startConnection()" />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
