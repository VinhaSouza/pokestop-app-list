import {create} from "axios";

export const api = create({
    baseURL: "https://pokeapi.co/api/v2"
});

export const backendApi = create({
    baseURL: "http://10.75.70.100:3000"
});