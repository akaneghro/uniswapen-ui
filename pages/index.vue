<script lang="ts" setup>
definePageMeta({
    title: "Connect wallet",
    layout: "main",
});

const connectionStore = useConnectionStore();

const isConnected = ref(false);

watch(isConnected, async (newValue) => {
    if (newValue) {
        connectionStore.isConnectedMetamask = true;
        useRouter().push("/pools");
    }
});

const startConnection = async () => {
    isConnected.value = await connectionStore.connect();
};

onMounted(async () => {
    isConnected.value = await connectionStore.connect();
});
</script>

<template>
    <div>
        <Button title="Connect wallet" @click="startConnection()" />
    </div>
</template>

<style lang="scss" scoped></style>
