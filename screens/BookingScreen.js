import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const BookingScreen = () => {
  const navigation = useNavigation();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('standard');
  
  const vehicleTypes = [
    { id: 'standard', name: 'Standard', icon: 'car', price: '$10-15' },
    { id: 'xl', name: 'XL', icon: 'car-side', price: '$15-20' },
    { id: 'premium', name: 'Premium', icon: 'gem', price: '$20-30' },
  ];

  const handleConfirm = () => {
    if (!pickup || !destination) {
      alert('Please enter both pickup and destination locations');
      return;
    }
    
    navigation.navigate('Confirmation', {
      pickup,
      destination,
      vehicleType: selectedVehicle,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Book a Ride</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Icon name="map-marked-alt" size={50} color="#1976D2" />
          <Text>Map will appear here</Text>
        </View>
      </View>
      
      <View style={styles.bookingForm}>
        <View style={styles.inputContainer}>
          <Icon name="circle" size={12} color="#4CAF50" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter pickup location"
            value={pickup}
            onChangeText={setPickup}
          />
          <TouchableOpacity style={styles.locationButton}>
            <Icon name="location-arrow" size={18} color="#1976D2" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.inputContainer}>
          <Icon name="circle" size={12} color="#F44336" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter destination"
            value={destination}
            onChangeText={setDestination}
          />
        </View>
        
        <Text style={styles.sectionTitle}>Choose your ride</Text>
        
        <View style={styles.vehicleOptions}>
          {vehicleTypes.map((vehicle) => (
            <TouchableOpacity
              key={vehicle.id}
              style={[
                styles.vehicleOption,
                selectedVehicle === vehicle.id && styles.vehicleOptionSelected,
              ]}
              onPress={() => setSelectedVehicle(vehicle.id)}
            >
              <Icon name={vehicle.icon} size={24} color="#1976D2" />
              <Text style={styles.vehicleName}>{vehicle.name}</Text>
              <Text style={styles.vehiclePrice}>{vehicle.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1976D2',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  mapContainer: {
    height: 250,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholder: {
    alignItems: 'center',
  },
  bookingForm: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  locationButton: {
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 20,
  },
  vehicleOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  vehicleOption: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  vehicleOptionSelected: {
    borderColor: '#1976D2',
    backgroundColor: '#E3F2FD',
  },
  vehicleName: {
    marginTop: 5,
    fontSize: 16,
  },
  vehiclePrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
  confirmButton: {
    backgroundColor: '#1976D2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookingScreen;