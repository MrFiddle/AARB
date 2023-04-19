import { createContext, useEffect, useState, useContext } from "react";
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    getIdToken
    
} from 'firebase/auth'

import auth from "../../firebaseAuth";

const userAuthContext = createContext();

export function UserAuthContextProvider ({children}) {

  const [user, setUser] = useState("");

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Get the user's session token and save it to localStorage
        return getIdToken(userCredential.user);
      })
      .then((idToken) => {
        // localStorage.setItem('userToken', idToken);
        sessionStorage.setItem('userToken', idToken);
      })
  }  

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsuscribe();
    }
  }, []);

  return (
    <userAuthContext.Provider value={{user, logIn} }>
      {children}
    </userAuthContext.Provider>
  )
}

export function useUserAuthContext() {
  return useContext(userAuthContext);
}