import PageNotAllowed from "../pages/PageNotAllowed";
import { useAuth } from "../hook/Auth";

export const PrivateRoutes = ({ children, tiposAllowed }: { children: JSX.Element, tiposAllowed: number[] }) => {
    const { adm, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>
    }

    if (!adm) {
        return <PageNotAllowed />
    }

    if ( adm && tiposAllowed.includes(adm.tipo)) {
        return children;
    }
    else {
        return <PageNotAllowed></PageNotAllowed>
    }
}