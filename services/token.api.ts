import { type AxiosResponse } from "axios";
import { Token } from "../models/Token";

export const getTokens = async (chainId: string): Promise<Token[]> => {
    const api = useAxiosInstance();

    try {
        const response: AxiosResponse = await api.get("/token/", {
            params: {
                chainId,
            },
        });

        if (response.status !== 200) throw Error;

        return response.data as Token[];
    } catch (error) {
        console.log(error);

        throw error;
    }
};
