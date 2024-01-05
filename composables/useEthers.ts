export const useEthers = () => {
    const { $ethers } = useNuxtApp();

    const getSigner = async () => {
        const signer = await $ethers.getSigner();

        return signer.address;
    };

    return {};
};
