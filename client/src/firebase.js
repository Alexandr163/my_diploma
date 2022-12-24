// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbZbnRQ0-VHgZX1kkiwcJkKRdMZU2ai9E",
  authDomain: "my-diploma-2c74f.firebaseapp.com",
  projectId: "my-diploma-2c74f",
  storageBucket: "my-diploma-2c74f.appspot.com",
  messagingSenderId: "631855108110",
  appId: "1:631855108110:web:80b08222a3d1ce01df6c5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);