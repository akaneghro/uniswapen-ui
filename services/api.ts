import { useAxiosInstance } from "../composables/useAxiosInstance";
import type PositionInfo from "../types/PositionInfo";

export const getEthPrice = async () => {
    const api = useAxiosInstance();

    try {
        const response = await api.get("/ethPrice");

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getTwapPrice = async () => {
    const api = useAxiosInstance();

    try {
        const response = await api.get("/twapPrice");

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const createPosition = async (position: PositionInfo) => {
    const api = useAxiosInstance();

    try {
        const response = await api.post("/createPosition", {
            position,
        });

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getPositionsCount = async (ownerAddress: string) => {
    const api = useAxiosInstance();

    try {
        const response = await api.get("/getPositionCount", {
            params: {
                ownerAddress,
            },
        });

        return response.data;
    } catch (error) {
        console.log(error);
    }
};
