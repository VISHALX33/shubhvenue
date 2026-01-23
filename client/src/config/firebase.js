import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
// Firebase configuration
// Replace these with your actual Firebase config values
const firebaseConfig = {
  apiKey: "AIzaSyDtu4OgQXKRw7TJwm83oaBI6TdbFkRKsBg",
  authDomain: "app-d2e00.firebaseapp.com",
  databaseURL: "https://app-d2e00-default-rtdb.firebaseio.com",
  projectId: "app-d2e00",
  storageBucket: "app-d2e00.firebasestorage.app",
  messagingSenderId: "770548138347",
  appId: "1:770548138347:web:a73e56dbb87d9ecf36cc2e",
  measurementId: "G-HTFJFF717W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();
