import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCSehvFqUIcFtNeW7XoBAcG9m6VL0i28Sc",
  authDomain: "umma-gate.firebaseapp.com",
  projectId: "umma-gate",
  storageBucket: "umma-gate.appspot.com",
  messagingSenderId: "682515773781",
  appId: "1:682515773781:web:08f957d30db9cd678fd7dc",
  measurementId: "G-67ZZ21XM7M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
