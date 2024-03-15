import { type AxiosResponse } from "axios";
import { Price } from "~/models/Price";

export const getCurrentPrices = async (
    idToken0: number,
    idToken1: number,
    fee: number
): Promise<Price> => {
    const api = useAxiosInstance();

    try {
        const response: AxiosResponse = await api.get(
            "/pool/getCurrentPrices",
            {
                params: {
                    idToken0,
                    idToken1,
                    fee,
                },
            }
        );

        if (response.status !== 200) throw Error;

        return new Price(response.data);
    } catch (error) {
        console.log(error);

        throw error;
    }
};
