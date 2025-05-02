import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Heart,
  MapPin,
  Clock,
  Users,
  UserPlus,
  CheckCircle,
} from "lucide-react-native";
import { useRequests } from "@/hooks/useRequests";
import { useDonors } from "@/hooks/useDonars";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HospitalPortal() {
  const { requests, loading: requestsLoading } = useRequests();
  const { donors, loading: donorsLoading } = useDonors();

  const getMatchingDonors = (request: any) => {
    return donors.filter((donor) => {
      return (
        donor.bloodType === request.bloodType &&
        donor.availableOrgans.includes(request.organType) &&
        donor.status === "available"
      );
    });
  };

  const getMatchesStats = () => {
    const pendingMatches = requests.filter(
      (request) => request.status === "pending"
    ).length;
    const completedMatches = requests.filter(
      (request) => request.status === "completed"
    ).length;
    return { pendingMatches, completedMatches };
  };

  const { pendingMatches, completedMatches } = getMatchesStats();

  const DashboardCard = ({ title, value, icon: Icon, color }: any) => (
    <View className="bg-white rounded-xl p-4 flex-1 mr-2">
      <View className="flex-row items-center">
        <View className={`bg-${color}-100 p-2 rounded-lg`}>
          <Icon
            size={24}
            color={`#${
              color === "red"
                ? "E8315B"
                : color === "blue"
                ? "3B82F6"
                : "10B981"
            }`}
          />
        </View>
        <View className="ml-3">
          <Text className="text-sm text-gray-500">{title}</Text>
          <Text className="text-xl font-bold text-gray-800">{value}</Text>
        </View>
      </View>
    </View>
  );

  const RequestCard = ({ request }: { request: any }) => {
    const matchingDonors = getMatchingDonors(request);

    return (
      <View className="bg-white rounded-xl p-4 mb-3 shadow-sm">
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

        {/* Matching Donors Section */}
        <View className="mt-4">
          <Text className="text-sm font-medium text-gray-700 mb-2">
            Matching Donors ({matchingDonors.length})
          </Text>
          {matchingDonors.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {matchingDonors.map((donor) => (
                <View
                  key={donor.id}
                  className="bg-blue-50 rounded-lg p-3 mr-2 w-48"
                >
                  <Text className="font-medium text-gray-800">
                    {donor.fullName}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <MapPin size={14} color="#666" />
                    <Text className="text-xs text-gray-600 ml-1">
                      {donor.location}
                    </Text>
                  </View>
                  {donor.lastCheckup && (
                    <View className="flex-row items-center mt-1">
                      <Clock size={14} color="#666" />
                      <Text className="text-xs text-gray-600 ml-1">
                        Last checkup: {donor.lastCheckup}
                      </Text>
                    </View>
                  )}
                  <TouchableOpacity
                    className="bg-[#E8315B] rounded-lg py-2 mt-2"
                    onPress={() => {
                      // Handle contact donor action
                    }}
                  >
                    <Text className="text-white text-center text-xs font-medium">
                      Notify
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          ) : (
            <View className="bg-gray-50 rounded-lg p-3">
              <Text className="text-sm text-gray-500 text-center">
                No matching donors found
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const DonorCard = ({ donor }: { donor: any }) => (
    <View className="bg-white rounded-xl p-4 mb-3 shadow-sm">
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-800">
            {donor.fullName}
          </Text>
          <View className="flex-row items-center mt-1">
            <MapPin size={14} color="#666" />
            <Text className="text-xs text-gray-600 ml-1">{donor.location}</Text>
          </View>
        </View>
        <View className="bg-green-100 px-3 py-1 rounded-full">
          <Text className="text-xs font-medium text-green-800">
            {donor.status}
          </Text>
        </View>
      </View>

      <View className="flex-row flex-wrap gap-2 mt-3">
        {donor.availableOrgans.map((organ: string, index: number) => (
          <View key={index} className="bg-blue-100 px-3 py-1 rounded-full">
            <Text className="text-xs text-blue-800">{organ}</Text>
          </View>
        ))}
      </View>

      <View className="flex-row items-center mt-3">
        <View className="bg-gray-100 px-3 py-1 rounded-full">
          <Text className="text-xs text-gray-800">{donor.bloodType}</Text>
        </View>
        {donor.lastCheckup && (
          <View className="flex-row items-center ml-2">
            <Clock size={14} color="#666" />
            <Text className="text-xs text-gray-600 ml-1">
              {donor.lastCheckup}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {requestsLoading || donorsLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#E8315B" />
        </View>
      ) : (
        <ScrollView className="flex-1">
          {/* Dashboard Overview */}
          <View className="px-5 py-4">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Dashboard Overview
            </Text>
            <View className="flex-row mb-4">
              <DashboardCard
                title="Total Donors"
                value={donors.length}
                icon={Users}
                color="blue"
              />
              <DashboardCard
                title="Total Recipients"
                value={requests.length}
                icon={UserPlus}
                color="red"
              />
            </View>
            <View className="flex-row">
              <DashboardCard
                title="Pending Matches"
                value={pendingMatches}
                icon={Heart}
                color="red"
              />
              <DashboardCard
                title="Completed Matches"
                value={completedMatches}
                icon={CheckCircle}
                color="green"
              />
            </View>
          </View>

          {/* Donors List */}
          <View className="px-5 py-4">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Active Donors
            </Text>
            {donors.map((donor) => (
              <DonorCard key={donor.id} donor={donor} />
            ))}
          </View>

          {/* Requests List */}
          <View className="px-5 py-4">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Active Requests
            </Text>
            {requests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}

            {requests.length === 0 && (
              <View className="flex-1 justify-center items-center py-8">
                <Heart size={48} color="#cccccc" />
                <Text className="text-gray-500 text-center mt-4">
                  No requests found
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
