async function displayCartItems() {
  const user = auth.currentUser;
  if (!user) {
    console.error('User not signed in');
    return;
  }

  // Get a reference to the user's cart
  const cartRef = doc(db, 'Cart', user.uid, 'items');

  // Get the cart items
  const cartSnap = await getDocs(collection(cartRef));

  const cartList = document.querySelector('.order_list');
    if (!cartList) {
    console.error('Cart list element not found.');
    return;
  }
  cartList.innerHTML = '';

  // Get the product data for each cart item and display it
  for (const cartItem of cartSnap.docs) {
    const productId = cartItem.id;
    const productRef = doc(db, 'All Products', productId);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      const productData = productSnap.data();
      const productDiv = document.createElement('div');
      productDiv.innerHTML = `
        <p><strong>Product ID:</strong> ${productId}</p>
        <p><strong>Quantity:</strong> ${cartItem.data().quantity}</p>
        <p><strong>Name:</strong> ${productData.name}</p>
        <p><strong>Product Type:</strong> ${productData.productType}</p>
        <p><strong>Color:</strong> ${productData.color}</p>
        <p><strong>Price:</strong> ${productData.price}</p>
        <p><strong>Stock Amount:</strong> ${productData.stockAmount}</p>
      `;
      cartList.appendChild(productDiv);
    }
  }
}

displayCartItems();