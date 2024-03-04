import { type AxiosResponse } from "axios";
import { Approve } from "../models/Approve";

export const checkApprove = async (
    publicKey: string,
    tokenId: number,
    contractCode: string,
    chainId: string
): Promise<boolean> => {
    const api = useAxiosInstance();

    try {
        const response: AxiosResponse = await api.get("/approve/checkApprove", {
            params: {
                publicKey,
                tokenId,
                contractCode,
                chainId,
            },
        });

        if (response.status !== 200) throw Error;

        return response.data;
    } catch (error) {
        console.log(error);

        throw error;
    }
};

export const createApprove = async (
    publicKey: string,
    tokenId: number,
    contractCode: string,
    chainId: string
): Promise<Approve> => {
    const api = useAxiosInstance();

    try {
        const response: AxiosResponse = await api.post(
            "/approve/createApprove",
            {
                publicKey,
                tokenId,
                contractCode,
                chainId,
            }
        );

        if (response.status !== 200) throw Error;

        return new Approve(response.data);
    } catch (error) {
        console.log(error);

        throw error;
    }
};
