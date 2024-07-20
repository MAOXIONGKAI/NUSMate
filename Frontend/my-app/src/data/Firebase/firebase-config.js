// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAK46PyM-cOQLxr5-HDcNAaLN38ErwvKus",
  authDomain: "nusmate-chatapp.firebaseapp.com",
  projectId: "nusmate-chatapp",
  storageBucket: "nusmate-chatapp.appspot.com",
  messagingSenderId: "502612053511",
  appId: "1:502612053511:web:d21c93041fb04bab6724a2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
