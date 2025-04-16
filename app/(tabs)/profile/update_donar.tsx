import { View, Text, TextInput, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';

type Donor = {
  id: number;
  name: string;
  age: number;
  bloodType: string;
  organ: string;
  location: string;
  distance: string;
};

const mockDonor: Donor = {
  id: 1,
  name: 'John Doe',
  age: 30,
  bloodType: 'O+',
  organ: 'Kidney',
  location: 'New York',
  distance: '10km',
};

export default function UpdateDonor() {
  const [donor, setDonor] = useState<Donor>(mockDonor);

  const handleChange = (key: keyof Donor, value: string) => {
    setDonor((prev) => ({
      ...prev,
      [key]: key === 'age' || key === 'id' ? Number(value) : value,
    }));
  };

  const handleUpdate = () => {
    console.log('Updated Donor Info:', donor);
    alert('Donor information updated!');
  };

  return (
    <ScrollView className="p-5 bg-white">
      <Text className="text-xl font-bold text-gray-900 mb-6">
        Update Donor Information
      </Text>

      <Text className="text-sm text-gray-700">Name</Text>
      <TextInput
        value={donor.name}
        onChangeText={(text) => handleChange('name', text)}
        className="border border-gray-300 rounded-lg p-3 my-2"
        placeholder="Enter name"
      />

      <Text className="text-sm text-gray-700">Age</Text>
      <TextInput
        value={donor.age.toString()}
        onChangeText={(text) => handleChange('age', text)}
        keyboardType="numeric"
        className="border border-gray-300 rounded-lg p-3 my-2"
        placeholder="Enter age"
      />

      <Text className="text-sm text-gray-700">Blood Type</Text>
      <TextInput
        value={donor.bloodType}
        onChangeText={(text) => handleChange('bloodType', text)}
        className="border border-gray-300 rounded-lg p-3 my-2"
        placeholder="e.g. O+"
      />

      <Text className="text-sm text-gray-700">Organ</Text>
      <TextInput
        value={donor.organ}
        onChangeText={(text) => handleChange('organ', text)}
        className="border border-gray-300 rounded-lg p-3 my-2"
        placeholder="e.g. Kidney"
      />

      <Text className="text-sm text-gray-700">Location</Text>
      <TextInput
        value={donor.location}
        onChangeText={(text) => handleChange('location', text)}
        className="border border-gray-300 rounded-lg p-3 my-2"
        placeholder="e.g. New York"
      />

      <Text className="text-sm text-gray-700">Distance</Text>
      <TextInput
        value={donor.distance}
        onChangeText={(text) => handleChange('distance', text)}
        className="border border-gray-300 rounded-lg p-3 my-2"
        placeholder="e.g. 10km"
      />

      <Pressable
        className="bg-blue-600 rounded-lg p-4 mt-6"
        onPress={handleUpdate}
      >
        <Text className="text-white text-center font-semibold text-base">
          Update Donor
        </Text>
      </Pressable>
    </ScrollView>
  );
}
