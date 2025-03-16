import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (text: string) => void;
  secureTextEntry?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  secureTextEntry = false,
}) => (
  <View className="mb-4">
    <Text className="text-base text-textgray mb-2">{label}</Text>
    <TextInput
      className="border-b border-gray-300 py-2 text-lg"
      placeholder=""
      value={value}
      onChangeText={onChange}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
    />
  </View>
);

const CreateAccountScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { register } = useAuth();

  // Handle Email Registration
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    const { success, error } = await register(email, password, fullName);

    if (success) {
      Alert.alert("Success", "Account created successfully!");
      router.replace("/(tabs)"); // Navigate to home screen
    } else {
      Alert.alert("Registration Error", error);
    }
  };

  return (
    <View className="flex-1 bg-gray-100 p-5 justify-center">
      <StatusBar style="auto" />
      <Text className="text-3xl font-bold text-primary mb-10">
        Create An Account
      </Text>

      <InputField label="Full name" value={fullName} onChange={setFullName} />
      <InputField label="E-mail" value={email} onChange={setEmail} />

      <View className="mb-4">
        <Text className="text-base text-textgray mb-2">Password</Text>
        <View className="flex-row items-center border-b border-gray-300">
          <TextInput
            className="flex-1 py-2 text-lg"
            placeholder=""
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            className="p-2"
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <Text className="text-xl text-gray-600">👁️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <InputField
        label="Confirm Password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        secureTextEntry={!passwordVisible}
      />

      <TouchableOpacity
        className="bg-primary rounded-full py-3 mt-5 items-center"
        onPress={handleRegister}>
        <Text className="text-white text-lg font-bold">Create Account</Text>
      </TouchableOpacity>

      <View className="flex-row justify-center mt-5">
        <Text className="text-gray-600 text-lg">Already have an account? </Text>
        <TouchableOpacity onPress={() => router.replace("./login")}>
          <Text className="text-primary text-lg font-bold">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateAccountScreen;
