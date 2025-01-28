// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "auth-login-3157a.firebaseapp.com",
  projectId: "auth-login-3157a",
  storageBucket: "auth-login-3157a.firebasestorage.app",
  messagingSenderId: "301980871228",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-VE3KGTYPNX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
