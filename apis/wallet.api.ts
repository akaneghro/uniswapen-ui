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

export const findWallet = async (publicKey: string): Promise<boolean> => {
    const api = useAxiosInstance();

    try {
        const response: AxiosResponse = await api.get("/wallet/findWallet", {
            params: {
                publicKey,
            },
        });

        if (response.status !== 200) throw Error;

        return response.data as boolean;
    } catch (error: any) {
        console.log(error);

        throw error;
    }
};

export const getWallet = async (publicKey: string): Promise<Wallet> => {
    const api = useAxiosInstance();

    try {
        const response: AxiosResponse = await api.get("/wallet/getWallet", {
            params: {
                publicKey,
            },
        });

        if (response.status !== 200) throw Error;

        return response.data as Wallet;
    } catch (error: any) {
        console.log(error);

        throw error;
    }
};
