import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyAnoPnnZPMpq__3ljMbTwOd-SvvfcPSSm0",
    authDomain: "chat-stuff-e98b6.firebaseapp.com",
    databaseURL: "https://chat-stuff-e98b6-default-rtdb.firebaseio.com",
    projectId: "chat-stuff-e98b6",
    storageBucket: "chat-stuff-e98b6.appspot.com",
    messagingSenderId: "575198947756",
    appId: "1:575198947756:web:d1f752dd73aee3b52ab209",
    measurementId: "G-JETCDECW48"
  };
  
export const app = initializeApp( firebaseConfig )

export const auth = getAuth()