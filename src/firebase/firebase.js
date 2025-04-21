// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3trjBNYNTxbVf4GyX1kEKLfGljqd1hqs",
  authDomain: "final-sea-food.firebaseapp.com",
  projectId: "final-sea-food",
  storageBucket: "final-sea-food.firebasestorage.app",
  messagingSenderId: "308649742247",
  appId: "1:308649742247:web:c39e48635292332cfcb082",
  measurementId: "G-2CEQ4J26TL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const GoogleAuthProviders = new GoogleAuthProvider();

const auth = getAuth(app);

const database = getFirestore(app);

export  { GoogleAuthProviders, database, auth }