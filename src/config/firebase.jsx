// firebase.jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {
    apiKey: "AIzaSyA5G7ekAEpcEfpitBl4H_9zAe97MALjlxw",
    authDomain: "fir-practice-813e9.firebaseapp.com",
    projectId: "fir-practice-813e9",
    storageBucket: "fir-practice-813e9.appspot.com",
    messagingSenderId: "846716209043",
    appId: "1:846716209043:web:9b953bed7b034fd4510a66",
    measurementId: "G-G6VSEY126N"
  };
  

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
const Auth = getAuth(app); 
const db = getFirestore(app);

export { app, Auth, analytics, db }; 
