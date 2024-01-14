export const useEthers = () => {
    const { $ethers, $browserProvider } = useNuxtApp();

    const getSignerAccount = async (): Promise<string> => {
        if (!$browserProvider) return "";

        const signer = await $browserProvider.getSigner();

        return signer.address;
    };

    const getTokenBalance = async (
        account: string,
        tokenAddress: string,
        decimals: number
    ): Promise<string> => {
        if (!$browserProvider) return "";

        const signer = await $browserProvider.getSigner();

        const contract = new $ethers.Contract(
            tokenAddress,
            ["function balanceOf(address) view returns (uint256)"],
            signer
        );

        const balance = await contract.balanceOf(account);

        const formatedBalance = $ethers.formatUnits(
            balance.toString(),
            decimals
        );

        return parseFloat(formatedBalance).toFixed(decimals === 18 ? 4 : 2);
    };

    return { getSignerAccount, getTokenBalance };
};
