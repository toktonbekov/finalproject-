import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { db } from '../Firebase';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from '@firebase/auth';

const signInUp = React.createContext()
export const useAuth = () => useContext(signInUp);

const SignInUpProvider = ({ children }) => {
    const [user, setUser] = useState()
    console.log(user);

    const signUp = (email, password) => {
        createUserWithEmailAndPassword(db, email, password)
    }

    const login = (email, password) => {
        try {
            signInWithEmailAndPassword(db, email, password)

        } catch (e) {
            alert(e.response.data.message)
            console.log(user);
        }
    }

    const logout = () => {

        signOut(db)
    }

    useEffect(() => {
        const loginCheck = onAuthStateChanged(db, user => {
            setUser(user)
        })
        return loginCheck
    }, [])

    return (
        <signInUp.Provider value={{
            user,
            signUp,
            login,
            logout
        }}>
            {children}
        </signInUp.Provider>
    );
};

export default SignInUpProvider;