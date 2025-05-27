import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7U25TEcJ8jx_Cz5IZ-9fITlthxQOHgOs",
  authDomain: "lab4-4ca1e.firebaseapp.com",
  projectId: "lab4-4ca1e",
  storageBucket: "lab4-4ca1e.firebasestorage.app",
  messagingSenderId: "548071569581",
  appId: "1:548071569581:web:4b8930f0f4d1ce8888ee24",
  measurementId: "G-PR2XW0H874"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
const firebaseApp = initializeApp(firebaseConfig); 
if (typeof window !== 'undefined') {
  window.firebase = firebaseApp; 
}