import { Navigate, useLocation } from "react-router-dom";
import useAuthFire from "../hooks/useAuthFire";

const HiddenRoutes = ({ children }) => {
    const { loading, user } = useAuthFire();
    const location = useLocation();
    console.log(location, loading,user, "yes")
    if (loading) {
        return <div className=" mt-6 flex justify-center"><span className="loading w-20 text-yellow-400 loading-spinner "></span></div>
    }
    else if (user) {
        return children
    }

    return <Navigate state={location.pathname} to="/login" replace={true}></Navigate>
};

export default HiddenRoutes;