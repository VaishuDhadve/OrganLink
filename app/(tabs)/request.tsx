import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Switch, Platform } from 'react-native';
import { Calendar, Clock, MapPin, CircleAlert as AlertCircle, Info } from 'lucide-react-native';

export default function RequestScreen() {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [organType, setOrganType] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState('medium');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const organTypes = ['Kidney', 'Liver', 'Heart', 'Lung', 'Cornea', 'Bone Marrow'];
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!fullName) newErrors.fullName = 'Full name is required';
    if (!age) newErrors.age = 'Age is required';
    else if (isNaN(Number(age))) newErrors.age = 'Age must be a number';
    
    if (!contactNumber) newErrors.contactNumber = 'Contact number is required';
    if (!hospitalName) newErrors.hospitalName = 'Hospital name is required';
    if (!hospitalAddress) newErrors.hospitalAddress = 'Hospital address is required';
    if (!organType) newErrors.organType = 'Organ type is required';
    if (!bloodType) newErrors.bloodType = 'Blood type is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      // Submit the form
      console.log('Form submitted');
      // Reset form or navigate to confirmation
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <AlertCircle size={24} color="#1a5276" />
        <Text style={styles.headerText}>
          Please fill out this form with accurate information to request an organ donation.
        </Text>
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={[styles.input, errors.fullName && styles.inputError]}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
          />
          {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Age</Text>
          <TextInput
            style={[styles.input, errors.age && styles.inputError]}
            value={age}
            onChangeText={setAge}
            placeholder="Enter your age"
            keyboardType="numeric"
          />
          {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Contact Number</Text>
          <TextInput
            style={[styles.input, errors.contactNumber && styles.inputError]}
            value={contactNumber}
            onChangeText={setContactNumber}
            placeholder="Enter your contact number"
            keyboardType="phone-pad"
          />
          {errors.contactNumber && <Text style={styles.errorText}>{errors.contactNumber}</Text>}
        </View>
        
        <Text style={styles.sectionTitle}>Hospital Information</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Hospital Name</Text>
          <TextInput
            style={[styles.input, errors.hospitalName && styles.inputError]}
            value={hospitalName}
            onChangeText={setHospitalName}
            placeholder="Enter hospital name"
          />
          {errors.hospitalName && <Text style={styles.errorText}>{errors.hospitalName}</Text>}
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Hospital Address</Text>
          <TextInput
            style={[styles.input, errors.hospitalAddress && styles.inputError]}
            value={hospitalAddress}
            onChangeText={setHospitalAddress}
            placeholder="Enter hospital address"
            multiline
            numberOfLines={3}
          />
          {errors.hospitalAddress && <Text style={styles.errorText}>{errors.hospitalAddress}</Text>}
        </View>
        
        <Text style={styles.sectionTitle}>Organ Information</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Organ Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsScroll}>
            {organTypes.map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.optionChip,
                  organType === type && styles.optionChipSelected
                ]}
                onPress={() => setOrganType(type)}
              >
                <Text
                  style={[
                    styles.optionChipText,
                    organType === type && styles.optionChipTextSelected
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {errors.organType && <Text style={styles.errorText}>{errors.organType}</Text>}
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Blood Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsScroll}>
            {bloodTypes.map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.optionChip,
                  bloodType === type && styles.optionChipSelected
                ]}
                onPress={() => setBloodType(type)}
              >
                <Text
                  style={[
                    styles.optionChipText,
                    bloodType === type && styles.optionChipTextSelected
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {errors.bloodType && <Text style={styles.errorText}>{errors.bloodType}</Text>}
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Urgency Level</Text>
          <View style={styles.urgencyContainer}>
            <TouchableOpacity
              style={[
                styles.urgencyOption,
                urgencyLevel === 'low' && styles.urgencyOptionSelected,
                { backgroundColor: urgencyLevel === 'low' ? '#4caf50' : '#e8f5e9' }
              ]}
              onPress={() => setUrgencyLevel('low')}
            >
              <Text
                style={[
                  styles.urgencyOptionText,
                  urgencyLevel === 'low' && styles.urgencyOptionTextSelected
                ]}
              >
                Low
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.urgencyOption,
                urgencyLevel === 'medium' && styles.urgencyOptionSelected,
                { backgroundColor: urgencyLevel === 'medium' ? '#ff9800' : '#fff3e0' }
              ]}
              onPress={() => setUrgencyLevel('medium')}
            >
              <Text
                style={[
                  styles.urgencyOptionText,
                  urgencyLevel === 'medium' && styles.urgencyOptionTextSelected
                ]}
              >
                Medium
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.urgencyOption,
                urgencyLevel === 'high' && styles.urgencyOptionSelected,
                { backgroundColor: urgencyLevel === 'high' ? '#f44336' : '#ffebee' }
              ]}
              onPress={() => setUrgencyLevel('high')}
            >
              <Text
                style={[
                  styles.urgencyOptionText,
                  urgencyLevel === 'high' && styles.urgencyOptionTextSelected
                ]}
              >
                High
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.inputGroup}>
          <View style={styles.switchContainer}>
            <Text style={styles.inputLabel}>Mark as Urgent</Text>
            <Switch
              value={isUrgent}
              onValueChange={setIsUrgent}
              trackColor={{ false: '#d1d1d1', true: '#2980b9' }}
              thumbColor={Platform.OS === 'ios' ? undefined : isUrgent ? '#1a5276' : '#f4f3f4'}
            />
          </View>
          <Text style={styles.switchHelp}>
            Marking as urgent will highlight your request to potential donors
          </Text>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Additional Information</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={additionalInfo}
            onChangeText={setAdditionalInfo}
            placeholder="Enter any additional information that might be relevant"
            multiline
            numberOfLines={5}
          />
        </View>
        
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Request</Text>
        </TouchableOpacity>
        
        <View style={styles.disclaimer}>
          <Info size={16} color="#666" />
          <Text style={styles.disclaimerText}>
            By submitting this form, you agree to our terms and conditions regarding organ donation requests.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1a5276',
    marginBottom: 15,
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginTop: 5,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  optionsScroll: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  optionChip: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  optionChipSelected: {
    backgroundColor: '#1a5276',
  },
  optionChipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: '#666',
  },
  optionChipTextSelected: {
    color: '#fff',
  },
  urgencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  urgencyOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  urgencyOptionSelected: {
    borderWidth: 0,
  },
  urgencyOptionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  urgencyOptionTextSelected: {
    color: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchHelp: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#1a5276',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  disclaimer: {
    flexDirection: 'row',
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  disclaimerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
});