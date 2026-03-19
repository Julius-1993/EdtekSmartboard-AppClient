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
import axios from "axios";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  // Create an Account
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Signup with Google
  const signUPWithGmail = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Login
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  // Logout
  const logOut = () => {
    localStorage.removeItem("access-token");
    return signOut(auth);
  };

  //Updated: Update user profile (Firebase + backend)
  const updateUserProfile = async (userId, data) => {
    try {
      let photoURL = data.photoURL || user.photoURL || "";

      // Upload new image if selected
      if (data.image?.[0]) {
        const file = data.image[0];
        const storageRef = ref(storage, `profileImages/${userId}_${file.name}`);
        await uploadBytes(storageRef, file);
        photoURL = await getDownloadURL(storageRef);
      }

      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, {
        displayName: data.name,
        photoURL,
      });

      // Send updated info to backend
      const token = localStorage.getItem("access-token");
      const updatedData = {
        name: data.name,
        address: data.address,
        organizationName: data.organizationName,
        photoURL,
      };

      const response = await axios.put(
        `https://edteksmartboard-appserver.onrender.com/users/${userId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  };

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axios.post("https://edteksmartboard-appserver.onrender.com/jwt", userInfo)
          .then((response) => {
            if (response.data.token) {
              localStorage.setItem("access-token", response.data.token);
            }
          });
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    createUser,
    signUPWithGmail,
    login,
    logOut,
    updateUserProfile,
    loading,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;





// import React, { createContext, useEffect, useState } from "react";
// import {
//   GoogleAuthProvider,
//   createUserWithEmailAndPassword,
//   getAuth,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
//   signInWithRedirect,
//   getRedirectResult,
// } from "firebase/auth";
// import app from "../components/firebase/firebase.config";
// import axios from 'axios';

// export const AuthContext = createContext();
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();


// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState('');
//   const [loading, setLoading] = useState(true);

//   // Create an Account
//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   // signup with email account
//   const signUPWithGmail = () => {
//     setLoading(true);
//     return signInWithPopup(auth, googleProvider);
//   };

//   // Login using email and password
//   const login = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   }
//   // Logout
//   const logOut = () => {
//     localStorage.removeItem('access-token')
//     return signOut(auth)
//   }
//   //Update Profile
//   const updateUserProfile = (name, photoURL) => {
//     return updateProfile(auth.currentUser, {
//       displayName: name, photoURL: photoURL
//     })
//   }
//   //checked signed-in user
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
//         const userInfo = { email: currentUser.email }
//         axios.post('https://edteksmartboard-appserver.onrender.com/jwt', userInfo)
//           .then((response) => {
//             // console.log(response.data.token);
//             if (response.data.token) {
//               localStorage.setItem("access-token", response.data.token)
//             }
//           })
//         setLoading(false);
//       } else {
//         setLoading(false);
//         // localStorage.removeItem("access-token")
//       }
//     });


//     return () => {
//       return unsubscribe();
//     }
//   }, [])
//   const authInfo = {
//     user,
//     createUser,
//     signUPWithGmail,
//     login,
//     logOut,
//     updateUserProfile,
//     loading
//   };
//   return (
//     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthProvider;