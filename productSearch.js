import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getFirestore, collection, getDocs, query, where, doc, updateDoc, getDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
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
      <button class="delete-btn" data-id="${doc.id}">Delete</button>
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
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const productId = event.target.getAttribute('data-id');
      deleteProduct(productId);
    });
  });
}
async function deleteProduct(productId) {
  const productDocRef = doc(productRef, productId);
  await deleteDoc(productDocRef);
  alert('Product deleted successfully!');
  displayProducts();
}

// search products
async function searchProducts(searchInput) {
  const q = query(productRef, where('name', '>=', searchInput), where('name', '<=', searchInput + '\uf8ff'));
  const querySnapshot = await getDocs(q);
  const productList = [];
  querySnapshot.forEach((doc) => {
    productList.push(doc.data());
  });
  return productList;
}

document.getElementById('search-btn').addEventListener('click', async () => {
  const searchInput = document.getElementById('search-input').value.trim();
  const productList = await searchProducts(searchInput);
  displaySearchResults(productList);
});

function displaySearchResults(productList) {
  const searchResults = document.getElementById('search-results');
  searchResults.innerHTML = ''; // Clear previous results
  productList.forEach((productData) => {
    const productDiv = document.createElement('div');
    productDiv.innerHTML = `
      <p><strong>Name:</strong> ${productData.name}</p>
      <p><strong>Product Type:</strong> ${productData.productType}</p>
      <p><strong>Color:</strong> ${productData.color}</p>
      <p><strong>Price:</strong> ${productData.price}</p>
      <p><strong>Stock Amount:</strong> ${productData.stockAmount}</p>
      <hr>
    `;
    searchResults.appendChild(productDiv);
  });
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
    
    // Display message
    alert('Product updated successfully!');
    // Refresh the product list
    displayProducts();
  } else {
    console.error('Product not found.');
  }
}

async function getTotalStockAmount() {
  const querySnapshot = await getDocs(productRef);
  let totalStockAmount = 0;

  querySnapshot.forEach((doc) => {
    totalStockAmount += doc.data().stockAmount;
  });

  // Update the element with id 'total_stock_amount' with the total stock amount
  document.getElementById('total_stock_amount').innerHTML = totalStockAmount;

  return totalStockAmount;
}

getTotalStockAmount().then((totalStockAmount) => {
  console.log('Total Stock Amount:', totalStockAmount);
});

document.addEventListener('DOMContentLoaded', function() {
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
        const userRef = doc(db, 'Users', user.uid);
        getDoc(userRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    if (userData.role !== 'admin') {
                        // If the user is not an admin, hide the "Add Product" link
                        const addProductListItem = document.getElementById('addProductListItem');
                        addProductListItem.style.display = 'none';
                    }
                }
            })
            .catch((error) => {
                console.error(`Error getting user data: ${error}`);
            });
    }
});
  displayProducts();
});

// Export the searchProducts 
export { searchProducts };
