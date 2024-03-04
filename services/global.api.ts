import { type AxiosResponse } from "axios";

export const checkSecret = async (secret: string): Promise<boolean> => {
    const api = useAxiosInstance();

    try {
        const response: AxiosResponse = await api.get("/global/checkSecret", {
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
