/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AdmProps } from "../Type/Adm";
import { storageAdm } from "./Storage";
import { AuthContext } from "./ContextAuth";

export const useAuth = () => {
    const { getUser, setUser} = storageAdm();
    const { adm, setAdm } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    const addAdm = async (adm: AdmProps) => {
        setAdm(adm);
        setUser("adm", JSON.stringify(adm));
    }

    const removeAdm = () => {
        setAdm(null);
        setUser("adm", "");
    }

    const login = (adm: AdmProps) => {
        addAdm(adm);
    }

    const logout = () => {
        removeAdm();
    }

    const getToken = () => {
        return adm?.token;
    }

    const getTipo = () => {
        return adm?.tipo;
    }

    const getSub = () => {
        return adm?.sub;
    }

    useEffect(() => {
        const adm = getUser("adm");
        if(adm) {
            setAdm(JSON.parse(adm));
        }
        setLoading(false);
    }, [])

    return { adm, login, logout, getToken, getTipo, getSub, loading }
}