// components/ToggleSwitch.tsx
import React from "react";
import { View, Text, Switch, Platform } from "react-native";

interface ToggleSwitchProps {
  label: string;
  value: boolean;
  onToggle: (val: boolean) => void;
  description?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  value,
  onToggle,
  description,
}) => (
  <View className="mb-5">
    <View className="flex-row justify-between items-center">
      <Text className="font-medium text-sm text-gray-800">{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: "#d1d1d1", true: "#2980b9" }}
        thumbColor={Platform.OS === "ios" ? undefined : value ? "#E8315B" : "#f4f3f4"}
      />
    </View>
    {description && <Text className="text-xs text-gray-500 mt-1">{description}</Text>}
  </View>
);
