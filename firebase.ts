// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVais7jaonRfK2gxUQTK2ZXJZY9vV4p9o",
  authDomain: "worknest-ab51f.firebaseapp.com",
  projectId: "worknest-ab51f",
  storageBucket: "worknest-ab51f.firebasestorage.app",
  messagingSenderId: "397017398808",
  appId: "1:397017398808:web:987a9847207d2b56750d6d"
};

// Initialize Firebase
const app = getApps().length == 0 ?  initializeApp(firebaseConfig): getApp();

const db = getFirestore(app)

export {db}