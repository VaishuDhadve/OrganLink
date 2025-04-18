import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import Svg, { Path } from "react-native-svg";
import { Redirect, router } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

const { width } = Dimensions.get("window");

const WelcomeScreen: React.FC = () => {
  const { user } = useAuth();
  if (user) {
    return <Redirect href="/(tabs)/(home)" />;
  }

  return (
    <View className="flex-1 bg-white items-center justify-between">
      <StatusBar style="auto" />

      {/* Logo */}
      <View className="flex-1 justify-center items-center mt-16">
        <Image
          source={require("../assets/images/logo.png")}
          className="w-64 h-64 mb-2"
          resizeMode="cover"
        />
      </View>

      {/* Buttons */}
      <View className="w-full px-10 mb-40">
        <TouchableOpacity
          className="bg-white border-2 border-primary rounded-full py-4 items-center mb-4"
          onPress={() => router.replace("/auth/login")}>
          <Text className="text-pink-500 text-lg font-bold">Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-primary rounded-full py-4 items-center"
          onPress={() => router.replace("/auth/hospital-login")}>
          <Text className="text-white text-lg font-bold">Hospital Login</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Wave */}
      <View className="absolute bottom-0 w-full h-36">
        <Svg
          height="150"
          width={width}
          viewBox={`0 0 ${width} 150`}
          className="absolute bottom-0">
          <Path
            d={`M0 80 
               C${width * 0.2} 30, ${width * 0.3} 100, ${width * 0.4} 60 
               C${width * 0.5} 20, ${width * 0.6} 80, ${width * 0.7} 50 
               C${width * 0.8} 20, ${width * 0.9} 50, ${width} 40 
               L${width} 150 L0 150 Z`}
            fill="#e91e63"
            opacity={0.9}
          />
          <Path
            d={`M0 100 
               C${width * 0.15} 70, ${width * 0.25} 120, ${width * 0.35} 80 
               C${width * 0.45} 40, ${width * 0.55} 90, ${width * 0.65} 60 
               C${width * 0.75} 30, ${width * 0.85} 70, ${width} 60 
               L${width} 150 L0 150 Z`}
            fill="#e91e63"
            opacity={0.7}
          />
          <Path
            d={`M0 110 
               C${width * 0.1} 90, ${width * 0.2} 140, ${width * 0.3} 100 
               C${width * 0.4} 60, ${width * 0.5} 110, ${width * 0.6} 80 
               C${width * 0.7} 50, ${width * 0.8} 90, ${width} 80 
               L${width} 150 L0 150 Z`}
            fill="#e91e63"
            opacity={0.5}
          />
        </Svg>
      </View>
    </View>
  );
};

export default WelcomeScreen;
