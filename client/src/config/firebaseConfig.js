// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const details = import.meta.env

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: details.VITE_API_KEY,
  authDomain: details.VITE_AUTH_DOMAIN,
  projectId: details.VITE_PROJECT_ID,
  storageBucket: details.VITE_BUCKET,
  messagingSenderId: details.VITE_SENDER_ID,
  appId: details.VITE_APP_ID,
  measurementId: details.VITE_MEASURE_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;