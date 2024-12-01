// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBi2IqXSZHKsStHFPNqAlXoABAnduv6kMk",
  authDomain: "royalbrotherstask.firebaseapp.com",
  projectId: "royalbrotherstask",
  storageBucket: "royalbrotherstask.firebasestorage.app",
  messagingSenderId: "129640260697",
  appId: "1:129640260697:web:9bef91e25bd8c3e872fd48",
  measurementId: "G-H06TSX76XW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth  = getAuth(app)

export {app,auth}