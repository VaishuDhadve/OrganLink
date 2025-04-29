import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import { AlertCircle, Info } from "lucide-react-native";
import { SelectOptions } from "@/components/SelectOptions";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { InputField } from "@/components/InputField";
import { useAuth } from "@/hooks/useAuth";
import { useDonors } from "@/hooks/useDonars";

export interface DonorFormData {
  fullName: string;
  bloodType: string;
  availableOrgans: string[];
  location: string;
  lastCheckup: string;
  status: "available" | "unavailable";
}

export default function UpdateDonorScreen() {
  const { userData, updateUserData } = useAuth();
  const { updateDonorProfile } = useDonors();

  const [formData, setFormData] = useState<DonorFormData>({
    fullName: userData?.fullName || "",
    bloodType: userData?.bloodType || "",
    availableOrgans: userData?.organs || [],
    location: "",
    lastCheckup: "",
    status: "available",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const organTypes = [
    "Kidney",
    "Liver",
    "Heart",
    "Lung",
    "Cornea",
    "Bone Marrow",
  ];
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleChange = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleOrgan = (organ: string) => {
    setFormData((prev) => ({
      ...prev,
      availableOrgans: prev.availableOrgans.includes(organ)
        ? prev.availableOrgans.filter((o) => o !== organ)
        : [...prev.availableOrgans, organ],
    }));
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.bloodType) newErrors.bloodType = "Blood type is required";
    if (formData.availableOrgans.length === 0)
      newErrors.availableOrgans = "Please select at least one organ";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.lastCheckup)
      newErrors.lastCheckup = "Last checkup date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        // Update user data with donor information
        const userUpdateResult = await updateUserData({
          ...formData,
          isDonor: true,
        });

        if (!userUpdateResult.success) {
          throw new Error(userUpdateResult.error);
        }

        // Update donor profile
        const donorUpdateResult = await updateDonorProfile(userData!.id, {
          ...formData,
          totalDonations: 0, // Initialize for new donors
        });

        if (!donorUpdateResult.success) {
          throw new Error(donorUpdateResult.error);
        }

        Alert.alert(
          "Profile Updated",
          "Your donor profile has been successfully updated.",
          [{ text: "OK" }]
        );
      } catch (error: any) {
        Alert.alert(
          "Update Failed",
          error.message || "Something went wrong. Please try again."
        );
      }
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#f5f5f5]">
      {/* Alert Banner */}
      <View className="bg-blue-50 p-4 flex-row items-center mb-4">
        <AlertCircle size={24} color="#E8315B" />
        <Text className="font-normal text-sm text-gray-800 ml-2 flex-1">
          Update your donor profile to help save lives.
        </Text>
      </View>

      {/* Form Body */}
      <View className="px-5 pb-8">
        <Text className="font-semibold text-lg text-[#E8315B] mb-4 mt-2">
          Personal Information
        </Text>

        <InputField
          label="Full Name"
          value={formData.fullName}
          onChangeText={(val) => handleChange("fullName", val)}
          placeholder="Enter your full name"
          error={errors.fullName}
        />

        <Text className="font-medium text-sm text-gray-800 mb-2 mt-5">
          Blood Type
        </Text>
        <SelectOptions
          options={bloodTypes}
          selected={formData.bloodType}
          onSelect={(val) => handleChange("bloodType", val)}
        />
        {errors.bloodType && (
          <Text className="text-red-500 text-xs mt-1">{errors.bloodType}</Text>
        )}

        <Text className="font-medium text-sm text-gray-800 mb-2 mt-5">
          Available Organs for Donation
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {organTypes.map((organ) => (
            <TouchableOpacity
              key={organ}
              onPress={() => toggleOrgan(organ)}
              className={`px-4 py-2 rounded-full border ${
                formData.availableOrgans.includes(organ)
                  ? "bg-[#E8315B] border-[#E8315B]"
                  : "bg-white border-gray-300"
              }`}
            >
              <Text
                className={`text-sm ${
                  formData.availableOrgans.includes(organ)
                    ? "text-white"
                    : "text-gray-700"
                }`}
              >
                {organ}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.availableOrgans && (
          <Text className="text-red-500 text-xs mt-1">
            {errors.availableOrgans}
          </Text>
        )}

        <InputField
          label="Location"
          value={formData.location}
          onChangeText={(val) => handleChange("location", val)}
          placeholder="Enter your location"
          error={errors.location}
        />

        <InputField
          label="Last Medical Checkup"
          value={formData.lastCheckup}
          onChangeText={(val) => handleChange("lastCheckup", val)}
          placeholder="YYYY-MM-DD"
          error={errors.lastCheckup}
        />

        <ToggleSwitch
          label="Available for Donation"
          value={formData.status === "available"}
          onToggle={(val) =>
            handleChange("status", val ? "available" : "unavailable")
          }
          description="Toggle this if you are currently available for organ donation"
        />

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-[#E8315B] rounded-lg py-4 mt-6"
        >
          <Text className="font-semibold text-base text-white text-center">
            Update Donor Profile
          </Text>
        </TouchableOpacity>

        {/* Footer Note */}
        <View className="flex-row mt-5 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <Info size={16} color="#666" />
          <Text className="text-xs text-gray-500 ml-2 flex-1">
            By updating your donor profile, you agree to be contacted for
            potential organ donation matches.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
