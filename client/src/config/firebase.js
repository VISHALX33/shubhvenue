import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDtu4OgQXKRw7TJwm83oaBI6TdbFkRKsBg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "app-d2e00.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://app-d2e00-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "app-d2e00",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "app-d2e00.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "770548138347",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:770548138347:web:a73e56dbb87d9ecf36cc2e",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-HTFJFF717W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();
