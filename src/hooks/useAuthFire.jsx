import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";


const useAuthFire = () => {
    const auth = useContext(AuthContext)
    return auth;
};

export default useAuthFire;