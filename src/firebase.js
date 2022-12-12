// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    
  apiKey: "AIzaSyBlgV4t3GdJ0ZD-dcFGE8_utPkknGHhqwk",
  authDomain: "react-crud-c9879.firebaseapp.com",
  projectId: "react-crud-c9879",
  storageBucket: "react-crud-c9879.appspot.com",
  messagingSenderId: "659430238254",
  appId: "1:659430238254:web:9649bcdc4cc17c7077d7bf",
  measurementId: "G-RK9MKCD216"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db=getDatabase(app)