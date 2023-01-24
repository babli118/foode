import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBb9aHpe0wCLaxtT8X4TeYLYS8BrqtU5-0",
  authDomain: "food-ordering-11bcb.firebaseapp.com",
  projectId: "food-ordering-11bcb",
  storageBucket: "food-ordering-11bcb.appspot.com",
  messagingSenderId: "383165630416",
  appId: "1:383165630416:web:b7aa24f2a4b958cc2b5bd5",
  measurementId: "G-JXNRCP6KMM",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
  return app;
};
export const auth = getAuth(app);
export const db = getFirestore(app);
