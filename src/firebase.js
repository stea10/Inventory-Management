import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

function fireBase(){
const firebaseConfig = {

      apiKey: "AIzaSyDKJcKkA6yD0VH5wTLi2SnGGn4X01VMMUE",
    
      authDomain: "productmanagement-56c0a.firebaseapp.com",
    
      projectId: "productmanagement-56c0a",
    
      storageBucket: "productmanagement-56c0a.appspot.com",
    
      messagingSenderId: "682658474182",
    
      appId: "1:682658474182:web:6301f4b9cbfb9bcb054fc7",
    
      measurementId: "G-7ZJLZH9C0P"
    
    };
  

  // Initialize Firebase

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  return db;
}

const db = fireBase();
export { db };