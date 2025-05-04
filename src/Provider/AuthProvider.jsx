import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/Firebase.init';
import useAxiosPublic from '../Hook/useAxiosPublic';
import useAxiosSecure from '../Hook/useAxiosSecure';
export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const axiosPublic  = useAxiosPublic();
    // const axiosSecure = useAxiosSecure()
    const [loading,setLoading] = useState(true)
    const [user,setUser]= useState(null)
    const createUser = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const userLogin = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const userLogout = ()=>{
        setLoading(true)
        return signOut(auth)
    }
    const userGoogleLogin = ()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const updateUserProfile = (name,photoURL)=>{
        setLoading(true)
        return updateProfile(auth.currentUser,{
            displayName: name,
            photoURL: photoURL
        })
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            const user = {email: currentUser?.email}
            if(currentUser?.email){
                axiosPublic.post('/jwt',user)
                .then(res=>{
                    console.log(res.data)
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token)
                        setLoading(false)
                    }
                })
            }
            else{
                localStorage.removeItem('access-token')
                setLoading(false)
            }
            
        })
        return ()=>{
            unsubscribe();
        }
    },[ axiosPublic])
    const authInfo ={
        user,
        loading,
        createUser,
        userLogin,
        userLogout,
        userGoogleLogin,
        updateUserProfile

    }
    return (
        
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;