// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {getDatabase} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import {getStorage} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";
//import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyA-puQK16VJnvn_qQAozzvyh2pKhkr_aiY",
  authDomain: "idas-54ac4.firebaseapp.com",
  projectId: "idas-54ac4",
  storageBucket: "idas-54ac4.appspot.com",
  messagingSenderId: "942140932496",
  appId: "1:942140932496:web:59628e9757e7df1f7fb315",
  measurementId: "G-7VLME4005R",
  databaseURL: "https://idas-54ac4-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const database = getDatabase(app)
const storage = getStorage(app)

export {app, auth, database, storage}