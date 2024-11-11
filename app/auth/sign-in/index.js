import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from './../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { auth } from './../../../configs/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);


  const onSignIn=()=>{

    if(!email&&!password)
    {
      ToastAndroid.show("please enter email & password",ToastAndroid.LONG)
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    router.replace('/mytrip')
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage,errorCode);
    if(errorCode=='auth/invalid-credentail')
    {
      ToastAndroid.show("invalid credentials",ToastAndroid.LONG)
    }
  });
  }

  return (
    <View style={{ padding: 25, marginTop: 40, backgroundColor: Colors.WHITE, height: '100%' }}>
      
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="caret-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Let's Sign You In</Text>

      {/* Subtitles */}
      <Text style={styles.subtitle}>Welcome Back</Text>
      <Text style={styles.subtitle}>You've been missed!</Text>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input}
        onChangeText={(value)=>setEmail(value)}
        placeholder="Enter Email" />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput secureTextEntry={true} style={styles.input}
        onChangeText={(value)=>setPassword(value)}
        placeholder="Enter Password" />
      </View>

      {/* Sign In Button */}
      <TouchableOpacity onPress={onSignIn} style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Create Account Button */}
      <TouchableOpacity
        onPress={() => router.replace('auth/sign-up')}
        style={styles.createAccountButton}
      >
        <Text style={styles.createAccountText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 30,
  },
  subtitle: {
    fontFamily: 'outfit',
    color: Colors.GRAY,
    fontSize: 30,
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 50,
  },
  label: {
    fontFamily: 'outfit',
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    fontFamily: 'outfit',
  },
  signInButton: {
    padding: 20,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginTop: 50,
    borderWidth: 1,
  },
  signInButtonText: {
    color: Colors.WHITE,
    textAlign: 'center',
  },
  createAccountButton: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  createAccountText: {
    color: Colors.PRIMARY,
    textAlign: 'center',
  },
});   