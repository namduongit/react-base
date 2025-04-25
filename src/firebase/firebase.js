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
  apiKey: "AIzaSyD_1ls963wCwi4FcpLfz8CJK4dFmC4u36w",
  authDomain: "test-router-b4bf3.firebaseapp.com",
  projectId: "test-router-b4bf3",
  storageBucket: "test-router-b4bf3.firebasestorage.app",
  messagingSenderId: "923924267702",
  appId: "1:923924267702:web:70891f946fc54a351cdc17",
  measurementId: "G-8NBDQ4M7XK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const GoogleAuthProviders = new GoogleAuthProvider();

const auth = getAuth(app);

const database = getFirestore(app);

export  { GoogleAuthProviders, database, auth }