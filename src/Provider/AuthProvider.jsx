import React, { createContext, use, useEffect, useState } from "react";
import { useContext } from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "../Firebase/Firebaseconfig";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    const userLogIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };
    const logOut = () => {
        return signOut(auth);
    };
    const authData = {
        user,
        userLogIn,
        logOut,
    };
    return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
