import { useAxiosInstance } from "../composables/useAxiosInstance";

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

export const createPosition = async (amount0: string, amount1: string) => {
    const api = useAxiosInstance();

    try {
        const response = await api.post("/createPosition", {
            amount0,
            amount1,
        });

        return response.data;
    } catch (error) {
        console.log(error);
    }
};
