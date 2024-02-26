import { type AxiosResponse } from "axios";
import { PositionRequest } from "~/models/PositionRequest";
import { PositionData } from "~/models/PositionData";

export const create = async (position: PositionRequest): Promise<boolean> => {
    const api = useAxiosInstance();

    try {
        const response: AxiosResponse = await api.post(
            "/position/createPosition",
            {
                position,
            }
        );

        if (response.status !== 200) throw Error;

        return response.data;
    } catch (error) {
        console.log(error);

        throw error;
    }
};

export const getAll = async (
    publicKey: string,
    chainId: string
): Promise<PositionData[]> => {
    const api = useAxiosInstance();

    try {
        const response: AxiosResponse = await api.get(
            "/position/getPositions",
            {
                params: {
                    publicKey,
                    chainId,
                },
            }
        );

        if (response.status !== 200) throw Error;

        return response.data;
    } catch (error: any) {
        console.log(error);

        if (error.response.status === 503) return [];

        throw error;
    }
};

export const get = async (
    publicKey: string,
    tokenId: number
): Promise<PositionData> => {
    const api = useAxiosInstance();

    try {
        const response: AxiosResponse = await api.get("/position/getPosition", {
            params: { publicKey, tokenId },
        });

        if (response.status !== 200) throw Error;

        return new PositionData(response.data);
    } catch (error) {
        console.log(error);

        throw error;
    }
};

export const close = async (
    publicKey: string,
    tokenId: number
): Promise<boolean> => {
    const api = useAxiosInstance();

    try {
        console.log(publicKey, tokenId);

        const response: AxiosResponse = await api.post(
            "/position/closePosition",
            {
                publicKey,
                tokenId,
            }
        );

        if (response.status !== 200) throw Error;

        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(error);

        throw error;
    }
};
