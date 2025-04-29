import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { Bell, Heart, Users, Award, Gift, Clock } from "lucide-react-native";
import { useAuth } from "@/hooks/useAuth";
import { useRequests } from "@/hooks/useRequests";
import { RequestCard } from "@/components/RequestCard";
import ImageSlider from "@/components/ImageSlider";
import { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

type StatCardProps = {
  icon: JSX.Element;
  number: string;
  label: string;
};

// Animated Stat Card Component
const StatCard = ({ icon, number, label }: StatCardProps) => {
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
      }}
      className="bg-white rounded-xl p-4 shadow-sm flex-1 mx-1"
    >
      <View className="items-center">
        <View className="bg-red-50 p-2 rounded-full mb-2">{icon}</View>
        <Text className="text-lg font-bold text-gray-800">{number}</Text>
        <Text className="text-xs text-gray-600 text-center">{label}</Text>
      </View>
    </Animated.View>
  );
};

// Inspirational Quote Component
const InspirationQuote = () => (
  <View className="mx-5 my-4">
    <LinearGradient
      colors={["#E8315B15", "#E8315B30"]}
      className="p-5 rounded-xl"
    >
      <Text className="text-lg font-bold text-gray-800 mb-2">
        "The gift of life is the greatest gift of all"
      </Text>
      <Text className="text-gray-600 text-sm">
        Your decision to become an organ donor can save up to 8 lives and
        enhance the lives of up to 75 people.
      </Text>
    </LinearGradient>
  </View>
);

// Impact Section Component
const ImpactSection = () => (
  <View className="bg-white p-5 mx-5 rounded-xl shadow-sm mb-4">
    <Text className="text-lg font-bold text-gray-800 mb-3">Your Impact</Text>
    <View className="flex-row justify-between">
      <View className="items-center">
        <Gift size={24} color="#E8315B" />
        <Text className="text-2xl font-bold text-gray-800 mt-2">8</Text>
        <Text className="text-xs text-gray-600">Lives Saved</Text>
      </View>
      <View className="items-center">
        <Clock size={24} color="#E8315B" />
        <Text className="text-2xl font-bold text-gray-800 mt-2">75</Text>
        <Text className="text-xs text-gray-600">Lives Enhanced</Text>
      </View>
      <View className="items-center">
        <Heart size={24} color="#E8315B" />
        <Text className="text-2xl font-bold text-gray-800 mt-2">∞</Text>
        <Text className="text-xs text-gray-600">Families Helped</Text>
      </View>
    </View>
  </View>
);

// Emergency Banner Component
const EmergencyBanner = () => (
  <TouchableOpacity className="bg-red-50 mx-5 my-3 p-4 rounded-xl mb-4 flex-row items-center">
    <View className="bg-red-100 p-2 rounded-full mr-3">
      <Bell size={24} color="#E8315B" />
    </View>
    <View className="flex-1">
      <Text className="text-base font-semibold text-gray-800">
        Emergency Requests
      </Text>
      <Text className="text-sm text-gray-600">
        3 urgent organ requests in your area
      </Text>
    </View>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const { userData } = useAuth();
  const { requests } = useRequests();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Welcome Section with Animation */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        }}
        className="px-5 pt-5"
      >
        <Text className="text-2xl font-bold text-gray-800">
          Welcome back, {userData?.fullName.split(" ")[0]}
        </Text>
        <Text className="text-base text-gray-600 mt-1">
          Together, we're making a difference
        </Text>
      </Animated.View>

      {/* Emergency Banner */}
      <EmergencyBanner />

      {/* Stats Section */}
      <View className="flex-row justify-between px-5 mb-6">
        <StatCard
          icon={<Heart size={24} color="#E8315B" />}
          number="120+"
          label="Lives Saved"
        />
        <StatCard
          icon={<Users size={24} color="#E8315B" />}
          number="450+"
          label="Active Donors"
        />
        <StatCard
          icon={<Award size={24} color="#E8315B" />}
          number="98%"
          label="Success Rate"
        />
      </View>

      {/* Inspirational Quote */}
      <InspirationQuote />

      {/* Impact Section */}
      <ImpactSection />

      {/* Recent Requests */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center px-5 mb-4">
          <Text className="text-lg font-bold text-gray-800">
            Recent Requests
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/(home)/all-requests")}
          >
            <Text className="text-sm font-medium text-[#E8315B]">See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-5"
        >
          {requests.map((req, index) => (
            <RequestCard
              key={index}
              requestData={req}
              bloodType={req.bloodType}
              urgency={req.urgencyLevel}
              title={req.organType + " Needed"}
              location={req.hospitalAddress}
              timePosted="Posted 2 hours ago"
            />
          ))}
        </ScrollView>
      </View>

      {/* Call to Action Section */}
      <View className="px-5 mb-6">
        <LinearGradient
          colors={["#E8315B", "#C4214B"]}
          className="p-6 rounded-xl"
        >
          <Text className="text-2xl font-bold text-white mb-2">
            Be a Hero Today
          </Text>
          <Text className="text-white text-base mb-4">
            Your decision to become an organ donor can give someone a second
            chance at life.
          </Text>
          <TouchableOpacity className="bg-white py-3 rounded-lg">
            <Text className="text-[#E8315B] font-semibold text-center">
              Register as Donor
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Image Slider with Testimonials */}
      <View className="mb-6">
        <Text className="text-lg font-bold text-gray-800 px-5 mb-4">
          Success Stories
        </Text>
        <ImageSlider />
      </View>

      {/* Mission Statement */}
      <View className="bg-gray-50 p-5 mb-6">
        <Text className="text-center text-gray-600 italic">
          "Every donation is a step towards saving lives. Join us in our mission
          to create hope and heal lives through organ donation."
        </Text>
      </View>
    </ScrollView>
  );
}
