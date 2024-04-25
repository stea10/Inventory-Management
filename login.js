import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js';

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

function login(email, password) {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                if (userCredential.user) {
                    const userRef = doc(db, 'Users', userCredential.user.uid);
                    getDoc(userRef).then((docSnap) => {
                        if (docSnap.exists()) {
                            const userData = docSnap.data();
                            // Store user role in session storage
                            sessionStorage.setItem('userRole', userData.role);
                            resolve("true:Login Successful");
                        } else {
                            reject("User data does not exist in Firestore.");
                        }
                    }).catch((error) => {
                        reject(`Error getting user data: ${error.message}`);
                    });
                } else {
                    reject("Login failed: No user credential returned.");
                }
            })
            .catch((error) => {
                reject(`Login failed: ${error.message}`);
            });
    });
}


const loginForm = document.getElementById('loginForm');
const registerButton = document.getElementById('registerButton');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const message = await login(email, password);
        console.log(message);
        if (message.startsWith("true:")) {
            // If login is successful, redirect to home page
            window.location.href = 'dashboard.html';
        } else {
            // If login fails, display an error message
            alert(message.substring(6));
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred during login.');
    }
});

registerButton.addEventListener('click', (event) => {
    window.location.href = 'register.html';
});
