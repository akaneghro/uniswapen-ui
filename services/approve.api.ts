import { type AxiosResponse } from "axios";

export const checkApprove = async (
    publicKey: string,
    idToken: number,
    contractCode: string,
    chainId: number
): Promise<boolean> => {
    const api = useAxiosInstance();

    try {
        const response: AxiosResponse = await api.get("/approve/checkApprove", {
            params: {
                publicKey,
                idToken,
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
    idToken: number,
    contractCode: string,
    chainId: number
): Promise<string> => {
    const api = useAxiosInstance();

    try {
        const response: AxiosResponse = await api.post(
            "/approve/createApprove",
            {
                publicKey,
                idToken,
                contractCode,
                chainId,
            }
        );

        if (response.status !== 200) throw Error;

        return response.data;
    } catch (error) {
        console.log(error);

        throw error;
    }
};
