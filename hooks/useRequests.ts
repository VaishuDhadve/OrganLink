import { useState, useEffect, useCallback, useMemo } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { useAuth } from "./useAuth";

export interface OrganRequest {
  id: string;
  userId: string;
  fullName: string;
  age: number;
  contactNumber: string;
  hospitalName: string;
  hospitalAddress: string;
  organType: string;
  bloodType: string;
  urgencyLevel: "low" | "medium" | "high";
  isUrgent: boolean;
  additionalInfo?: string;
  status: "pending" | "matched" | "completed";
  createdAt: number;
}

interface RequestFilters {
  bloodType?: string;
  organType?: string;
  searchQuery?: string;
}

export function useRequests() {
const {userData} = useAuth()

  const [requests, setRequests] = useState<OrganRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "requests"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as OrganRequest[];
        setRequests(data);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const createRequest = useCallback(
    async (
      requestData: Omit<OrganRequest, "id" | "createdAt" | "status" | "userId">
    ) => {
      try {
        const docRef = await addDoc(collection(db, "requests"), {
          ...requestData,
          userId: userData?.email,
          status: "pending",
          createdAt: Date.now(),
        });
        return { success: true, id: docRef.id };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
    []
  );

  const updateRequest = useCallback(
    async (
      requestId: string,
      data: Partial<OrganRequest>
    ): Promise<{ success: boolean; error?: string }> => {
      try {
        await updateDoc(doc(db, "requests", requestId), data);
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
    []
  );

  const getUserRequests = useCallback(
    (userId: string): OrganRequest[] =>
      requests.filter((r) => r.userId === userId),
    [requests]
  );

  const getFilteredRequests = useCallback(
    ({ bloodType, organType, searchQuery }: RequestFilters): OrganRequest[] => {
      return requests.filter((request) => {
        const matchesBlood = !bloodType || request.bloodType === bloodType;
        const matchesOrgan = !organType || request.organType === organType;
        const matchesSearch =
          !searchQuery ||
          request.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.hospitalName
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return matchesBlood && matchesOrgan && matchesSearch;
      });
    },
    [requests]
  );

  const memoizedRequests = useMemo(() => requests, [requests]);

  return {
    requests: memoizedRequests,
    loading,
    error,
    createRequest,
    updateRequest,
    getUserRequests,
    getFilteredRequests,
  };
}
