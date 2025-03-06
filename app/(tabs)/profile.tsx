import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Switch, Platform } from 'react-native';
import { Settings, Bell, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight, Award, Heart } from 'lucide-react-native';
import { Link } from 'expo-router';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john.doe@example.com</Text>
          <View style={styles.profileBadge}>
            <Heart size={14} color="#fff" />
            <Text style={styles.profileBadgeText}>Registered Donor</Text>
          </View>
        </View>
      </View>

      {/* Donor Status */}
      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <Award size={20} color="#1a5276" />
          <Text style={styles.statusTitle}>Donor Status</Text>
        </View>
        <View style={styles.statusDetails}>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Blood Type</Text>
            <Text style={styles.statusValue}>O+</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Organs</Text>
            <Text style={styles.statusValue}>Kidney, Liver</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Last Checkup</Text>
            <Text style={styles.statusValue}>May 15, 2025</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Update Donor Information</Text>
        </TouchableOpacity>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Settings size={20} color="#666" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Account Settings</Text>
          </View>
          <ChevronRight size={20} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Bell size={20} color="#666" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Notifications</Text>
          </View>
          <ChevronRight size={20} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Shield size={20} color="#666" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Privacy & Security</Text>
          </View>
          <ChevronRight size={20} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <View style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Bell size={20} color="#666" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Push Notifications</Text>
          </View>
          <Switch
            value={true}
            trackColor={{ false: '#d1d1d1', true: '#2980b9' }}
            thumbColor={Platform.OS === 'ios' ? undefined : true ? '#1a5276' : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Bell size={20} color="#666" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Email Notifications</Text>
          </View>
          <Switch
            value={true}
            trackColor={{ false: '#d1d1d1', true: '#2980b9' }}
            thumbColor={Platform.OS === 'ios' ? undefined : true ? '#1a5276' : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Bell size={20} color="#666" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Location Services</Text>
          </View>
          <Switch
            value={false}
            trackColor={{ false: '#d1d1d1', true: '#2980b9' }}
            thumbColor={Platform.OS === 'ios' ? undefined : false ? '#1a5276' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <HelpCircle size={20} color="#666" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Help & Support</Text>
          </View>
          <ChevronRight size={20} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <HelpCircle size={20} color="#666" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Terms & Conditions</Text>
          </View>
          <ChevronRight size={20} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <HelpCircle size={20} color="#666" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Privacy Policy</Text>
          </View>
          <ChevronRight size={20} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} >
        <Link href="../auth/login">
        <LogOut size={20} color="#e74c3c" style={styles.logoutIcon} />
        <Text style={styles.logoutText}>Logout</Text>
        </Link>
      </TouchableOpacity>

      <View style={styles.versionInfo}>
        <Text style={styles.versionText}>OrganLink v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 20,
    flex: 1,
  },
  profileName: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  profileBadge: {
    backgroundColor: '#1a5276',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  profileBadgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#fff',
    marginLeft: 5,
  },
  statusCard: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
  },
  statusDetails: {
    marginBottom: 15,
  },
  statusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statusLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  statusValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#333',
  },
  updateButton: {
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  updateButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1a5276',
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    marginRight: 15,
  },
  menuItemText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#e74c3c',
  },
  versionInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#999',
  },
});