import React from "react";
import { View, Text, TextInput } from "react-native";

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  error?: string;
  multiline?: boolean;
  keyboardType?: "default" | "numeric" | "phone-pad";
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  multiline = false,
  keyboardType = "default",
}) => (
  <View className={`mb-5`}>
    <Text className={`font-medium text-sm text-gray-800 mb-2`}>{label}</Text>
    <TextInput
      className={`border-b ${
        error ? "border-red-500" : "border-gray-300"
      } py-2 text-base`}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      multiline={multiline}
      numberOfLines={multiline ? 3 : 1}
      keyboardType={keyboardType}
      textAlignVertical={multiline ? "top" : "auto"}
    />
    {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
  </View>
);
