import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const provider = new GoogleAuthProvider();
    //signin with google
    const signInByGoogle = () => {
        // setLoading(true)
        return signInWithPopup(auth, provider)
    }

    //signin with email and password 
    const userSignIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithEmailPass = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //update user data after signup
    const updateUserData = (name) => {
        setLoading(true)
        return updateProfile(auth.currentUser, { displayName: name, })
    }

    //signout user
    const logoutUser = () => {
        setLoading(true)
        return signOut(auth);
    }
    //get current user data
    useEffect(() => {
        const un = onAuthStateChanged(auth, (cUser) => {
            setLoading(false)
            setUser(cUser);
        });
        return () => un();
    }, [])

    const authInfo = {
        signInByGoogle,
        userSignIn,
        signInWithEmailPass,
        updateUserData,
        setLoading,
        logoutUser,
        loading,
        user
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;