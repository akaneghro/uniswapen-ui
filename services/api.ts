import { useAxiosInstance } from "../composables/useAxiosInstance";
import type Position from "../types/Position";

export const getPrice = async (token0Symbol: string, token1Symbol: string) => {
    const api = useAxiosInstance();

    try {
        const response = await api.get("/getPrice", {
            params: {
                token0Symbol,
                token1Symbol,
            },
        });

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const createPosition = async (position: Position) => {
    const api = useAxiosInstance();

    try {
        const response = await api.post("/createPosition", {
            position,
        });

        if (response.status !== 200) throw Error;

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getOpenedPositions = async (ownerAddress: string) => {
    const api = useAxiosInstance();

    try {
        const response = await api.get("/getOpenedPositions", {
            params: {
                ownerAddress,
            },
        });

        if (response.status !== 200) throw Error;

        return response.data;
    } catch (error) {
        console.log(error);
    }
};
