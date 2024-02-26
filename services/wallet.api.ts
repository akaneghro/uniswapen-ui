import { type AxiosResponse } from "axios";
import { Wallet } from "../models/Wallet";

export const createWallet = async (wallet: Wallet): Promise<Wallet> => {
    const api = useAxiosInstance();

    try {
        const response: AxiosResponse = await api.post("/wallet/createWallet", {
            wallet,
        });

        if (response.status !== 200) throw Error;

        return response.data as Wallet;
    } catch (error) {
        console.log(error);

        throw error;
    }
};

export const checkSecret = async (secret: string): Promise<boolean> => {
    const api = useAxiosInstance();

    try {
        const response: AxiosResponse = await api.get("/wallet/checkSecret", {
            params: {
                secret,
            },
        });

        if (response.status !== 200) throw Error;

        return response.data as boolean;
    } catch (error) {
        console.log(error);

        throw error;
    }
};

export const getWallet = async (publicKey: string): Promise<Wallet | null> => {
    const api = useAxiosInstance();

    try {
        const response: AxiosResponse = await api.get("/wallet/getWallet", {
            params: {
                publicKey,
            },
        });

        if (response.status !== 200) throw Error;

        return response.data;
    } catch (error: any) {
        console.log(error);

        if (error.response.status === 503 || error.response.status === 404)
            return null;

        throw error;
    }
};

export const checkTokenContractApprove = async (
    publicKey: string,
    tokenId: number,
    contractCode: string,
    chainId: string
): Promise<boolean> => {
    const api = useAxiosInstance();

    try {
        const response: AxiosResponse = await api.get(
            "/wallet/checkTokenContractApprove",
            {
                params: {
                    publicKey,
                    tokenId,
                    contractCode,
                    chainId,
                },
            }
        );

        if (response.status !== 200) throw Error;

        return response.data;
    } catch (error) {
        console.log(error);

        throw error;
    }
};

export const approveTokenContract = async (
    publicKey: string,
    tokenId: number,
    contractCode: string,
    chainId: string
): Promise<boolean> => {
    const api = useAxiosInstance();

    try {
        const response: AxiosResponse = await api.post(
            "/wallet/approveTokenContract",
            {
                publicKey,
                tokenId,
                contractCode,
                chainId,
            }
        );

        if (response.status !== 200) throw Error;

        return true;
    } catch (error) {
        console.log(error);

        throw error;
    }
};
