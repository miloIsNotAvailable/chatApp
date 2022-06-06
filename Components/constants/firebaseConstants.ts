// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnoPnnZPMpq__3ljMbTwOd-SvvfcPSSm0",
  authDomain: "chat-stuff-e98b6.firebaseapp.com",
  databaseURL: "https://chat-stuff-e98b6-default-rtdb.firebaseio.com",
  projectId: "chat-stuff-e98b6",
  storageBucket: "chat-stuff-e98b6.appspot.com",
  messagingSenderId: "575198947756",
  appId: "1:575198947756:web:d1f752dd73aee3b52ab209",
  measurementId: "G-JETCDECW48"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
