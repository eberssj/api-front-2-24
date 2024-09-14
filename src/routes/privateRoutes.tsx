import { Navigate } from "react-router-dom";
import PageNotAllowed from "../pages/PageNotAllowed";
import { useAuth } from "../hook/Auth";

export const PrivateRoutes = ({ children, tiposAllowed }: { children: JSX.Element, tiposAllowed: number[] }) => {
    const { adm, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>
    }

    if (!adm) {
        return <Navigate to="/" replace/>
    }

    if ( adm && tiposAllowed.includes(adm.tipo)) {
        return children;
    }
    else {
        return <PageNotAllowed></PageNotAllowed>
    }
}