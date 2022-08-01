let firebaseConfig = {
  apiKey: "AIzaSyCJbn4L8NyDgW3gAWYv4wKRwF1QGaqooDc",
  authDomain: "blog-test-ac3a4.firebaseapp.com",
  projectId: "blog-test-ac3a4",
  storageBucket: "blog-test-ac3a4.appspot.com",
  messagingSenderId: "1054406605191",
  appId: "1:1054406605191:web:a9913587251309a6c5bb22",
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
