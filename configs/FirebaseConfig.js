// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj4TqGi_95G6Xifk7k9q0hZfG9wwxWUxg",
  authDomain: "ai-travel-planner-app-1ef16.firebaseapp.com",
  projectId: "ai-travel-planner-app-1ef16",
  storageBucket: "ai-travel-planner-app-1ef16.appspot.com",
  messagingSenderId: "308704862949",
  appId: "1:308704862949:web:61350cd2ef4dca2e072a0c",
  measurementId: "G-CB5KTEVW1D"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
