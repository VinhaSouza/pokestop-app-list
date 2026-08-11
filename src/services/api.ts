import {create} from "axios";

export const api = create({
    baseURL: process.env.EXPO_PUBLIC_URL_API
});

export const backendApi = create({
    baseURL: process.env.EXPO_PUBLIC_URL_MYAPI
});