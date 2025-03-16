// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSbbdenVYftzp-ALrIrbDklbVyTNGzMI0",
  authDomain: "organ-link.firebaseapp.com",
  projectId: "organ-link",
  storageBucket: "organ-link.firebasestorage.app",
  messagingSenderId: "587245503677",
  appId: "1:587245503677:web:f842bd1646cd285302e3d4",
  measurementId: "G-SLY55GQ4FV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { auth, db };
