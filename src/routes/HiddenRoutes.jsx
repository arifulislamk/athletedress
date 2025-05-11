import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const HiddenRoutes = ({ children }) => {
    const { loading, user } = useAuth();
    const location = useLocation();
    if (loading) {
        return <div className=" mt-6 flex justify-center"><span className="loading w-20 text-yellow-400 loading-spinner "></span></div>
    }
    else if (user) {
        return children
    }

    return <Navigate state={location.pathname} to="/login" replace={true}></Navigate>
};

export default HiddenRoutes;