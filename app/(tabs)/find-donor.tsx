import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Search, Filter, MapPin, Clock, Heart } from 'lucide-react-native';

export default function FindDonorScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState<string | null>(null);
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const organTypes = ['Kidney', 'Liver', 'Heart', 'Lung', 'Cornea', 'Bone Marrow'];

  const donors = [
    {
      id: 1,
      name: 'David Wilson',
      age: 32,
      bloodType: 'O+',
      organ: 'Kidney',
      location: 'New York, NY',
      distance: '2.5 miles',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 2,
      name: 'Emma Johnson',
      age: 28,
      bloodType: 'A+',
      organ: 'Liver',
      location: 'Brooklyn, NY',
      distance: '4.2 miles',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 3,
      name: 'Michael Brown',
      age: 45,
      bloodType: 'B-',
      organ: 'Bone Marrow',
      location: 'Queens, NY',
      distance: '6.8 miles',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 4,
      name: 'Sophia Martinez',
      age: 35,
      bloodType: 'AB+',
      organ: 'Cornea',
      location: 'Manhattan, NY',
      distance: '1.3 miles',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    },
  ];

  const filteredDonors = donors.filter(donor => {
    const matchesBloodType = !selectedBloodType || donor.bloodType === selectedBloodType;
    const matchesOrgan = !selectedOrgan || donor.organ === selectedOrgan;
    const matchesSearch = !searchQuery || 
      donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesBloodType && matchesOrgan && matchesSearch;
  });

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or location"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#1a5276" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <Text style={styles.filterTitle}>Blood Type</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {bloodTypes.map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterChip,
                selectedBloodType === type && styles.filterChipSelected
              ]}
              onPress={() => setSelectedBloodType(selectedBloodType === type ? null : type)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedBloodType === type && styles.filterChipTextSelected
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.filterTitle}>Organ Type</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {organTypes.map(organ => (
            <TouchableOpacity
              key={organ}
              style={[
                styles.filterChip,
                selectedOrgan === organ && styles.filterChipSelected
              ]}
              onPress={() => setSelectedOrgan(selectedOrgan === organ ? null : organ)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedOrgan === organ && styles.filterChipTextSelected
                ]}
              >
                {organ}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results */}
      <Text style={styles.resultsText}>
        {filteredDonors.length} {filteredDonors.length === 1 ? 'donor' : 'donors'} found
      </Text>

      <ScrollView style={styles.donorsList}>
        {filteredDonors.map(donor => (
          <View key={donor.id} style={styles.donorCard}>
            <Image source={{ uri: donor.image }} style={styles.donorImage} />
            <View style={styles.donorInfo}>
              <Text style={styles.donorName}>{donor.name}, {donor.age}</Text>
              <View style={styles.donorTags}>
                <View style={styles.donorTag}>
                  <Text style={styles.donorTagText}>{donor.bloodType}</Text>
                </View>
                <View style={styles.donorTag}>
                  <Text style={styles.donorTagText}>{donor.organ}</Text>
                </View>
              </View>
              <View style={styles.donorLocation}>
                <MapPin size={14} color="#666" />
                <Text style={styles.donorLocationText}>{donor.location}</Text>
              </View>
              <View style={styles.donorDistance}>
                <Clock size={14} color="#666" />
                <Text style={styles.donorDistanceText}>{donor.distance}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.contactButtonText}>Contact</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontFamily: 'Inter-Regular',
  },
  filterButton: {
    padding: 8,
  },
  filtersContainer: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#333',
    marginLeft: 20,
    marginBottom: 10,
  },
  filterScroll: {
    paddingLeft: 20,
    marginBottom: 15,
  },
  filterChip: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  filterChipSelected: {
    backgroundColor: '#1a5276',
  },
  filterChipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: '#666',
  },
  filterChipTextSelected: {
    color: '#fff',
  },
  resultsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666',
    margin: 20,
  },
  donorsList: {
    paddingHorizontal: 20,
  },
  donorCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  donorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  donorInfo: {
    flex: 1,
    marginLeft: 15,
  },
  donorName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  donorTags: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  donorTag: {
    backgroundColor: '#e3f2fd',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  donorTagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#1976d2',
  },
  donorLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  donorLocationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#666',
    marginLeft: 5,
  },
  donorDistance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  donorDistanceText: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#666',
    marginLeft: 5,
  },
  contactButton: {
    backgroundColor: '#1a5276',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  contactButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#fff',
  },
});