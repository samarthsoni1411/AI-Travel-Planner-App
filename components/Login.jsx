import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const Colors = {
  PRIMARY: '#000000',
  GRAY: '#7D7D7D',
  WHITE: '#FFFFFF',
};

export default function Login() {
  
  const router=useRouter();
  return (
    <ImageBackground
      source={require('../assets/images/image-1080x2400.jpg')} // Use your background image here
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>
          AI Travel Planner
        </Text>

        <Text style={styles.subtitle}>
          Discover your next adventure effortlessly. Personalized itineraries at
          your fingertips. Travel smarter with AI-driven insights.
        </Text>

        <TouchableOpacity style={styles.button}
        onPress={()=>router.push('auth/sign-in')}
        >
          <Text style={styles.buttonText}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    position: 'absolute', // Anchor the container at the bottom
    bottom: 0, // Align container to the bottom of the screen
    width: '100%', // Full width
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    alignItems: 'center', // Center the text and button horizontally
  },
  title: {
    fontSize: 30,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    color: Colors.PRIMARY,
    marginBottom: 20, // Space between title and subtitle
  },
  subtitle: {
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    fontSize: 17,
    color: Colors.PRIMARY,
    marginBottom: 30, // Space between subtitle and button
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    width: '80%', // Button width to match design
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.WHITE,
    fontFamily: 'outfit',
    fontSize: 17,
    textAlign: 'center',
  },
});
