import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import Login from "../components/Login";
import { auth } from './../configs/FirebaseConfig';
import { useRouter } from "expo-router";
import { User } from 'firebase/auth'; // Update the import statement

export default function Index() {
  const [initializing, setInitializing] = useState(true); // To manage initial loading state
  const [user, setUser] = useState<User | null>(null); // Update the type to User | null
  const router = useRouter();

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('Auth state changed:', user); // Add this line to check the auth state
      if (user) {
        setUser(user); // Update the user state
        router.replace('/mytrip'); // Redirect to mytrip
      } else {
        setUser(null); // No user is signed in
      }
      setInitializing(false); // Firebase has completed checking the auth state
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [user]); // Add the user state as a dependency

  // Display a loading spinner while checking authentication status
  if (initializing) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {user ? (
        <Text>Redirecting...</Text> // Optional, in case you want a message
      ) : (
        <Login />
      )}
    </View>
  );
}