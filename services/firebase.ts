// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-tBA5mFhcsZQhA2FgZ2K_D0tjRyDZb7A",
  authDomain: "matt-663-1.firebaseapp.com",
  projectId: "matt-663-1",
  storageBucket: "matt-663-1.firebasestorage.app",
  messagingSenderId: "258550102636",
  appId: "1:258550102636:web:124514e1090fb2b50fb649"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Get collection reference
const wordAiCollection = collection(db, "word-ai");

// Export Firebase app, Firestore instance and collection reference
export { app, db, wordAiCollection };