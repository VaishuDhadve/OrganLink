// components/SelectOptions.tsx
import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

interface SelectOptionsProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export const SelectOptions: React.FC<SelectOptionsProps> = ({
  options,
  selected,
  onSelect,
}) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mb-1">
    {options.map((option) => (
      <TouchableOpacity
        key={option}
        onPress={() => onSelect(option)}
        className={`${
          selected === option ? "bg-[#E8315B]" : "bg-[#f0f0f0]"
        } rounded-full px-4 py-2 mr-2`}>
        <Text
          className={`font-medium text-sm ${
            selected === option ? "text-white" : "text-gray-600"
          }`}>
          {option}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);
