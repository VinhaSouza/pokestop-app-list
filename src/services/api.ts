import {create} from "axios";
import dotenv from "dotenv";

dotenv.config();

export const api = create({
    baseURL: process.env.DB_BASEURL_API
});

export const backendApi = create({
    baseURL: process.env.DB_BASEURL_MYAPI
});