<script lang="ts" setup>
definePageMeta({
    title: "Connect wallet",
    layout: "main",
});

const { $client } = useNuxtApp();

const isRequestNetwork = ref(false);

const isConnected = ref(false);

watch(isConnected, async (newValue) => {
    if (newValue) useRouter().push("/pools");
});

const connect = async () => {
    if (!$client) return alert("Please install MetaMask!");

    await $client
        .request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    chainId: "0x89",
                    chainName: "Polygon Mainnet",
                    rpcUrls: ["https://polygon-rpc.com/"],
                    nativeCurrency: {
                        name: "MATIC",
                        symbol: "MATIC",
                        decimals: 18,
                    },
                    blockExplorerUrls: ["https://polygonscan.com"],
                },
            ],
        })
        .then(() => {
            isRequestNetwork.value = true;
        })
        .catch((error: any) => {
            console.log(error);
        });

    if (!isRequestNetwork.value) alert("Please connect to Polygon Network!");

    await $client.request({ method: "eth_requestAccounts" }).then(() => {
        isConnected.value = true;
    });
};
</script>

<template>
    <div>
        <Button title="Connect wallet" @click="connect()" />
    </div>
</template>

<style lang="scss" scoped></style>
