/*import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>RideEasy</Text>
        <Icon name="user-circle" size={30} color="#fff" />
      </View>
      
      <View style={styles.mapContainer}>
        <Image 
          //source={require('../assets/map-placeholder.png')} 
          style={styles.mapImage}
        />
      </View>
      
      <View style={styles.bookingCard}>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => navigation.navigate('Booking')}
        >
          <Text style={styles.bookButtonText}>Book a Ride</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    flex: 1,
  },
  mapImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bookingCard: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  bookButton: {
    backgroundColor: '#1976D2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;*/

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, SafeAreaView, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons, FontAwesome, Ionicons, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
  const [pickup, setPickup] = useState('Current location');
  const [destination, setDestination] = useState('Where to?');
  const [selectedRide, setSelectedRide] = useState('standard');

  const rideOptions = [
    { id: 'standard', name: 'Standard', price: '$12-15', icon: 'car', time: '5 min', multiplier: 1 },
    { id: 'premium', name: 'Premium', price: '$20-25', icon: 'car-sport', time: '3 min', multiplier: 1.5 },
    { id: 'xl', name: 'XL', price: '$25-30', icon: 'car', time: '7 min', multiplier: 1.8 },
    { id: 'bike', name: 'Bike', price: '$5-8', icon: 'bicycle', time: '2 min', multiplier: 0.6 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileButton}>
          <Image 
            source={{ }}  // add here the profile picture of the user ( take from the data base)
            style={styles.profileImage}
          />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="work-outline" size={24} color="#333" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Location Input */}
      <View style={styles.locationContainer}>
        <View style={styles.locationInputContainer}>
          <View style={styles.locationDot} />
          <TextInput
            style={styles.locationInput}
            placeholder="Current location"
            value={pickup}
            onChangeText={setPickup}
          />
          <View style={styles.locationLine} />
          <View style={styles.locationSquare} />
          <TextInput
            style={styles.locationInput}
            placeholder="Where to?"
            value={destination}
            onChangeText={setDestination}
          />
        </View>
        <TouchableOpacity style={styles.switchButton}>
          <Entypo name="swap" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Map View */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
            title="Pickup"
          />
          <Marker
            coordinate={{ latitude: 37.79825, longitude: -122.4424 }}
            title="Destination"
            pinColor="blue"
          />
        </MapView>
      </View>

      {/* Ride Options */}
      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.9)', 'white']}
        style={styles.rideOptionsGradient}
      >
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.rideOptionsContainer}
        >
          {rideOptions.map((option) => (
            <TouchableOpacity 
              key={option.id}
              style={[
                styles.rideOption,
                selectedRide === option.id && styles.selectedRideOption
              ]}
              onPress={() => setSelectedRide(option.id)}
            >
              <Ionicons 
                name={option.icon} 
                size={24} 
                color={selectedRide === option.id ? 'white' : '#555'} 
              />
              <Text style={[
                styles.rideOptionName,
                selectedRide === option.id && styles.selectedRideText
              ]}>
                {option.name}
              </Text>
              <Text style={[
                styles.rideOptionPrice,
                selectedRide === option.id && styles.selectedRideText
              ]}>
                {option.price}
              </Text>
              <Text style={[
                styles.rideOptionTime,
                selectedRide === option.id && styles.selectedRideText
              ]}>
                {option.time}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Confirm Ride Button */}
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Confirm {rideOptions.find(o => o.id === selectedRide)?.name}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 40,
    zIndex: 10,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContainer: {
    position: 'absolute',
    top: 110,
    left: 20,
    right: 20,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationInputContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    paddingLeft: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationInput: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 5,
  },
  locationDot: {
    position: 'absolute',
    left: 20,
    top: 20,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
  },
  locationLine: {
    position: 'absolute',
    left: 24,
    top: 30,
    width: 2,
    height: 20,
    backgroundColor: '#ccc',
  },
  locationSquare: {
    position: 'absolute',
    left: 20,
    top: 50,
    width: 10,
    height: 10,
    backgroundColor: '#2196F3',
  },
  switchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  rideOptionsGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 20,
    paddingBottom: 30,
  },
  rideOptionsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  rideOption: {
    width: 120,
    padding: 15,
    borderRadius: 12,
    backgroundColor: 'white',
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedRideOption: {
    backgroundColor: '#333',
    borderColor: '#333',
  },
  rideOptionName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
    color: '#333',
  },
  rideOptionPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
  rideOptionTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },
  selectedRideText: {
    color: 'white',
  },
  confirmButton: {
    backgroundColor: '#000',
    padding: 15,
    marginHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HomeScreen;