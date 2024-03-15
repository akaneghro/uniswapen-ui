import { type AxiosResponse } from "axios";
import { Network } from "../models/Network";

export const getNetworks = async (): Promise<Network[]> => {
    const api = useAxiosInstance();

    try {
        const response: AxiosResponse = await api.get("/network/getNetworks");

        if (response.status !== 200) throw Error;

        return response.data as Network[];
    } catch (error) {
        throw error;
    }
};
