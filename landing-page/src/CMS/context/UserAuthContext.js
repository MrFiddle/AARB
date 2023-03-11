import { createContext, useEffect, useState, useContext } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'

import auth from "../../firebaseAuth";

const userAuthContext = createContext();

export function UserAuthContextProvider ({children}) {

  const [user, setUser] = useState("");

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
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