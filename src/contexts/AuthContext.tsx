import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();

  // Handle initial Firebase persistence setup
  useEffect(() => {
    const setupAuth = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
        console.log("Firebase persistence set up");
      } catch (error) {
        console.error("Error setting up auth:", error);
      } finally {
        setInitialized(true);
      }
    };

    setupAuth();
  }, []);

  // Handle auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log(
        "Auth state changed:",
        currentUser ? "logged in" : "logged out"
      );

      try {
        if (currentUser) {
          const token = await currentUser.getIdToken();
          // Set cookie with token (expires in 7 days)
          Cookies.set("firebaseToken", token, { expires: 7 });
        } else {
          // Remove token cookie
          Cookies.remove("firebaseToken");
        }

        setUser(currentUser);
      } catch (error) {
        console.error("Error in auth state change:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result.user) {
        const token = await result.user.getIdToken();
        Cookies.set("firebaseToken", token, { expires: 7 });
        if (router.pathname !== "/admin") {
          router.push("/admin");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      Cookies.remove("firebaseToken");
      if (router.pathname !== "/admin/login") {
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    initialized,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
