import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import {
  Settings,
  Bell,
  Shield,
  CircleHelp,
  LogOut,
  ChevronRight,
  Award,
  Heart,
  MapPin,
  Calendar,
  Phone,
  Mail,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { useDonors } from "@/hooks/useDonars";

interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
  onPress?: () => void;
  showBorder?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  text,
  onPress,
  showBorder = true,
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-row items-center py-4 px-5 bg-white ${
      showBorder ? "border-b border-gray-100" : ""
    }`}
  >
    <View className="w-8">{icon}</View>
    <Text className="flex-1 text-gray-800 text-base ml-3">{text}</Text>
    <ChevronRight size={20} color="#666" />
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const { user, userData, logout } = useAuth();
  const { donors } = useDonors();
  const router = useRouter();

  // Find donor profile if exists
  const donorProfile = donors.find((donor) => donor.id === user?.uid);

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          const { success } = await logout();
          if (success) {
            router.replace("/auth/login");
          }
        },
      },
    ]);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Profile Header */}
      <View className="bg-white p-5">
        <View className="flex-row items-center">
          <View className="w-20 h-20 rounded-full bg-[#E8315B] items-center justify-center">
            <Text className="text-white text-3xl font-bold">
              {userData?.fullName?.[0]?.toUpperCase()}
            </Text>
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-xl font-bold text-gray-800">
              {userData?.fullName}
            </Text>
            <Text className="text-gray-600 mt-1">{userData?.email}</Text>
            {userData?.isDonor && (
              <View className="flex-row items-center mt-2 bg-red-100 self-start px-3 py-1 rounded-full">
                <Heart size={16} color="#E8315B" />
                <Text className="text-red-600 font-medium text-sm ml-1">
                  Registered Donor
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Quick Stats */}
        {userData?.isDonor && donorProfile && (
          <View className="mt-6 bg-gray-50 p-4 rounded-xl">
            <View className="flex-row justify-between mb-4">
              <View>
                <Text className="text-gray-600 text-sm">Blood Type</Text>
                <Text className="text-lg font-bold text-gray-800 mt-1">
                  {donorProfile.bloodType || "Not Set"}
                </Text>
              </View>
              <View>
                <Text className="text-gray-600 text-sm">Total Donations</Text>
                <Text className="text-lg font-bold text-gray-800 mt-1">
                  {donorProfile.totalDonations || 0}
                </Text>
              </View>
              <View>
                <Text className="text-gray-600 text-sm">Status</Text>
                <Text className="text-lg font-bold text-gray-800 mt-1">
                  {donorProfile.status === "available" ? "Active" : "Inactive"}
                </Text>
              </View>
            </View>

            {/* Donor Details */}
            <View className="space-y-2">
              <View className="flex-row items-center">
                <MapPin size={16} color="#666" />
                <Text className="text-gray-600 ml-2">
                  {donorProfile.location || "Location not set"}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Calendar size={16} color="#666" />
                <Text className="text-gray-600 ml-2">
                  Last Checkup: {donorProfile.lastCheckup || "Not available"}
                </Text>
              </View>
            </View>

            {/* Available Organs */}
            {donorProfile.availableOrgans &&
              donorProfile.availableOrgans.length > 0 && (
                <View className="mt-4">
                  <Text className="text-gray-600 mb-2">
                    Available for Donation
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {donorProfile.availableOrgans.map((organ, index) => (
                      <View
                        key={index}
                        className="bg-white px-3 py-1 rounded-full border border-gray-200"
                      >
                        <Text className="text-gray-800">{organ}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

            {/* Update Donor Profile Button */}
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/profile/update_donar")}
              className="bg-[#E8315B] rounded-lg py-3 mt-4"
            >
              <Text className="text-white text-center font-medium">
                Update Donor Profile
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Become a Donor Button (if not already a donor) */}
        {!userData?.isDonor && (
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/profile/update_donar")}
            className="mt-4 bg-[#E8315B] py-3 rounded-lg"
          >
            <Text className="text-white text-center font-medium">
              Become a Donor
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Menu Sections */}
      <View className="mt-6">
        {/* Account Settings */}
        <View className="mb-6">
          <Text className="text-gray-500 text-sm font-medium px-5 mb-2">
            ACCOUNT SETTINGS
          </Text>
          <MenuItem
            icon={<Settings size={20} color="#666" />}
            text="Account Settings"
            onPress={() => {
              /* Handle navigation */
            }}
          />
          <MenuItem
            icon={<Bell size={20} color="#666" />}
            text="Notifications"
            onPress={() => {
              /* Handle navigation */
            }}
          />
          <MenuItem
            icon={<Shield size={20} color="#666" />}
            text="Privacy & Security"
            onPress={() => {
              /* Handle navigation */
            }}
            showBorder={false}
          />
        </View>

        {/* Help & Support */}
        <View className="mb-6">
          <Text className="text-gray-500 text-sm font-medium px-5 mb-2">
            HELP & SUPPORT
          </Text>
          <MenuItem
            icon={<CircleHelp size={20} color="#666" />}
            text="Help Center"
            onPress={() => {
              /* Handle navigation */
            }}
          />
          <MenuItem
            icon={<Mail size={20} color="#666" />}
            text="Contact Us"
            onPress={() => {
              /* Handle navigation */
            }}
            showBorder={false}
          />
        </View>

        {/* Logout */}
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center py-4 px-5 bg-white mt-6"
        >
          <View className="w-8">
            <LogOut size={20} color="#E8315B" />
          </View>
          <Text className="flex-1 text-[#E8315B] text-base ml-3">Logout</Text>
        </TouchableOpacity>
      </View>

      {/* App Version */}
      <Text className="text-center text-gray-400 text-sm py-6">
        Version 1.0.0
      </Text>
    </ScrollView>
  );
}
