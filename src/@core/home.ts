import { apiClient } from "./api-client";
import { ApiHomeResponse } from "./types/home.types";

export const getApiHome = async (): Promise<ApiHomeResponse> => {
    const response = await apiClient<ApiHomeResponse>('/', { method: 'GET' });
    console.log('Home Data:', response);
    return response;
};