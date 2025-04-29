// screens/RecipientDetails.tsx
import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Phone,
  MapPin,
  Clock,
  Calendar,
  Building2,
  User,
  Heart,
  AlertCircle,
  MessageCircle,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function RecipientDetails() {
  const params = useLocalSearchParams();
  const router = useRouter();
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

  const handleContact = () => {
    Alert.alert(
      "Contact Recipient",
      "Would you like to contact this recipient?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Call Now",
          onPress: () => {
            // Implement call functionality
          },
        },
        {
          text: "Send Message",
          onPress: () => {
            // Implement message functionality
          },
        },
      ]
    );
  };

  if (!requestData) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-500 text-base">Loading details...</Text>
      </View>
    );
  }

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header Section */}
      <LinearGradient
        colors={["#E8315B", "#C4214B"]}
        className="px-5 pt-6 pb-8 rounded-b-3xl"
      >
        <View className="flex-row justify-between items-start">
          <View>
            <Text className="text-white text-2xl font-bold">
              {requestData.organType} Needed
            </Text>
            <Text className="text-white opacity-80 mt-1">
              Request ID: #{requestData.id.slice(0, 8)}
            </Text>
          </View>
          <View
            className={`${getUrgencyColor(
              requestData.urgencyLevel
            )} px-4 py-2 rounded-full`}
          >
            <Text className="text-white font-semibold capitalize">
              {requestData.urgencyLevel}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Main Content */}
      <View className="px-5 mt-6">
        {/* Recipient Information */}
        <View className="bg-white rounded-xl p-5 shadow-sm mb-4">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Recipient Information
          </Text>

          <View className="space-y-4">
            <View className="flex-row items-center">
              <User size={20} color="#666666" />
              <View className="ml-3">
                <Text className="text-gray-600 text-sm">Full Name</Text>
                <Text className="text-gray-800 font-semibold">
                  {requestData.fullName}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <Calendar size={20} color="#666666" />
              <View className="ml-3">
                <Text className="text-gray-600 text-sm">Age</Text>
                <Text className="text-gray-800 font-semibold">
                  {requestData.age} years old
                </Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <Phone size={20} color="#666666" />
              <View className="ml-3">
                <Text className="text-gray-600 text-sm">Contact Number</Text>
                <Text className="text-gray-800 font-semibold">
                  {requestData.contactNumber}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Medical Information */}
        <View className="bg-white rounded-xl p-5 shadow-sm mb-4">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Medical Information
          </Text>

          <View className="flex-row mb-4">
            <View className="flex-1 items-center p-3 bg-red-50 rounded-lg mr-2">
              <Heart size={24} color="#E8315B" />
              <Text className="text-gray-600 text-sm mt-2">Blood Type</Text>
              <Text className="text-gray-800 font-bold text-lg">
                {requestData.bloodType}
              </Text>
            </View>
            <View className="flex-1 items-center p-3 bg-blue-50 rounded-lg ml-2">
              <AlertCircle size={24} color="#3B82F6" />
              <Text className="text-gray-600 text-sm mt-2">Organ Needed</Text>
              <Text className="text-gray-800 font-bold text-lg">
                {requestData.organType}
              </Text>
            </View>
          </View>

          {requestData.additionalInfo && (
            <View className="mt-2">
              <Text className="text-gray-600 text-sm">
                Additional Information
              </Text>
              <Text className="text-gray-800 mt-1">
                {requestData.additionalInfo}
              </Text>
            </View>
          )}
        </View>

        {/* Hospital Information */}
        <View className="bg-white rounded-xl p-5 shadow-sm mb-4">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Hospital Information
          </Text>

          <View className="space-y-4">
            <View className="flex-row items-center">
              <Building2 size={20} color="#666666" />
              <View className="ml-3">
                <Text className="text-gray-600 text-sm">Hospital Name</Text>
                <Text className="text-gray-800 font-semibold">
                  {requestData.hospitalName}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <MapPin size={20} color="#666666" />
              <View className="ml-3">
                <Text className="text-gray-600 text-sm">Hospital Address</Text>
                <Text className="text-gray-800 font-semibold">
                  {requestData.hospitalAddress}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <Clock size={20} color="#666666" />
              <View className="ml-3">
                <Text className="text-gray-600 text-sm">Request Posted</Text>
                <Text className="text-gray-800 font-semibold">
                  {new Date(requestData.createdAt).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row space-x-3 mb-6">
          <TouchableOpacity
            onPress={handleContact}
            className="flex-1 bg-[#E8315B] py-4 rounded-xl"
          >
            <Text className="text-white text-center font-semibold">
              Contact Recipient
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // Implement share functionality
            }}
            className="bg-gray-200 p-4 rounded-xl"
          >
            <MessageCircle size={24} color="#666666" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
