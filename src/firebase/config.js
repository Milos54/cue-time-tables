import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAH7bFfS9ATNE2Zxl8QQcFINZsSijrICM",
  authDomain: "tracker-eea45.firebaseapp.com",
  projectId: "tracker-eea45",
  storageBucket: "tracker-eea45.firebasestorage.app",
  messagingSenderId: "1096115609950",
  appId: "1:1096115609950:web:9c63609753ccafd5a36fcf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//init firestore
const db = getFirestore(app);

//init auth
const auth = getAuth(app);

//init storage
const storage = getStorage(app);

//timestamp
const timestamp = Timestamp;

export { db, auth, storage, timestamp };
