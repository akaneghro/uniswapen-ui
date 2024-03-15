import axios, { type AxiosResponse } from "axios";

let instance: any = null;

export const useAxiosInstance = () => {
    if (!instance) {
        instance = axios.create({
            baseURL: useRuntimeConfig().public.API_BASE_URL,
        });

        instance.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            (error: any) => {
                if (!error.response) {
                    console.log("Network error");
                    return Promise.reject(error);
                } else if (error.response.status === 401) {
                    console.log("Unauthorized");
                } else throw error;
            }
        );
    }
    return instance;
};
