import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Platform,
} from "react-native";
import {
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  Info,
} from "lucide-react-native";

interface FormErrors {
  fullName?: string;
  age?: string;
  contactNumber?: string;
  hospitalName?: string;
  hospitalAddress?: string;
  organType?: string;
  bloodType?: string;
}

export default function RequestScreen(): React.ReactElement {
  const [fullName, setFullName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [hospitalName, setHospitalName] = useState<string>("");
  const [hospitalAddress, setHospitalAddress] = useState<string>("");
  const [organType, setOrganType] = useState<string>("");
  const [bloodType, setBloodType] = useState<string>("");
  const [urgencyLevel, setUrgencyLevel] = useState<"low" | "medium" | "high">(
    "medium"
  );
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const [isUrgent, setIsUrgent] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const organTypes: string[] = [
    "Kidney",
    "Liver",
    "Heart",
    "Lung",
    "Cornea",
    "Bone Marrow",
  ];
  const bloodTypes: string[] = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!fullName) newErrors.fullName = "Full name is required";
    if (!age) newErrors.age = "Age is required";
    else if (isNaN(Number(age))) newErrors.age = "Age must be a number";

    if (!contactNumber) newErrors.contactNumber = "Contact number is required";
    if (!hospitalName) newErrors.hospitalName = "Hospital name is required";
    if (!hospitalAddress)
      newErrors.hospitalAddress = "Hospital address is required";
    if (!organType) newErrors.organType = "Organ type is required";
    if (!bloodType) newErrors.bloodType = "Blood type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (): void => {
    if (validateForm()) {
      // Submit the form
      console.log("Form submitted");
      // Reset form or navigate to confirmation
    }
  };

  return (
    <ScrollView className={`flex-1 bg-[#f5f5f5]`}>
      <View className={`bg-blue-50 p-4 flex-row items-center mb-4`}>
        <AlertCircle size={24} color="#E8315B" />
        <Text className={`font-normal text-sm text-gray-800 ml-2 flex-1`}>
          Please fill out this form with accurate information to request an
          organ donation.
        </Text>
      </View>

      <View className={`px-5 pb-8`}>
        <Text className={`font-semibold text-lg text-[#E8315B] mb-4 mt-2`}>
          Personal Information
        </Text>

        <View className={`mb-5`}>
          <Text className={`font-medium text-sm text-gray-800 mb-2`}>
            Full Name
          </Text>
          <TextInput
            className={`border-b ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            } py-2 text-base`}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <Text className={`text-red-500 text-xs mt-1`}>
              {errors.fullName}
            </Text>
          )}
        </View>

        <View className={`mb-5`}>
          <Text className={`font-medium text-sm text-gray-800 mb-2`}>Age</Text>
          <TextInput
            className={`border-b ${
              errors.age ? "border-red-500" : "border-gray-300"
            } py-2 text-base`}
            value={age}
            onChangeText={setAge}
            placeholder="Enter your age"
            keyboardType="numeric"
          />
          {errors.age && (
            <Text className={`text-red-500 text-xs mt-1`}>{errors.age}</Text>
          )}
        </View>

        <View className={`mb-5`}>
          <Text className={`font-medium text-sm text-gray-800 mb-2`}>
            Contact Number
          </Text>
          <TextInput
            className={`border-b ${
              errors.contactNumber ? "border-red-500" : "border-gray-300"
            } py-2 text-base`}
            value={contactNumber}
            onChangeText={setContactNumber}
            placeholder="Enter your contact number"
            keyboardType="phone-pad"
          />
          {errors.contactNumber && (
            <Text className={`text-red-500 text-xs mt-1`}>
              {errors.contactNumber}
            </Text>
          )}
        </View>

        <Text className={`font-semibold text-lg text-[#E8315B] mb-4 mt-2`}>
          Hospital Information
        </Text>

        <View className={`mb-5`}>
          <Text className={`font-medium text-sm text-gray-800 mb-2`}>
            Hospital Name
          </Text>
          <TextInput
            className={`border-b ${
              errors.hospitalName ? "border-red-500" : "border-gray-300"
            } py-2 text-base`}
            value={hospitalName}
            onChangeText={setHospitalName}
            placeholder="Enter hospital name"
          />
          {errors.hospitalName && (
            <Text className={`text-red-500 text-xs mt-1`}>
              {errors.hospitalName}
            </Text>
          )}
        </View>

        <View className={`mb-5`}>
          <Text className={`font-medium text-sm text-gray-800 mb-2`}>
            Hospital Address
          </Text>
          <TextInput
            className={`border-b ${
              errors.hospitalAddress ? "border-red-500" : "border-gray-300"
            } py-2 text-base`}
            value={hospitalAddress}
            onChangeText={setHospitalAddress}
            placeholder="Enter hospital address"
            multiline
            numberOfLines={3}
          />
          {errors.hospitalAddress && (
            <Text className={`text-red-500 text-xs mt-1`}>
              {errors.hospitalAddress}
            </Text>
          )}
        </View>

        <Text className={`font-semibold text-lg text-[#E8315B] mb-4 mt-2`}>
          Organ Information
        </Text>

        <View className={`mb-5`}>
          <Text className={`font-medium text-sm text-gray-800 mb-2`}>
            Organ Type
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className={`flex-row mb-1`}>
            {organTypes.map((type) => (
              <TouchableOpacity
                key={type}
                className={`${
                  organType === type ? "bg-[#E8315B]" : "bg-[#f0f0f0]"
                } rounded-full px-4 py-2 mr-2`}
                onPress={() => setOrganType(type)}>
                <Text
                  className={`font-medium text-sm ${
                    organType === type ? "text-white" : "text-gray-600"
                  }`}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {errors.organType && (
            <Text className={`text-red-500 text-xs mt-1`}>
              {errors.organType}
            </Text>
          )}
        </View>

        <View className={`mb-5`}>
          <Text className={`font-medium text-sm text-gray-800 mb-2`}>
            Blood Type
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className={`flex-row mb-1`}>
            {bloodTypes.map((type) => (
              <TouchableOpacity
                key={type}
                className={`${
                  bloodType === type ? "bg-[#E8315B]" : "bg-[#f0f0f0]"
                } rounded-full px-4 py-2 mr-2`}
                onPress={() => setBloodType(type)}>
                <Text
                  className={`font-medium text-sm ${
                    bloodType === type ? "text-white" : "text-gray-600"
                  }`}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {errors.bloodType && (
            <Text className={`text-red-500 text-xs mt-1`}>
              {errors.bloodType}
            </Text>
          )}
        </View>

        <View className={`mb-5`}>
          <Text className={`font-medium text-sm text-gray-800 mb-2`}>
            Urgency Level
          </Text>
          <View className={`flex-row justify-beeen`}>
            <TouchableOpacity
              className={`flex-1 py-2 items-center rounded-lg mx-1 ${
                urgencyLevel === "low" ? "bg-green-500" : "bg-green-50"
              }`}
              onPress={() => setUrgencyLevel("low")}>
              <Text
                className={`font-medium text-sm ${
                  urgencyLevel === "low" ? "text-white" : "text-gray-800"
                }`}>
                Low
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 py-2 items-center rounded-lg mx-1 ${
                urgencyLevel === "medium" ? "bg-orange-500" : "bg-orange-50"
              }`}
              onPress={() => setUrgencyLevel("medium")}>
              <Text
                className={`font-medium text-sm ${
                  urgencyLevel === "medium" ? "text-white" : "text-gray-800"
                }`}>
                Medium
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 py-2 items-center rounded-lg mx-1 ${
                urgencyLevel === "high" ? "bg-red-500" : "bg-red-50"
              }`}
              onPress={() => setUrgencyLevel("high")}>
              <Text
                className={`font-medium text-sm ${
                  urgencyLevel === "high" ? "text-white" : "text-gray-800"
                }`}>
                High
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className={`mb-5`}>
          <View className={`flex-row justify-beeen items-center`}>
            <Text className={`font-medium text-sm text-gray-800`}>
              Mark as Urgent
            </Text>
            <Switch
              value={isUrgent}
              onValueChange={setIsUrgent}
              trackColor={{ false: "#d1d1d1", true: "#2980b9" }}
              thumbColor={
                Platform.OS === "ios"
                  ? undefined
                  : isUrgent
                  ? "#E8315B"
                  : "#f4f3f4"
              }
            />
          </View>
          <Text className={`text-xs text-gray-500 mt-1`}>
            Marking as urgent will highlight your request to potential donors
          </Text>
        </View>

        <View className={`mb-5`}>
          <Text className={`font-medium text-sm text-gray-800 mb-2`}>
            Additional Information
          </Text>
          <TextInput
            className={`border-b border-gray-300 py-2 text-base min-h-24`}
            value={additionalInfo}
            onChangeText={setAdditionalInfo}
            placeholder="Enter any additional information that might be relevant"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          className={`bg-[#E8315B] rounded-lg py-4 items-center mt-2`}
          onPress={handleSubmit}>
          <Text className={`font-semibold text-base text-white`}>
            Submit Request
          </Text>
        </TouchableOpacity>

        <View
          className={`flex-row mt-5 p-4 bg-gray-50 rounded-lg border border-gray-100`}>
          <Info size={16} color="#666" />
          <Text className={`text-xs text-gray-500 ml-2 flex-1`}>
            By submitting this form, you agree to our terms and conditions
            regarding organ donation requests.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
