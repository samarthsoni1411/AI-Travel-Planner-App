import React from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';

const PlannedTrip = ({ trip }) => {
  if (!trip || trip.length === 0) {
    return <Text>No itinerary available</Text>;
  }

  const renderPlace = ({ item }) => (
    <View style={styles.placeContainer}>
      <Text style={styles.placeTitle}>{item.name}</Text>
      <Text>{item.details}</Text>
      <Text>Coordinates: {item.geo_coordinates}</Text>
      <Text>Time to Spend: {item.time_to_spend}</Text>
      <Text>Ticket Price: {item.ticket_pricing}</Text>
    </View>
  );

  const renderDay = ({ item }) => (
    <View style={styles.dayContainer}>
      <Text style={styles.dayTitle}>Day {item.day}: {item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <FlatList
        data={item.places}
        keyExtractor={(place, index) => index.toString()}
        renderItem={renderPlace}
        scrollEnabled={false} // Prevent scrolling inside FlatList to avoid conflict
      />
      <Text>Best Time to Visit: {item.best_time_to_visit}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Title of the whole trip */}
      <Text style={styles.tripTitle}>🚞 Plan Details</Text>
      
      <ScrollView>
        {trip.map((day, index) => (
          <View key={index.toString()}>
            {renderDay({ item: day })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  tripTitle: {
    fontSize: 20,
    fontFamily:'outfit-bold',
    marginBottom: 3,
    marginTop:10
  },
  dayContainer: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginVertical: 10,
    borderRadius: 10,
  },
  dayTitle: {
    fontSize: 17,
    fontFamily: 'outfit-bold',
  },
  description: {
    marginVertical: 5,
    fontSize: 17,
    fontFamily:'outfit'
  },
  placeContainer: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  placeTitle: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
  },
});

export default PlannedTrip;
