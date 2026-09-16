

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";


import { getAuth } from "firebase/auth";
import app, { db } from "../config/Firebase";
const auth = getAuth(app);

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (!user) {
      setCurrentUser(null);
      setLoading(false);
      return;
    }

    try {
      const userDoc = await getDoc(
        doc(db, "users", user.uid)
      );

      const userData = userDoc.exists()
        ? userDoc.data()
        : {};

      setCurrentUser({
        ...user,
        ...userData,
      });
    } catch (error) {
      console.error("Failed to load user profile:", error);
      setCurrentUser(user);
    } finally {
      setLoading(false);
    }
  });

  return unsubscribe;
}, []);

  const value = {
    currentUser,
    loading,
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;