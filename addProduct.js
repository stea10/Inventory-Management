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

  firebase.initializeApp(firebaseConfig);

// Reference to Firestore database
const db = firebase.firestore();

// Get a reference to the form
const form = document.getElementById('product-form');

// Add an event listener for the form submission
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission
  
  // Get the values entered by the user
const productType = form['product-type'].value;
const color = form['color'].value;
const name = form['name'].value;
const price = parseFloat(form['price'].value); // Parse price as float
const stockAmount = parseInt(form['stock-amount'].value); // Parse stock amount as integer
const supplier = form['supplier'].value;
let newProductRef = db.collection('Product').doc(productType).collection('Items').doc();

  newProductRef.set({
    name: name,
    color: color,
    price: price,
    stockAmount: stockAmount,
    supplier : supplier
  })
  .then(() => {
    console.log('Product added with ID: ', newProductRef.id);
    alert('Product added successfully!');
    form.reset();

    // Add the product ID to the supplier document
    db.collection('Supplier').doc(supplier).set({ [newProductRef.id]: true }, { merge: true })
      .then(() => {
        console.log('Supplier updated with product ID: ', newProductRef.id);

        // Delete the dummy field
        db.collection('Product').doc(productType).update({ dummyField: firebase.firestore.FieldValue.delete() })
          .then(() => {
            console.log('Dummy field deleted');
          })
          .catch((error) => {
            console.error('Error deleting dummy field: ', error);
          });
      })
      .catch((error) => {
        console.error('Error updating supplier: ', error);
      });
  })
  .catch((error) => {
    console.error('Error adding product: ', error);
  });
});