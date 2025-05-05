import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext(null);
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase/firebase.config";
const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const createuser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser =(email, password) => {
        return signInWithEmailAndPassword( auth, email, password)
    }
    const user= 'arif ';
    const providerInfo = {
        user,
        createuser,
        loginUser
    }
    return (
        <AuthContext.Provider value={providerInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;