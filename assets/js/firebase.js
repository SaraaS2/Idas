// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
//import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyA-puQK16VJnvn_qQAozzvyh2pKhkr_aiY",
  authDomain: "idas-54ac4.firebaseapp.com",
  projectId: "idas-54ac4",
  storageBucket: "idas-54ac4.appspot.com",
  messagingSenderId: "942140932496",
  appId: "1:942140932496:web:59628e9757e7df1f7fb315",
  measurementId: "G-7VLME4005R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app, auth}