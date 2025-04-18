import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setLoading(true);

    const { success } = await login(email, password);
    if (success) {
      Alert.alert("Success", "Logged in successfully!");
      router.replace("/(tabs)"); // Navigate to home screen
    } else {
      Alert.alert("Login Failed", "Something wents wrong");
    }

    setLoading(false);
  };

  return (
    <View className="flex-1 bg-background p-5 justify-center">
      <StatusBar style="auto" />
      <Text className="text-4xl font-bold text-primary mb-10">
        Welcome Back!
      </Text>

      {/* Email Input */}
      <View className="mb-5">
        <Text className="text-base text-textGray mb-2">E-mail</Text>
        <TextInput
          className="border-b border-borderGray py-2 text-lg"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}
      <View className="mb-5">
        <Text className="text-base text-textGray mb-2">Password</Text>
        <View className="flex-row border-b border-borderGray items-center">
          <TextInput
            className="flex-1 py-2 text-lg"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            className="p-2"
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <Text className="text-xl text-textGray">👁️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        className="bg-primary rounded-full py-4 items-center mt-5 mb-8"
        onPress={handleLogin}
        disabled={loading}>
        <Text className="text-white text-lg font-bold">
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      {/* Signup Navigation */}
      <View className="flex-row justify-center">
        <Text className="text-textGray text-base">Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.replace("./register")}>
          <Text className="text-primary text-base font-bold">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
