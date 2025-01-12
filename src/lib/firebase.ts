import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDDrHGVuNn4HY--tsm5uMbonNGeNeg8B8w",
  authDomain: "makeyourself-1bb14.firebaseapp.com",
  projectId: "makeyourself-1bb14",
  storageBucket: "makeyourself-1bb14.firebasestorage.app",
  messagingSenderId: "716054478488",
  appId: "1:716054478488:web:4d18b1327141cb2ac31aed"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);