import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';

const ConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { pickup, destination, vehicleType } = route.params;
  
  const vehicleNames = {
    standard: 'Standard',
    xl: 'XL',
    premium: 'Premium',
  };
  
  const priceRanges = {
    standard: '$12.50',
    xl: '$17.50',
    premium: '$25.00',
  };
  
  const driver = {
    name: 'John D.',
    car: 'Toyota Camry',
    plate: 'ABC123',
    rating: 4.5,
    eta: 5,
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Ride Confirmation</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Icon name="check-circle" size={80} color="#4CAF50" />
        </View>
        
        <Text style={styles.successTitle}>Ride Confirmed!</Text>
        <Text style={styles.successMessage}>Your driver will arrive shortly</Text>
        
        <View style={styles.driverInfo}>
          <View style={styles.driverAvatar}>
            <Icon name="user" size={30} color="#fff" />
          </View>
          
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>{driver.name}</Text>
            <Text style={styles.vehicleInfo}>{driver.car} • {driver.plate}</Text>
            
            <View style={styles.ratingContainer}>
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name={i < Math.floor(driver.rating) ? 'star' : i < driver.rating ? 'star-half-alt' : 'star'}
                  size={16}
                  color="#FFC107"
                />
              ))}
              <Text style={styles.ratingText}>{driver.rating}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.etaContainer}>
          <Icon name="clock" size={20} color="#1976D2" />
          <Text style={styles.etaText}>ETA: {driver.eta} minutes</Text>
        </View>
        
        <View style={styles.rideDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Pickup:</Text>
            <Text style={styles.detailValue}>{pickup}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Destination:</Text>
            <Text style={styles.detailValue}>{destination}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Vehicle Type:</Text>
            <Text style={styles.detailValue}>{vehicleNames[vehicleType]}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Estimated Price:</Text>
            <Text style={styles.detailValue}>{priceRanges[vehicleType]}</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.doneButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.doneButtonText}>Done</Text>
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
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  successIcon: {
    marginVertical: 30,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  driverAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  vehicleInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  etaText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#1976D2',
    fontWeight: 'bold',
  },
  rideDetails: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailRowLast: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  doneButton: {
    backgroundColor: '#1976D2',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConfirmationScreen;