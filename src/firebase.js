// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7U25TEcJ8jx_Cz5IZ-9fITlthxQOHgOs",
  authDomain: "lab4-4ca1e.firebaseapp.com",
  projectId: "lab4-4ca1e",
  storageBucket: "lab4-4ca1e.firebasestorage.app",
  messagingSenderId: "548071569581",
  appId: "1:548071569581:web:4b8930f0f4d1ce8888ee24",
  measurementId: "G-PR2XW0H874"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);