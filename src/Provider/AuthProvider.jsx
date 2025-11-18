import React, { createContext, useEffect, useState, useCallback, useMemo } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "../Firebase/Firebaseconfig";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    
    const userSignUp = useCallback((email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }, []);

    const userLogIn = useCallback((email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }, []);

    const logOut = useCallback(() => {
        return signOut(auth);
    }, []);

    useEffect(() => {
        let isMounted = true;
        
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (isMounted) {
                setUser(currentUser);
                setIsLoading(false);
            }
        }, (error) => {
            if (isMounted) {
                console.error("Auth state change error:", error);
                setIsLoading(false);
            }
        });

        return () => {
            isMounted = false;
            unsubscribe();
        };
    }, []);

    const authData = useMemo(() => ({
        user,
        userSignUp,
        userLogIn,
        logOut,
        isLoading
    }), [user, userSignUp, userLogIn, logOut, isLoading]);

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;