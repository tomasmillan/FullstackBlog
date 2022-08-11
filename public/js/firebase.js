import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
  setDoc,
  doc,
  query,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

const app = initializeApp({
  apiKey: "AIzaSyCJbn4L8NyDgW3gAWYv4wKRwF1QGaqooDc",
  authDomain: "blog-test-ac3a4.firebaseapp.com",
  projectId: "blog-test-ac3a4",
  storageBucket: "blog-test-ac3a4.appspot.com",
  messagingSenderId: "1054406605191",
  appId: "1:1054406605191:web:a9913587251309a6c5bb22",
});
const db = getFirestore(app);

export const saveData = (docName, title, article, bannerImage, publishedAt) =>
  addDoc(collection(db, "blogs"), {
    title: title,
    article: article,
    bannerImage: bannerImage,
    publishedAt: publishedAt,
  });

export { db, collection, getDocs, addDoc, setDoc, doc, query };
