import type { JsonRpcSigner } from "ethers";

export const useEthers = () => {
    const { $ethers, $browserProvider } = useNuxtApp();

    const getSignerAccount = async (): Promise<string> => {
        const signer = await $browserProvider.getSigner();

        return signer.address;
    };

    const getTokenBalance = async (
        tokenAddress: string,
        account: string
    ): Promise<string> => {
        const signer = await $browserProvider.getSigner();

        const contract = new $ethers.Contract(
            tokenAddress,
            ["function balanceOf(address) view returns (uint256)"],
            signer
        );

        const balance = await contract.balanceOf(account);

        return $ethers.formatEther(balance);
    };

    return { getSignerAccount, getTokenBalance };
};
