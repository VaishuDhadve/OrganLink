import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import { AlertCircle, Info } from "lucide-react-native";
import { SelectOptions } from "@/components/SelectOptions";
import { UrgencySelector } from "@/components/UrgencySelector";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { InputField } from "@/components/InputField";
import { useRequests } from "@/hooks/useRequests";


export interface OrganRequestFormData {
  fullName: string;
  age: string;
  contactNumber: string;
  hospitalName: string;
  hospitalAddress: string;
  organType: string;
  bloodType: string;
  urgencyLevel: "low" | "medium" | "high";
  isUrgent: boolean;
  additionalInfo?: string;
}


export default function RequestScreen() {
  const [formData, setFormData] = useState<OrganRequestFormData>({
    fullName: "",
    age: "",
    contactNumber: "",
    hospitalName: "",
    hospitalAddress: "",
    organType: "",
    bloodType: "",
    urgencyLevel: "medium" as "low" | "medium" | "high",
    isUrgent: false,
    additionalInfo: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
   const  {createRequest} = useRequests()

  const organTypes = ["Kidney", "Liver", "Heart", "Lung", "Cornea", "Bone Marrow"];
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleChange = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.age) newErrors.age = "Age is required";
    else if (isNaN(Number(formData.age))) newErrors.age = "Age must be a number";
    if (!formData.contactNumber) newErrors.contactNumber = "Contact number is required";
    if (!formData.hospitalName) newErrors.hospitalName = "Hospital name is required";
    if (!formData.hospitalAddress) newErrors.hospitalAddress = "Hospital address is required";
    if (!formData.organType) newErrors.organType = "Organ type is required";
    if (!formData.bloodType) newErrors.bloodType = "Blood type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async() => {
    if (validateForm()) {
      const payload = {
        ...formData,
        age: Number(formData.age), // convert age to number before sending
      };
      const { success, error } = await createRequest(payload as any); // Cast if needed


      if (success) {
        Alert.alert(
          "Request Submitted",
          "Your organ donation request has been successfully submitted.",
          [{ text: "OK" }]
        );
  
        setFormData({
          fullName: "",
          age: "",
          contactNumber: "",
          hospitalName: "",
          hospitalAddress: "",
          organType: "",
          bloodType: "",
          urgencyLevel: "medium" as "low" | "medium" | "high",
          isUrgent: false,
          additionalInfo: "",
        })

      } else {
        Alert.alert("Submission Failed", error || "Something went wrong. Please try again.");
        console.error("Submission failed", error);
      }
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#f5f5f5]">
      {/* Alert Banner */}
      <View className="bg-blue-50 p-4 flex-row items-center mb-4">
        <AlertCircle size={24} color="#E8315B" />
        <Text className="font-normal text-sm text-gray-800 ml-2 flex-1">
          Please fill out this form with accurate information to request an organ donation.
        </Text>
      </View>

      {/* Form Body */}
      <View className="px-5 pb-8">
        <Text className="font-semibold text-lg text-[#E8315B] mb-4 mt-2">Personal Information</Text>
        <InputField
          label="Full Name"
          value={formData.fullName}
          onChangeText={(val) => handleChange("fullName", val)}
          placeholder="Enter your full name"
          error={errors.fullName}
        />
        <InputField
          label="Age"
          value={formData.age}
          onChangeText={(val) => handleChange("age", val)}
          placeholder="Enter your age"
          keyboardType="numeric"
          error={errors.age}
        />
        <InputField
          label="Contact Number"
          value={formData.contactNumber}
          onChangeText={(val) => handleChange("contactNumber", val)}
          placeholder="Enter contact number"
          keyboardType="phone-pad"
          error={errors.contactNumber}
        />

        <Text className="font-semibold text-lg text-[#E8315B] mb-4 mt-2">Hospital Information</Text>
        <InputField
          label="Hospital Name"
          value={formData.hospitalName}
          onChangeText={(val) => handleChange("hospitalName", val)}
          placeholder="Enter hospital name"
          error={errors.hospitalName}
        />
        <InputField
          label="Hospital Address"
          value={formData.hospitalAddress}
          onChangeText={(val) => handleChange("hospitalAddress", val)}
          placeholder="Enter hospital address"
          multiline
          error={errors.hospitalAddress}
        />

        <Text className="font-semibold text-lg text-[#E8315B] mb-4 mt-2">Organ Information</Text>
        <Text className="font-medium text-sm text-gray-800 mb-2">Organ Type</Text>
        <SelectOptions
          options={organTypes}
          selected={formData.organType}
          onSelect={(val) => handleChange("organType", val)}
        />
        {errors.organType && <Text className="text-red-500 text-xs mt-1">{errors.organType}</Text>}

        <Text className="font-medium text-sm text-gray-800 mb-2 mt-5">Blood Type</Text>
        <SelectOptions
          options={bloodTypes}
          selected={formData.bloodType}
          onSelect={(val) => handleChange("bloodType", val)}
        />
        {errors.bloodType && <Text className="text-red-500 text-xs mt-1">{errors.bloodType}</Text>}

        <Text className="font-medium text-sm text-gray-800 mb-2 mt-5">Urgency Level</Text>
        <UrgencySelector urgency={formData.urgencyLevel} onChange={(val) => handleChange("urgencyLevel", val)} />

        <ToggleSwitch
          label="Mark as Urgent"
          value={formData.isUrgent}
          onToggle={(val) => handleChange("isUrgent", val)}
          description="Marking as urgent will highlight your request to potential donors"
        />

        <InputField
          label="Additional Information"
          value={formData.additionalInfo ?? ""}
          onChangeText={(val) => handleChange("additionalInfo", val)}
          placeholder="Enter any additional information"
          multiline
        />

        {/* Submit Button */}
        <TouchableOpacity className="bg-[#E8315B] rounded-lg py-4 items-center mt-2" onPress={handleSubmit}>
          <Text className="font-semibold text-base text-white">Submit Request</Text>
        </TouchableOpacity>

        {/* Footer Note */}
        <View className="flex-row mt-5 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <Info size={16} color="#666" />
          <Text className="text-xs text-gray-500 ml-2 flex-1">
            By submitting this form, you agree to our terms and conditions regarding organ donation requests.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
