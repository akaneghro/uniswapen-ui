<script lang="ts" setup>
definePageMeta({
    title: "Connect wallet",
    layout: "main",
});

const { $client } = useNuxtApp();

const connectionStore = useConnectionStore();

const { checkWalletExists } = useWalletManager();

const isConnected = ref(false);

const startConnection = async () => {
    isConnected.value = await connectionStore.connect();
};

const checkWallet = async () => {
    const walletExists = await checkWalletExists();

    if (!walletExists) useRouter().push("/wallet");
    else useRouter().push("/positions");
};

watch(isConnected, async (newValue) => {
    if (newValue) {
        connectionStore.isConnectedMetamask = true;
        await checkWallet();
    } else {
        connectionStore.isConnectedMetamask = false;
        useRouter().push("/");
    }
});

onMounted(async () => {
    isConnected.value = await connectionStore.connect();

    if (isConnected.value) {
        $client.on("accountsChanged", async (accounts: string[]) => {
            if (accounts.length === 0) isConnected.value = false;
            else {
                connectionStore.owner = accounts[0];
                await checkWallet();
            }
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
