import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {Firestore, getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyBeAmX5X2Ek1YomCT4ZpwsV7eeIbuhc_7g",
  authDomain: "react-socal-media.firebaseapp.com",
  projectId: "react-socal-media",
  storageBucket: "react-socal-media.appspot.com",
  messagingSenderId: "92468252307",
  appId: "1:92468252307:web:aad504c1c799025b7b4766"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);