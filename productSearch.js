import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getFirestore, collection, getDocs, query, where, doc, updateDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js';

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
      <button class="update-btn" data-id="${doc.id}">Update</button>
      <hr>
    `;
    productList.appendChild(productDiv);
  });

  // Add event listeners to update buttons
  const updateButtons = document.querySelectorAll('.update-btn');
  updateButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const productId = event.target.getAttribute('data-id');
      updateProduct(productId);
    });
  });
}

// Function to search products
async function searchProducts() {
  const searchInput = document.getElementById('search-input').value.trim();
  const q = query(productRef, where('name', '>=', searchInput), where('name', '<=', searchInput + '\uf8ff'));
  const querySnapshot = await getDocs(q);
  displayProducts(querySnapshot);
}

async function updateProduct(productId) {
  const productDocRef = doc(productRef, productId);
  const productDocSnapshot = await getDoc(productDocRef);
  if (productDocSnapshot.exists()) {
    const productData = productDocSnapshot.data();
    // Prompt the user for updated product information
    const updatedName = prompt('Enter updated name:', productData.name);
    const updatedProductType = prompt('Enter updated product type:', productData.productType);
    const updatedColor = prompt('Enter updated color:', productData.color);
    const updatedPrice = parseFloat(prompt('Enter updated price:', productData.price));
    const updatedStockAmount = parseInt(prompt('Enter updated stock amount:', productData.stockAmount));
    
    // Update the product document in Firestore
    await updateDoc(productDocRef, {
      name: updatedName,
      productType: updatedProductType,
      color: updatedColor,
      price: updatedPrice,
      stockAmount: updatedStockAmount
    });
    
    // Display a success message
    alert('Product updated successfully!');
    // Refresh the product list to reflect the changes
    displayProducts();
  } else {
    console.error('Product not found.');
  }
}

// Add event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  // Call displayProducts to fetch and display products
  displayProducts();
});

// Export the searchProducts function to make it accessible in the HTML file
export { searchProducts };
