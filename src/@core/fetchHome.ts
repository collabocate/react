import { apiClient } from "./api-client";
import { HomeData } from "./types/home.types";

export const fetchHome = async (): Promise<HomeData> => {
    const response = await apiClient<HomeData>('/', { method: 'GET' });
    console.log('Home Data:', response);
    return response;
};