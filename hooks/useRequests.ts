import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

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

export function useRequests() {
  const [requests, setRequests] = useState<OrganRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "requests"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const requestsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as OrganRequest[];

      setRequests(requestsData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const createRequest = async (
    requestData: Omit<OrganRequest, "id" | "createdAt" | "status">
  ) => {
    try {
      const docRef = await addDoc(collection(db, "requests"), {
        ...requestData,
        status: "pending",
        createdAt: Date.now(),
      });

      return { success: true, id: docRef.id };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const updateRequest = async (
    requestId: string,
    data: Partial<OrganRequest>
  ) => {
    try {
      await updateDoc(doc(db, "requests", requestId), data);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const getUserRequests = (userId: string) => {
    return requests.filter((request) => request.userId === userId);
  };

  const getFilteredRequests = ({
    bloodType,
    organType,
    searchQuery,
  }: {
    bloodType?: string;
    organType?: string;
    searchQuery?: string;
  }) => {
    return requests.filter((request) => {
      const matchesBloodType = !bloodType || request.bloodType === bloodType;
      const matchesOrganType = !organType || request.organType === organType;
      const matchesSearch =
        !searchQuery ||
        request.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.hospitalName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesBloodType && matchesOrganType && matchesSearch;
    });
  };

  return {
    requests,
    loading,
    createRequest,
    updateRequest,
    getUserRequests,
    getFilteredRequests,
  };
}
