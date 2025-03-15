import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Search, Filter, MapPin, Clock } from "lucide-react-native";

interface Donor {
  id: number;
  name: string;
  age: number;
  bloodType: string;
  organ: string;
  location: string;
  distance: string;
  image: string;
}

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const organTypes = [
  "Kidney",
  "Liver",
  "Heart",
  "Lung",
  "Cornea",
  "Bone Marrow",
];

const donors: Donor[] = [
  {
    id: 1,
    name: "David Wilson",
    age: 32,
    bloodType: "O+",
    organ: "Kidney",
    location: "New York, NY",
    distance: "2.5 miles",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    name: "Emma Johnson",
    age: 28,
    bloodType: "A+",
    organ: "Liver",
    location: "Brooklyn, NY",
    distance: "4.2 miles",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    name: "Michael Brown",
    age: 45,
    bloodType: "B-",
    organ: "Bone Marrow",
    location: "Queens, NY",
    distance: "6.8 miles",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 4,
    name: "Sophia Martinez",
    age: 35,
    bloodType: "AB+",
    organ: "Cornea",
    location: "Manhattan, NY",
    distance: "1.3 miles",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
];

export default function FindDonorScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBloodType, setSelectedBloodType] = useState<string | null>(
    null
  );
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null);

  const filteredDonors = donors.filter((donor) => {
    return (
      (!selectedBloodType || donor.bloodType === selectedBloodType) &&
      (!selectedOrgan || donor.organ === selectedOrgan) &&
      (!searchQuery ||
        donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donor.location.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <View className="flex-1 bg-gray-100">
      <View className="bg-white px-5 py-4 border-b border-gray-200">
        <View className="flex-row items-center bg-gray-200 rounded-lg px-3">
          <Search size={20} color="#f0f0f0" className="mr-2" />
          <TextInput
            className="flex-1 h-10"
            placeholder="Search by name or location"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity>
            <Filter size={20} color="#1a5276" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="bg-white py-4 border-b border-gray-200">
        <Text className="text-sm font-semibold text-gray-700 px-5 mb-2">
          Blood Type
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="pl-5 mb-2">
          {bloodTypes.map((type) => (
            <TouchableOpacity
              key={type}
              className={`px-4 py-2 rounded-full mr-2 ${
                selectedBloodType === type ? "bg-blue-700" : "bg-gray-100"
              }`}
              onPress={() =>
                setSelectedBloodType(selectedBloodType === type ? null : type)
              }>
              <Text
                className={`text-sm font-medium ${
                  selectedBloodType === type ? "text-white" : "text-gray-600"
                }`}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text className="text-sm font-semibold text-gray-700 px-5 mb-2">
          Organ Type
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="pl-5 mb-2">
          {organTypes.map((organ) => (
            <TouchableOpacity
              key={organ}
              className={`px-4 py-2 rounded-full mr-2 ${
                selectedOrgan === organ ? "bg-blue-700" : "bg-gray-100"
              }`}
              onPress={() =>
                setSelectedOrgan(selectedOrgan === organ ? null : organ)
              }>
              <Text
                className={`text-sm font-medium ${
                  selectedOrgan === organ ? "text-white" : "text-gray-600"
                }`}>
                {organ}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Text className="text-sm font-medium text-gray-600 m-5">
        {filteredDonors.length} donor{filteredDonors.length !== 1 ? "s" : ""}{" "}
        found
      </Text>

      <ScrollView className="px-5">
        {filteredDonors.map((donor) => (
          <View
            key={donor.id}
            className="bg-white rounded-lg p-4 mb-3 flex-row shadow-sm">
            <Image
              source={{ uri: donor.image }}
              className="w-16 h-16 rounded-full"
            />
            <View className="ml-4 flex-1">
              <Text className="text-lg font-semibold text-gray-900">
                {donor.name}, {donor.age}
              </Text>
              <View className="flex-row space-x-2 mt-1">
                <View className="bg-blue-100 rounded px-2 py-1">
                  <Text className="text-xs font-medium text-blue-800">
                    {donor.bloodType}
                  </Text>
                </View>
                <View className="bg-green-100 rounded px-2 py-1">
                  <Text className="text-xs font-medium text-green-800">
                    {donor.organ}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center mt-1">
                <MapPin size={14} color="#666" />
                <Text className="text-xs text-gray-600 ml-1">
                  {donor.location}
                </Text>
              </View>
              <View className="flex-row items-center mt-1">
                <Clock size={14} color="#666" />
                <Text className="text-xs text-gray-600 ml-1">
                  {donor.distance}
                </Text>
              </View>
            </View>
            <TouchableOpacity className="bg-primary rounded px-3 py-2">
              <Text className="text-white text-sm font-medium">Contact</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
