import { useState, useEffect } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export interface UserData {
  id: string;
  email: string;
  fullName: string;
  bloodType?: string;
  organs?: string[];
  lastCheckup?: string;
  isDonor?: boolean;
  createdAt: number;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "users", result.user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data() as UserData);
      }
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const register = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userData: UserData = {
        id: result.user.uid,
        email,
        fullName,
        isDonor: false,
        createdAt: Date.now(),
      };

      await setDoc(doc(db, "users", result.user.uid), userData);
      setUserData(userData);

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserData(null);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const updateUserData = async (data: Partial<UserData>) => {
    if (!user) return { success: false, error: "No user logged in" };

    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, data, { merge: true });

      const updatedDoc = await getDoc(userRef);
      setUserData(updatedDoc.data() as UserData);

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  return {
    user,
    userData,
    loading,
    login,
    register,
    logout,
    updateUserData,
  };
}
