// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
// import {
//     FIREBASE_API_KEY,
//     FIREBASE_AUTH_DOMAIN,
//     FIREBASE_PROJECT_ID,
//     FIREBASE_STORAGE_BUCKET,
//     FIREBASE_MESSAGING_SENDER_ID,
//     FIREBASE_APP_ID,
// } from "@env";


// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyAZZkgaeJ2aOkEh5d89D4tcX4k0_zNy3Mg",
   authDomain: "bd-artesanos.firebaseapp.com",
   projectId: "bd-artesanos",
   storageBucket: "bd-artesanos.firebasestorage.app",
   messagingSenderId: "544191090506",
   appId: "1:544191090506:web:c234c0c8ba29ab98c13bb3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export { auth, database, app };
