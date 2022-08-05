import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";
import "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore-compat.js";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCJbn4L8NyDgW3gAWYv4wKRwF1QGaqooDc",
  authDomain: "blog-test-ac3a4.firebaseapp.com",
  projectId: "blog-test-ac3a4",
  storageBucket: "blog-test-ac3a4.appspot.com",
  messagingSenderId: "1054406605191",
  appId: "1:1054406605191:web:a9913587251309a6c5bb22",
});

const app = initializeApp(firebaseApp);
const db = getFirestore(app);
export { db };
