import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDKJcKkA6yD0VH5wTLi2SnGGn4X01VMMUE",
  authDomain: "productmanagement-56c0a.firebaseapp.com",
  databaseURL: "https://productmanagement-56c0a-default-rtdb.firebaseio.com",
  projectId: "productmanagement-56c0a",
  storageBucket: "productmanagement-56c0a.appspot.com",
  messagingSenderId: "682658474182",
  appId: "1:682658474182:web:6301f4b9cbfb9bcb054fc7",
  measurementId: "G-7ZJLZH9C0P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };