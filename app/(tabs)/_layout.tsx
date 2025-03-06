import { Tabs } from 'expo-router';
import { Chrome as Home, Search, FileText, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1a5276',
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
        },
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#eee',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        
        headerStyle: {
          backgroundColor: '#1a5276',
        },
        headerTitleStyle: {
          fontFamily: 'Inter-SemiBold',
          color: '#fff',
        },
        headerTitleAlign: 'center',
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