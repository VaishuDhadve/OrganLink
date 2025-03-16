import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { UserData } from "./useAuth";

export interface DonorProfile extends UserData {
  availableOrgans: string[];
  location: string;
  distance?: string;
  lastDonation?: string;
  totalDonations: number;
  status: "available" | "unavailable";
}

export function useDonors() {
  const [donors, setDonors] = useState<DonorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "users"), where("isDonor", "==", true));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const donorsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as DonorProfile[];

      setDonors(donorsData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const updateDonorProfile = async (
    userId: string,
    data: Partial<DonorProfile>
  ) => {
    try {
      await updateDoc(doc(db, "users", userId), data);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const getFilteredDonors = ({
    bloodType,
    organType,
    searchQuery,
  }: {
    bloodType?: string;
    organType?: string;
    searchQuery?: string;
  }) => {
    return donors.filter((donor) => {
      const matchesBloodType = !bloodType || donor.bloodType === bloodType;
      const matchesOrganType =
        !organType || donor.availableOrgans.includes(organType);
      const matchesSearch =
        !searchQuery ||
        donor.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donor.location.toLowerCase().includes(searchQuery.toLowerCase());

      return (
        matchesBloodType &&
        matchesOrganType &&
        matchesSearch &&
        donor.status === "available"
      );
    });
  };

  return {
    donors,
    loading,
    updateDonorProfile,
    getFilteredDonors,
  };
}
