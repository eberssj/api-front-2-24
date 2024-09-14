/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";

export const storageAdm = () => {
    const [adm, setAdm] = useState<string | null>(null);

    const setUser = (key: string, adm: string) => {
        localStorage.setItem(key, adm);
        setAdm(adm);
    }

    const getUser = (key: string) => {
        const adm = localStorage.getItem(key);
        setAdm(adm);
        return adm;
    }

    const removeUser = (key: string) => {
        localStorage.removeItem(key);
        setAdm(null);
    }

    return { adm, setUser, getUser, removeUser }
}