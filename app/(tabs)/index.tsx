import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Bell, Heart, Users, Award } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome back, John!</Text>
        <Text style={styles.welcomeSubtext}>Thank you for being a part of saving lives.</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Heart size={24} color="#e74c3c" />
          <Text style={styles.statNumber}>120+</Text>
          <Text style={styles.statLabel}>Lives Saved</Text>
        </View>
        <View style={styles.statCard}>
          <Users size={24} color="#3498db" />
          <Text style={styles.statNumber}>450+</Text>
          <Text style={styles.statLabel}>Active Donors</Text>
        </View>
        <View style={styles.statCard}>
          <Award size={24} color="#f39c12" />
          <Text style={styles.statNumber}>98%</Text>
          <Text style={styles.statLabel}>Success Rate</Text>
        </View>
      </View>

      {/* Recent Requests */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Requests</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.requestsScroll}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.requestCard}>
              <View style={styles.requestHeader}>
                <View style={styles.bloodTypeTag}>
                  <Text style={styles.bloodTypeText}>A+</Text>
                </View>
                <Text style={styles.urgentTag}>Urgent</Text>
              </View>
              <Text style={styles.requestTitle}>Kidney Needed</Text>
              <Text style={styles.requestLocation}>City Hospital, New York</Text>
              <Text style={styles.requestTime}>Posted 2 hours ago</Text>
              <TouchableOpacity style={styles.requestButton}>
                <Text style={styles.requestButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  welcomeSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
    
  },
  welcomeText: {
    marginTop:20,
    padding:5,
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: '#333',
  },
  welcomeSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#333',
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#E8315B',
  },
  requestsScroll: {
    paddingLeft: 20,
  },
  requestCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    width: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bloodTypeTag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bloodTypeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#E8315B',
  },
  urgentTag: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#e74c3c',
  },
  requestTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  requestLocation: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  requestTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#999',
    marginBottom: 15,
  },
  requestButton: {
    backgroundColor: '#E8315B',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  requestButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#fff',
  },
});