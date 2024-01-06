export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === "/") return;

    const connectionStore = useConnectionStore();

    if (!connectionStore.isConnectedMetamask) {
        return useRouter().push("/");
    }
});
