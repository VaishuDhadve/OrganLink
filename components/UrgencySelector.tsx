// components/UrgencySelector.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface UrgencySelectorProps {
  urgency: "low" | "medium" | "high";
  onChange: (value: "low" | "medium" | "high") => void;
}

export const UrgencySelector: React.FC<UrgencySelectorProps> = ({
  urgency,
  onChange,
}) => (
  <View className="flex-row justify-beeen mb-5">
    {["low", "medium", "high"].map((level) => {
      const bgColor =
        level === "low"
          ? "bg-green-500"
          : level === "medium"
          ? "bg-orange-500"
          : "bg-red-500";
      const bgInactive =
        level === "low"
          ? "bg-green-50"
          : level === "medium"
          ? "bg-orange-50"
          : "bg-red-50";

      return (
        <TouchableOpacity
          key={level}
          className={`flex-1 py-2 items-center rounded-lg mx-1 ${
            urgency === level ? bgColor : bgInactive
          }`}
          onPress={() => onChange(level as "low" | "medium" | "high")}>
          <Text
            className={`font-medium text-sm ${
              urgency === level ? "text-white" : "text-gray-800"
            }`}>
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);
