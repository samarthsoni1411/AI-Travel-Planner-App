import { View, Text, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Colors } from '../../constants/Colors';
import moment from 'moment';
import FlightInfo from '../../components/TripDetails/FlightInfo';
import HotelList from '../../components/TripDetails/HotelList';
import PlannedTrip from '../../components/TripDetails/PlannedTrip';

export default function TripDetails() {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams(); // Grabbing 'trip' from parameters
  const [tripDetails, setTripDetails] = useState({}); // Defaulting to an empty object

  // Function to check if the input is a valid JSON string
  const isJSON = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Function to format trip data
  const formatData = (data) => {
    if (typeof data === 'string') {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error('Error parsing data:', error);
        return {}; // Return an empty object if parsing fails
      }
    }
    return data; // Return the object if it's already an object
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });

    // Log the received 'trip' value for debugging
    console.log('Received trip parameter:', trip);

    // Handle 'trip' parsing logic
    if (trip) {
      if (isJSON(trip)) {
        const parsedTrip = JSON.parse(trip);
        console.log('Parsed trip JSON:', parsedTrip); // Debugging parsed trip
        setTripDetails(parsedTrip); // Parse the JSON string
      } else if (typeof trip === 'object') {
        console.log('Trip is already an object:', trip); // Debugging if it's already an object
        setTripDetails(trip); // If it's already an object, set it directly
      } else {
        console.error('Trip data is not in the correct format.');
      }
    } else {
      console.error('Trip data is empty or undefined.');
    }
  }, [trip]);

  // Log the current state of tripDetails for debugging
  useEffect(() => {
    console.log('Updated tripDetails:', tripDetails); // Debugging tripDetails
  }, [tripDetails]);

  return (
    tripDetails && (
      <ScrollView>
        <Image
          source={require('./../../assets/images/trip.jpeg')}
          style={{
            width: '100%',
            height: 330,
          }}
        />
        <View
          style={{
            padding: 15,
            backgroundColor: Colors.WHITE,
            height: '100%',
            marginTop: -30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontFamily: 'outfit-bold',
            }}
          >
            {tripDetails?.tripPlan?.trip?.destination || 'Location Not Available'}
          </Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 5,
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontFamily: 'outfit',
                fontSize: 18,
                color: Colors.GRAY,
              }}
            >
              {tripDetails?.tripData
                ? moment(formatData(tripDetails.tripData).selectedStartDate).format('DD MMM yyyy')
                : 'Date Not Available'}
            </Text>

            <Text
              style={{
                fontFamily: 'outfit',
                fontSize: 18,
                color: Colors.GRAY,
              }}
            >
              {' '}
              -{' '}
              {tripDetails?.tripData
                ? moment(formatData(tripDetails.tripData).selectedEndDate).format('DD MMM yyyy')
                : 'Date Not Available'}
            </Text>
          </View>

          <Text
            style={{
              fontFamily: 'outfit',
              fontSize: 17,
              color: Colors.GRAY,
            }}
          >
            🚋{formatData(tripDetails.tripData)?.traveler?.title}
          </Text>

          {/* Flight Info */}
          <FlightInfo flightData={tripDetails?.tripPlan?.trip?.flight} />

          {/* Hotel List */}
          <HotelList hotelList={tripDetails?.tripPlan?.trip?.hotel} />

          {/* Trip Day Planner Info */}
          <PlannedTrip trip={tripDetails?.tripPlan?.trip?.itinerary} />
        </View>
      </ScrollView>
    )
  );
}
