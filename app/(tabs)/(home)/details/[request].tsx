// screens/RecipientDetails.tsx
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import {
  CircleUserIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  Share2Icon,
  HospitalIcon,
  TextIcon,
} from "lucide-react-native";

export default function RecipientDetails() {
  const params = useLocalSearchParams();
  const [requestData, setRequestData] = React.useState<Record<
    string,
    any
  > | null>(null);

  React.useEffect(() => {
    const raw = params.request;
    const requestStr = Array.isArray(raw) ? raw[0] : raw;

    try {
      const parsed = JSON.parse(requestStr);
      setRequestData(parsed);
    } catch (error) {
      console.error("Failed to parse request param:", error);
    }
  }, []);

  if (!requestData) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-500 text-base">
          Loading recipient details...
        </Text>
      </View>
    );
  }

  return (
    <View className="h-96 p-4 ">
      <View className="flex-1 shodow-xl w-full justify-around rounded-xl p-4 shadow-md bg-white">
        {/* Header Info */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <View className="bg-red-100 rounded-xl px-3 py-1 mr-3 items-center">
              <Text className="text-red-600 font-bold text-xl">
                {requestData?.bloodType}
              </Text>
            </View>
            <View>
              <Text className="font-bold text-lg text-black">
                {requestData?.organType}
              </Text>
              <Text className="text-gray-600">{requestData?.fullName}</Text>
            </View>
          </View>
        </View>

        {/* Location and Info */}
        <View className="mb-4 space-y-2">
          <View className="flex-row items-center">
            <HospitalIcon size={18} color="#555" />
            <Text className="ml-2 text-xl text-gray-700">
              {requestData?.hospitalName}
            </Text>
          </View>
          <View className="flex-row items-center">
            <MapPinIcon size={18} color="#555" />
            <Text className="ml-2 text-xl text-gray-700">
              {requestData?.hospitalAddress}
            </Text>
          </View>
          <View className="flex-row items-center">
            <CircleUserIcon size={18} color="#555" />
            <Text className="ml-2 text-xl text-gray-700">
              {requestData?.userId}
            </Text>
          </View>
          <View className="flex-row items-center">
            <TextIcon size={18} color="#555" />
            <Text className="ml-2 text-xl text-gray-700">
              Additional info:{" "}
              <Text className="text-green-600 font-semibold">
                {requestData?.additionalInfo}
              </Text>
            </Text>
          </View>
          <View className="flex-row gap-1">
            <PhoneIcon color="#d00" size={18} />
            <Text>{requestData?.contactNumber}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-1 gap-3">
          <View
            className={`px-4 py-2 w-24 rounded-md ${
              requestData?.urgencyLevel == "low"
                ? "bg-green-500"
                : requestData?.urgencyLevel == "high"
                ? "bg-red-500"
                : "bg-yellow-500"
            }`}
          >
            <Text className="text-white text-center text-xl font-semibold">
              {requestData?.urgencyLevel}
            </Text>
          </View>

          <View className="px-4 py-2 w-full rounded-md bg-blue-500">
            <Text className="text-white text-center text-xl font-semibold">
              Donate
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
