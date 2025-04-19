import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Bell, Heart, Users, Award } from "lucide-react-native";
import { useAuth } from "@/hooks/useAuth";
import { useRequests } from "@/hooks/useRequests";
import { RequestCard } from "@/components/RequestCard";
import ImageSlider from "@/components/ImageSlider";

type StatCardProps = {
  icon: JSX.Element;
  number: string;
  label: string;
};

export default function HomeScreen() {
  const { userData } = useAuth();
  const { requests } = useRequests();

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Welcome Section */}
      <View className="px-5 my-5">
        <Text className="mt-5 text-xl font-bold text-gray-800">
          Welcome back, {userData?.fullName.split(" ")[0]}
        </Text>
        <Text className="mt-1 text-sm text-gray-600">
          Thank you for being a part of saving lives.
        </Text>
      </View>

      {/* Stats Section */}
      <View className="flex-row justify-between px-5 mb-6">
        <StatCard
          icon={<Heart size={24} color="#e74c3c" />}
          number="120+"
          label="Lives Saved"
        />
        <StatCard
          icon={<Users size={24} color="#3498db" />}
          number="450+"
          label="Active Donors"
        />
        <StatCard
          icon={<Award size={24} color="#f39c12" />}
          number="98%"
          label="Success Rate"
        />
      </View>

      {/* Recent Requests */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center px-5 mb-4">
          <Text className="text-lg font-semibold text-gray-800">
            Recent Requests
          </Text>
          <TouchableOpacity>
            <Text className="text-sm font-medium text-red-500">See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-5">
          {requests.map((req, index) => (
            <RequestCard
              key={index}
              requestData={req}
              bloodType={req.bloodType}
              urgency={req.urgencyLevel}
              title={req.organType + " Needed"}
              location={req.hospitalAddress}
              timePosted="Posted 2 hours ago"
            />
          ))}
        </ScrollView>
      </View>

      <ImageSlider />
    </ScrollView>
  );
}

const StatCard: React.FC<StatCardProps> = ({ icon, number, label }) => (
  <View className="bg-white rounded-xl p-4 items-center w-[30%] shadow-md">
    {icon}
    <Text className="mt-2 text-lg font-bold text-gray-800">{number}</Text>
    <Text className="mt-1 text-xs text-gray-600">{label}</Text>
  </View>
);
