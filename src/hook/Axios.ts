/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useAuth } from "./Auth";
import { useState } from "react";

export const useAxios = () => {
    const { getToken } = useAuth();
    const [loading] = useState(true);

    const adm = axios.create({
        baseURL: "http://localhost:3001",
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }});

        const get = (url: string, config?: any) => {
            return adm.get(url, config);
        }
        
        const post = (url: string, body: any, config?:any) => {
            return adm.post(url, body, config);
        }

        const put = (url: string, body: any, config?:any) => {
            return adm.put(url, body, config);
        }

        const remove = (url: string) => {
            return adm.delete(url);
        }

        return { get, post, put, remove, loading }
}