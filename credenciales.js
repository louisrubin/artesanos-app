// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZZkgaeJ2aOkEh5d89D4tcX4k0_zNy3Mg",
  authDomain: "bd-artesanos.firebaseapp.com",
  projectId: "bd-artesanos",
  storageBucket: "bd-artesanos.firebasestorage.app",
  messagingSenderId: "544191090506",
  appId: "1:544191090506:web:c234c0c8ba29ab98c13bb3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;