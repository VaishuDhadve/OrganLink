import { useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView } from "react-native";
import { useEffect, useState } from "react";

export default function Details() {
  const params = useLocalSearchParams();
  const [requestData, setRequestData] = useState<Record<string, any> | null>(
    null
  );

  useEffect(() => {
    const raw = params.request;
    // Make sure it's a string
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
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500 text-base">
          Loading request details...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <View className=" h-48 w-full flex-1 rounded-md bg-background  justify-center items-center">
        <Text className="bg-primary mt-8 rounded-full text-white text-center text-6xl pt-3 w-20 h-20">
          {requestData?.fullName[0]}
        </Text>
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-800">
            {requestData?.fullName}
          </Text>
          <Text className="text-sm text-gray-600">{requestData?.age}</Text>
          
        </View>
      </View>
    </ScrollView>
  );
}
