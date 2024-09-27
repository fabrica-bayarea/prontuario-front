import axios from "axios";
import {parseCookies} from "nookies";

const cookies = parseCookies();

export const api = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        Authorization: `Bearer ${cookies['access_token']}`
    }
});