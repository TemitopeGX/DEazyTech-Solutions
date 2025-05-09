import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDS74fIJwMjqgLE0yeTUCTcwoD-rPvLWdU",
  authDomain: "deazytech-solution.firebaseapp.com",
  projectId: "deazytech-solution",
  storageBucket: "deazytech-solution.firebasestorage.app",
  messagingSenderId: "595595028485",
  appId: "1:595595028485:web:f624f0baede6ee1f01146c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };

export default app;
