import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getFirestore, collection, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js';


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

// Reference to Firestore database
const db = getFirestore(app);
const productRef = collection(db, 'All Products');

// Function to fetch and display products
async function displayProducts() {
  const querySnapshot = await getDocs(productRef);
  const productList = document.getElementById('product_list');
  if (!productList) {
    console.error('Product list element not found.');
    return;
  }
  productList.innerHTML = ''; // Clear previous products
  querySnapshot.forEach((doc) => {
    const productDiv = document.createElement('div');
    productDiv.innerHTML = `
      <p><strong>Name:</strong> ${doc.data().name}</p>
      <p><strong>Product Type:</strong> ${doc.data().productType}</p>
      <p><strong>Color:</strong> ${doc.data().color}</p>
      <p><strong>Price:</strong> ${doc.data().price}</p>
      <p><strong>Stock Amount:</strong> ${doc.data().stockAmount}</p>
      <hr>
    `;
    productList.appendChild(productDiv);
  });
}

// Function to search products
async function searchProducts() {
  const searchInput = document.getElementById('search-input').value.trim();
  const q = query(productRef, where('name', '>=', searchInput), where('name', '<=', searchInput + '\uf8ff'));
  const querySnapshot = await getDocs(q);
  displayProducts(querySnapshot);
}

// Add event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  // Call displayProducts to fetch and display products
  displayProducts();
});

// Export the searchProducts function to make it accessible in the HTML file
export { searchProducts };
