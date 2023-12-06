import axios, { type AxiosResponse } from "axios";

let instance: any = null;

export const useAxiosInstance = () => {
    if (!instance) {
        instance = axios.create({
            baseURL: useRuntimeConfig().public.API_BASE_URL,
        });

        console.log("axios instance created!");

        instance.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            (error: any) => {
                if (error.response.status === 401) {
                    // Do something here
                } else throw error;
            }
        );
    }
    return instance;
};
