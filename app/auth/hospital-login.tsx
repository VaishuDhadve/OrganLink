import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

const HospitalLogin = () => {
  const [hospitalId, setHospitalId] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!hospitalId) {
      Alert.alert("Error", "Please enter your hospital ID");
      return;
    }

    setLoading(true);

    try {
      // TODO: Implement hospital login logic
      // For now, we'll just navigate to the hospital dashboard
      router.push("/hospital-portal");
    } catch (error) {
      Alert.alert("Error", "Failed to navigate to hospital portal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-background p-5 justify-center">
      <StatusBar style="auto" />
      <Text className="text-4xl font-bold text-primary mb-10">
        Hospital Portal
      </Text>

      {/* Hospital ID Input */}
      <View className="mb-5">
        <Text className="text-base text-textGray mb-2">Hospital ID</Text>
        <TextInput
          className="border-b border-borderGray py-2 text-lg"
          value={hospitalId}
          onChangeText={setHospitalId}
          placeholder="Enter your hospital ID"
          autoCapitalize="none"
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity
        className="bg-primary rounded-full py-4 items-center mt-5 mb-8"
        onPress={handleLogin}
        disabled={loading}
      >
        <Text className="text-white text-lg font-bold">
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      {/* User Login Navigation */}
      <View className="flex-row justify-center">
        <Text className="text-textGray text-base">
          Looking for user login?{" "}
        </Text>
        <TouchableOpacity onPress={() => router.replace("./login")}>
          <Text className="text-primary text-base font-bold">Click Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HospitalLogin;
