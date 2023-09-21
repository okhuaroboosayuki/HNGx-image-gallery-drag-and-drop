import React, { createContext, useEffect, useState } from "react";
import {
  UserCredential,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firebase";

type SignupProps = {
  auth?: any;
  email: string;
  password: string;
  confirmPassword?: string;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  currentUser: any;
  setCurrentUser?: React.Dispatch<React.SetStateAction<any>>;
  signup: ({ auth, email, password }: SignupProps) => Promise<UserCredential>;
  login: ({ auth, email, password }: SignupProps) => Promise<UserCredential>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState(null as unknown);

  // sign up function
  function signup({ auth, email, password }: SignupProps) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  //login function
  function login({ auth, email, password }: SignupProps) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  //log out function
  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        localStorage.setItem("isUserLoggedIn", "true");
        setPersistence(auth, browserSessionPersistence);
      } else {
        setCurrentUser(null);
        localStorage.removeItem("isUserLoggedIn");
      }
    });
    return unsubscribe;
  }, [currentUser]);

  const AuthValue: AuthContextType = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={AuthValue}>{children}</AuthContext.Provider>
  );
};
