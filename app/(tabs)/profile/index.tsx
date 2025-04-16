import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  Platform,
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
} from "lucide-react-native";
import { Link, router, useNavigation, useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { useAuth } from "@/hooks/useAuth";

const ProfileScreen = () => {
  const { user, userData, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    const { success } = await logout();
    if (success) {
      router.replace("/auth/login");
    }
  };
  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Profile Header */}
      <View className="flex-row items-center  bg-white p-5 border-b border-gray-200">
        {/* <Image
          source={{
            uri: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          }}
          className="w-20 h-20 rounded-full"
        /> */}
        <Text className="bg-primary rounded-full text-white text-center text-6xl pt-3 w-20 h-20">
          {userData?.email[0]}
        </Text>
        <View className="ml-5 flex-1">
          <Text className="text-lg font-bold text-gray-800">
            {userData?.fullName}
          </Text>
          <Text className="text-sm text-gray-600">{userData?.email}</Text>
          <View className="bg-red-500 flex-row items-center px-3 py-1 rounded-lg self-start mt-2">
            <Heart size={14} color="#fff" />
            <Text className="text-white text-xs ml-2">
              {userData?.isDonor ? "Registered Donar" : "Not Donated"}
            </Text>
          </View>
        </View>
      </View>

      {/* Donor Status */}
      <View className="bg-white m-4 p-4 rounded-lg shadow">
        <View className="flex-row items-center mb-4">
          <Award size={20} color="#E8315B" />
          <Text className="ml-3 text-lg font-semibold text-gray-800">
            Donor Status
          </Text>
        </View>
        <View>
          {[
            { label: "Blood Type", value: "O+" },
            { label: "Organs", value: "Kidney, Liver" },
            { label: "Last Checkup", value: "May 15, 2025" },
          ].map((item, index) => (
            <View key={index} className="flex-row justify-between mb-2">
              <Text className="text-gray-600">{item.label}</Text>
              <Text className="font-semibold text-gray-800">{item.value}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity onPress={() => router.push('../profile/update_donar')} className="bg-blue-100 rounded-md py-2 mt-3 items-center">
          <Text className="text-red-500 font-medium">
            Update Donor Information
          </Text>
        </TouchableOpacity>
      </View>

      {/* Account Settings */}
      <SettingsSection
        title="Account Settings"
        items={[
          {
            icon: <Settings size={20} color="#666" />,
            text: "Account Settings",
          },
          { icon: <Bell size={20} color="#666" />, text: "Notifications" },
          {
            icon: <Shield size={20} color="#666" />,
            text: "Privacy & Security",
          },
        ]}
      />

      {/* Preferences */}
      <SettingsSection
        title="Preferences"
        items={[
          {
            icon: <Bell size={20} color="#666" />,
            text: "Push Notifications",
            toggle: true,
          },
          {
            icon: <Bell size={20} color="#666" />,
            text: "Email Notifications",
            toggle: true,
            value: true,
          },
          {
            icon: <Bell size={20} color="#666" />,
            text: "Location Services",
            toggle: true,
          },
        ]}
      />

      {/* Support Section */}
      <SettingsSection
        title="Support"
        items={[
          {
            icon: <CircleHelp size={20} color="#666" />,
            text: "Help & Support",
          },
          {
            icon: <CircleHelp size={20} color="#666" />,
            text: "Terms & Conditions",
          },
          {
            icon: <CircleHelp size={20} color="#666" />,
            text: "Privacy Policy",
          },
        ]}
      />

      {/* Logout */}
      <TouchableOpacity
        onPress={handleLogout}
        className="flex-row items-center justify-center bg-white m-4 p-4 rounded-lg shadow">
        <View className="flex-row items-center">
          <LogOut size={20} color="#e74c3c" className="mr-2" />
          <Text className="text-red-500 font-medium">Logout</Text>
        </View>
      </TouchableOpacity>

      <View className="items-center mb-6">
        <Text className="text-gray-500 text-xs">OrganLink v1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const SettingsSection = ({
  title,
  items,
}: {
  title: string;
  items: {
    icon: JSX.Element;
    text: string;
    toggle?: boolean;
    value?: boolean;
  }[];
}) => {
  return (
    <View className="bg-white m-4 p-4 rounded-lg shadow">
      <Text className="text-lg font-semibold text-gray-800 mb-3">{title}</Text>
      {items.map((item, index) => (
        <View
          key={index}
          className="flex-row justify-between items-center py-3 border-b border-gray-200">
          <View className="flex-row items-center">
            {item.icon}
            <Text className="ml-3 text-gray-800 text-base">{item.text}</Text>
          </View>
          {item.toggle ? (
            <Switch
              value={item.value ?? false}
              trackColor={{ false: "#d1d1d1", true: "#2980b9" }}
              thumbColor={
                Platform.OS === "ios"
                  ? undefined
                  : item.value
                  ? "#E8315B"
                  : "#f4f3f4"
              }
            />
          ) : (
            <ChevronRight size={20} color="#999" />
          )}
        </View>
      ))}
    </View>
  );
};

export default ProfileScreen;
