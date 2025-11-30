// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase configuration using environment variables
// These values are safe to expose in client-side code
// See: https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics conditionally (only in browser environment)
const initializeAnalytics = async () => {
  const isBrowser = typeof window !== 'undefined';
  if (isBrowser && await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

// We're creating the analytics variable but not using it yet
// We'll initialize it when needed to avoid the ESLint warning
const analyticsPromise = initializeAnalytics();

export { db, analyticsPromise };