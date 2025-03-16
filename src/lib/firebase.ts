// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-SbHgiVRPqTzwzXE29o-yPMnI8Rm1y8Q",
  authDomain: "scamsafe-fba42.firebaseapp.com",
  projectId: "scamsafe-fba42",
  storageBucket: "scamsafe-fba42.firebasestorage.app",
  messagingSenderId: "909412171180",
  appId: "1:909412171180:web:38854d66e5c92b0e8bce09",
  measurementId: "G-PK8QRXFMTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);