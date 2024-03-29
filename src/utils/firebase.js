// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAinf_v624yokYXhBLyTc60sB94hN3Hatw",
  authDomain: "netflixgpt-f5c7f.firebaseapp.com",
  projectId: "netflixgpt-f5c7f",
  storageBucket: "netflixgpt-f5c7f.appspot.com",
  messagingSenderId: "68912713360",
  appId: "1:68912713360:web:5ebffb6424bca9b5de5215",
  measurementId: "G-SX8DRCCC7E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
