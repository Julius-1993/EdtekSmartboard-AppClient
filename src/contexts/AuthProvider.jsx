import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../components/firebase/firebase.config";
import axios from 'axios';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  // Create an Account
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // signup with email account
  const signUPWithGmail = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Login using email and password
  const login = (email, password) =>{
    return signInWithEmailAndPassword(auth, email, password);
  }
  // Logout
  const logOut = () => {
    localStorage.removeItem('access-token')
    return signOut(auth)
  }
  //Update Profile
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name, photoURL: photoURL
    })
  }
  //checked signed-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
       if(currentUser) {
        const userInfo = {email: currentUser.email}
        axios.post('http://localhost:3000/jwt', userInfo)
        .then((response) => {
          // console.log(response.data.token);
          if(response.data.token){
            localStorage.setItem("access-token", response.data.token)
          }
        })
        setLoading(false);
      } else{
        localStorage.removeItem("access-token")
      }
    });


      return () =>{
        return unsubscribe();
      }
  }, [])
  const authInfo = {
    user,
    createUser,
    signUPWithGmail,
    login,
    logOut,
    updateUserProfile,
    loading
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
