// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const API_KEY = process.env.REACT_APP_FIRESTORE_API_KEY;
const AUTH_DOMAIN = process.env.REACT_APP_FIRESTORE_AUTH_DOMAIN;
const PROJECT_ID = process.env.REACT_APP_FIRESTORE_PROJECT_ID;
const STORAGE_BUCKET = process.env.REACT_APP_FIRESTORE_STORAGE_BUCKET;
const MESSAGING_SENDER_ID = process.env.REACT_APP_FIRESTORE_MESSAGING_SENDER_ID;
const APP_ID = process.env.REACT_APP_FIRESTORE_APP_ID;
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
