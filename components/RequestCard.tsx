import { Text, TouchableOpacity, View } from "react-native";

type RequestCardProps = {
  bloodType: string;
  urgency: string;
  title: string;
  location: string;
  timePosted: string;
};

export const RequestCard: React.FC<RequestCardProps> = ({
  bloodType,
  urgency,
  title,
  location,
  timePosted,
}) => (
  <View className="bg-white rounded-xl p-4 mx-2 w-48 shadow-md ">
    <View className="flex-row justify-between mb-2">
      <View className="bg-blue-100 px-3 py-1 rounded-md">
        <Text className="text-xs font-semibold text-red-500">{bloodType}</Text>
      </View>
      <Text className="text-xs font-semibold text-red-500">{urgency}</Text>
    </View>
    <Text className="text-base font-semibold text-gray-800 mb-1">{title}</Text>
    <Text className="text-sm text-gray-600 mb-1">{location}</Text>
    <Text className="text-xs text-gray-500 mb-3">{timePosted}</Text>
    <TouchableOpacity className="bg-primary rounded-md py-2 items-center">
      <Text className="text-white text-sm font-medium">View Details</Text>
    </TouchableOpacity>
  </View>
);
