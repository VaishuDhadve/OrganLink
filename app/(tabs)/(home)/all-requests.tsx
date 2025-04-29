import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useRequests } from "@/hooks/useRequests";
import { Search, Filter, SlidersHorizontal } from "lucide-react-native";
import { Link } from "expo-router";

export default function AllRequestsScreen() {
  const { requests, loading } = useRequests();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    bloodType: "",
    organType: "",
    urgencyLevel: "",
  });

  const organTypes = [
    "Kidney",
    "Liver",
    "Heart",
    "Lung",
    "Cornea",
    "Bone Marrow",
  ];
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const urgencyLevels = ["high", "medium", "low"];

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      !searchQuery ||
      request.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.hospitalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.organType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBloodType =
      !filters.bloodType || request.bloodType === filters.bloodType;
    const matchesOrganType =
      !filters.organType || request.organType === filters.organType;
    const matchesUrgency =
      !filters.urgencyLevel || request.urgencyLevel === filters.urgencyLevel;

    return (
      matchesSearch && matchesBloodType && matchesOrganType && matchesUrgency
    );
  });

  const RequestCard = ({ request }: { request: any }) => (
    <Link
      href={{
        pathname: "/details/[request]",
        params: { request: JSON.stringify(request) },
      }}
      asChild
    >
      <TouchableOpacity className="bg-white rounded-xl p-4 mb-3 shadow-sm">
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-800">
              {request.organType} Needed
            </Text>
            <Text className="text-gray-600 mt-1">{request.fullName}</Text>
          </View>
          <View
            className={`px-3 py-1 rounded-full ${
              request.urgencyLevel === "high"
                ? "bg-red-100"
                : request.urgencyLevel === "medium"
                ? "bg-yellow-100"
                : "bg-green-100"
            }`}
          >
            <Text
              className={`text-xs font-medium ${
                request.urgencyLevel === "high"
                  ? "text-red-800"
                  : request.urgencyLevel === "medium"
                  ? "text-yellow-800"
                  : "text-green-800"
              }`}
            >
              {request.urgencyLevel}
            </Text>
          </View>
        </View>

        <View className="flex-row space-x-2 mt-3">
          <View className="bg-gray-100 px-3 py-1 rounded-full">
            <Text className="text-xs text-gray-800">{request.bloodType}</Text>
          </View>
          <View className="bg-gray-100 px-3 py-1 rounded-full">
            <Text className="text-xs text-gray-800">
              {request.hospitalName}
            </Text>
          </View>
        </View>

        <Text className="text-xs text-gray-500 mt-2">
          Posted {new Date(request.createdAt).toLocaleDateString()}
        </Text>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Search Header */}
      <View className="bg-white px-5 py-4 shadow-sm">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-2">
          <Search size={20} color="#666666" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Search requests..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal
              size={20}
              color={showFilters ? "#E8315B" : "#666666"}
            />
          </TouchableOpacity>
        </View>

        {showFilters && (
          <View className="mt-4">
            {/* Filter Options */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* Blood Type Filter */}
              <View className="mr-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Blood Type
                </Text>
                <View className="flex-row">
                  {bloodTypes.map((type) => (
                    <TouchableOpacity
                      key={type}
                      onPress={() =>
                        setFilters((prev) => ({
                          ...prev,
                          bloodType: prev.bloodType === type ? "" : type,
                        }))
                      }
                      className={`px-3 py-1 rounded-full mr-2 ${
                        filters.bloodType === type
                          ? "bg-[#E8315B]"
                          : "bg-gray-200"
                      }`}
                    >
                      <Text
                        className={`text-sm ${
                          filters.bloodType === type
                            ? "text-white"
                            : "text-gray-800"
                        }`}
                      >
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Organ Type Filter */}
              <View className="mr-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Organ Type
                </Text>
                <View className="flex-row">
                  {organTypes.map((type) => (
                    <TouchableOpacity
                      key={type}
                      onPress={() =>
                        setFilters((prev) => ({
                          ...prev,
                          organType: prev.organType === type ? "" : type,
                        }))
                      }
                      className={`px-3 py-1 rounded-full mr-2 ${
                        filters.organType === type
                          ? "bg-[#E8315B]"
                          : "bg-gray-200"
                      }`}
                    >
                      <Text
                        className={`text-sm ${
                          filters.organType === type
                            ? "text-white"
                            : "text-gray-800"
                        }`}
                      >
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Urgency Level Filter */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Urgency Level
                </Text>
                <View className="flex-row">
                  {urgencyLevels.map((level) => (
                    <TouchableOpacity
                      key={level}
                      onPress={() =>
                        setFilters((prev) => ({
                          ...prev,
                          urgencyLevel:
                            prev.urgencyLevel === level ? "" : level,
                        }))
                      }
                      className={`px-3 py-1 rounded-full mr-2 ${
                        filters.urgencyLevel === level
                          ? "bg-[#E8315B]"
                          : "bg-gray-200"
                      }`}
                    >
                      <Text
                        className={`text-sm capitalize ${
                          filters.urgencyLevel === level
                            ? "text-white"
                            : "text-gray-800"
                        }`}
                      >
                        {level}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </View>

      {/* Request List */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#E8315B" />
        </View>
      ) : (
        <ScrollView className="flex-1 px-5 pt-4">
          <Text className="text-gray-600 mb-4">
            {filteredRequests.length} requests found
          </Text>
          {filteredRequests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
