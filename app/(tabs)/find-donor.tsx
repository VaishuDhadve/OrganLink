import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Search, Filter, MapPin, Clock, Heart } from "lucide-react-native";
import { useDonors } from "@/hooks/useDonars";
import { Link } from "expo-router";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const organTypes = [
  "Kidney",
  "Liver",
  "Heart",
  "Lung",
  "Cornea",
  "Bone Marrow",
];

export default function FindDonorScreen() {
  const { donors, loading } = useDonors();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBloodType, setSelectedBloodType] = useState<string | null>(
    null
  );
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredDonors = donors.filter((donor) => {
    const matchesBloodType =
      !selectedBloodType || donor.bloodType === selectedBloodType;
    const matchesOrgan =
      !selectedOrgan || donor.availableOrgans.includes(selectedOrgan);
    const matchesSearch =
      !searchQuery ||
      donor.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.location.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      matchesBloodType &&
      matchesOrgan &&
      matchesSearch &&
      donor.status === "available"
    );
  });

  return (
    <View className="flex-1 bg-gray-100">
      {/* Search Header */}
      <View className="bg-white px-5 py-4 border-b border-gray-200">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-2">
          <Search size={20} color="#666666" />
          <TextInput
            className="flex-1 ml-2 text-base text-gray-800"
            placeholder="Search by name or location"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
            <Filter size={20} color={showFilters ? "#E8315B" : "#666666"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filters */}
      {showFilters && (
        <View className="bg-white px-5 py-4 border-b border-gray-200">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Blood Type
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {bloodTypes.map((type) => (
              <TouchableOpacity
                key={type}
                className={`px-4 py-2 rounded-full mr-2 ${
                  selectedBloodType === type ? "bg-[#E8315B]" : "bg-gray-100"
                }`}
                onPress={() =>
                  setSelectedBloodType(selectedBloodType === type ? null : type)
                }
              >
                <Text
                  className={`text-sm font-medium ${
                    selectedBloodType === type ? "text-white" : "text-gray-600"
                  }`}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Organ Type
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-2"
          >
            {organTypes.map((organ) => (
              <TouchableOpacity
                key={organ}
                className={`px-4 py-2 rounded-full mr-2 ${
                  selectedOrgan === organ ? "bg-[#E8315B]" : "bg-gray-100"
                }`}
                onPress={() =>
                  setSelectedOrgan(selectedOrgan === organ ? null : organ)
                }
              >
                <Text
                  className={`text-sm font-medium ${
                    selectedOrgan === organ ? "text-white" : "text-gray-600"
                  }`}
                >
                  {organ}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Results */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#E8315B" />
        </View>
      ) : (
        <ScrollView className="flex-1 px-5 pt-4">
          <Text className="text-sm font-medium text-gray-600 mb-4">
            {filteredDonors.length} donor
            {filteredDonors.length !== 1 ? "s" : ""} found
          </Text>

          {filteredDonors.map((donor, index) => (
            <View
              key={donor.id}
              className="bg-white rounded-lg p-4 mb-3 shadow-sm"
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-900">
                    {donor.fullName}
                  </Text>
                  <View className="flex-row space-x-2 mt-2">
                    <View className="bg-red-100 rounded-full px-3 py-1">
                      <Text className="text-xs font-medium text-red-800">
                        {donor.bloodType}
                      </Text>
                    </View>
                    {donor.availableOrgans.map((organ, idx) => (
                      <View
                        key={idx}
                        className="bg-blue-100 rounded-full px-3 py-1"
                      >
                        <Text className="text-xs font-medium text-blue-800">
                          {organ}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View className="bg-green-100 px-3 py-1 rounded-full">
                  <Text className="text-xs font-medium text-green-800">
                    Available
                  </Text>
                </View>
              </View>

              <View className="mt-3">
                <View className="flex-row items-center">
                  <MapPin size={16} color="#666666" />
                  <Text className="text-sm text-gray-600 ml-1">
                    {donor.location}
                  </Text>
                </View>
                {donor.lastCheckup && (
                  <View className="flex-row items-center mt-1">
                    <Clock size={16} color="#666666" />
                    <Text className="text-sm text-gray-600 ml-1">
                      Last checkup: {donor.lastCheckup}
                    </Text>
                  </View>
                )}
              </View>

              <TouchableOpacity
                className="bg-[#E8315B] rounded-lg py-3 mt-4"
                onPress={() => {
                  // Handle contact donor action
                }}
              >
                <Text className="text-white text-center font-medium">
                  Contact Donor
                </Text>
              </TouchableOpacity>
            </View>
          ))}

          {filteredDonors.length === 0 && (
            <View className="flex-1 justify-center items-center py-8">
              <Heart size={48} color="#cccccc" />
              <Text className="text-gray-500 text-center mt-4">
                No donors found matching your criteria
              </Text>
              <Text className="text-gray-400 text-center mt-1">
                Try adjusting your filters
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}
