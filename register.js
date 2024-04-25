import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js';
import { doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js';

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function signUp(name, email, password, role) {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                if (userCredential.user) {
                    const userData = {
                        uid: userCredential.user.uid,
                        name: name,
                        password: password,
                        role: role
                    };
                    // Add user data to Firestore database
                    const userRef = doc(db, 'Users', userCredential.user.uid);
                    setDoc(userRef, userData)
                        .then(() => {
                            resolve("true:Register Successful");
                        })
                        .catch((error) => {
                            reject(`Error setting user data: ${error.message}`);
                        });
                } else {
                    reject("Registration failed: No user credential returned.");
                }
            })
            .catch((error) => {
                reject(`Registration failed: ${error.message}`);
            });
    });
}


document.addEventListener('DOMContentLoaded', (event) => {
    const registerForm = document.getElementById('registerForm');
    const backButton = document.getElementById('backButton');
    
    registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
        const name = document.getElementById('newname').value;
        const email = document.getElementById('newemail').value;
        const password = document.getElementById('newpassword').value;
        const role = document.querySelector('input[name="role"]:checked').value; 
        try {
            const message = await signUp(name, email, password, role);
            console.log(message);
            if (message.startsWith("true:")) {
                // If registration is successful, redirect to login page
                window.location.href = 'login_page.html';
            } else {
                // If registration fails, display an error message
                alert(message.substring(6));
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred during registration.');
        }
    });

    backButton.addEventListener('click', (event) => {
        window.location.href = 'login_page.html';
    });
});