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
      <Text className="text-2xl font-bold text-primary mb-4">
        Request Details
      </Text>

      {Object.entries(requestData).map(([key, value]) => (
        <View
          key={key}
          className="flex flex-row items-center justify-between mb-3 bg-gray-100 rounded-xl p-4 shadow-sm">
          <Text className="text-gray-700 uppercase text-xs font-semibold">
            {key}
          </Text>
          <Text className="text-lg text-black mt-1">{String(value)}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
