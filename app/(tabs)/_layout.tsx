import { Tabs } from 'expo-router';
import { Chrome as Home, Search, FileText, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: '#E8315B',
        tabBarInactiveTintColor: '#490008',
        tabBarLabelStyle: {
        fontFamily: 'Inter-Medium',
          fontSize: 13,
          fontWeight:"500"
        },
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#eee',
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
        
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: {
          fontFamily: 'Inter-SemiBold',
          color: '#E8315B',
        },
        headerTitleAlign: 'left',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          headerTitle: 'OrganLink',
        }}
      />
      <Tabs.Screen
        name="find-donor"
        options={{
          title: 'Find Donor',
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
          headerTitle: 'Find Donor',
        }}
      />
      <Tabs.Screen
        name="request"
        options={{
          title: 'Request',
          tabBarIcon: ({ color, size }) => <FileText size={size} color={color} />,
          headerTitle: 'Request Organ',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
          headerTitle: 'My Profile',
        }}
      />
    </Tabs>
  );
}