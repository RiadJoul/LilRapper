// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBru_8GNgquAHc5oPqdcsoyy9AvSfs2Ask",
  authDomain: "lil-rapper.firebaseapp.com",
  projectId: "lil-rapper",
  storageBucket: "lil-rapper.appspot.com",
  messagingSenderId: "1098608978718",
  appId: "1:1098608978718:web:c266ddefb74d0eda63f70f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {auth,db}