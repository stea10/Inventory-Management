
const logoutButton = document.getElementById('logout_button');

if (!logoutButton) {
  console.error('Logout button not found.');
  return;
}

// Add an event listener to the logout button
logoutButton.addEventListener('click', async () => {
  try {
    // Sign out the user
    await auth.signOut();
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out:', error);
  }
});

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
const db = firebase.firestore();

async function getTotalInventoryAmount() {
    const productsRef = db.collection('All Products');
    const snapshot = await productsRef.get();
    let totalInventoryAmount = 0;
    snapshot.forEach(doc => {
        totalInventoryAmount += doc.data().stockAmount;
    });
    return totalInventoryAmount;
}

// Update total inventory 
async function updateTotalInventory() {
    const totalInventoryElement = document.getElementById('total-inventory');
    const totalInventoryAmount = await getTotalInventoryAmount();
    totalInventoryElement.textContent = totalInventoryAmount.toString(); // Display the total inventory amount
}

// Call updateTotalInventory when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateTotalInventory();
});

async function displayLowestStockItems() {
    const productsRef = db.collection('All Products');
    const snapshot = await productsRef.where('stockAmount', '<=', 20).get();

    const lowestStockItemsList = document.getElementById('lowest-stock-items-list');
    lowestStockItemsList.innerHTML = ''; // Clear previous items

    snapshot.forEach(doc => {
        const data = doc.data();
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <p>${data.name} - Stock: ${data.stockAmount}</p>
        `;
        lowestStockItemsList.appendChild(itemDiv);
    });
}

// Call displayLowestStockItems when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayLowestStockItems();
});

const salesData = [
    { month: 'Jan', sales: 1000 },
    { month: 'Feb', sales: 1200 },
    { month: 'Mar', sales: 800 },
    { month: 'Apr', sales: 1500 },
    { month: 'May', sales: 1100 },
    { month: 'Jun', sales: 1400 },
    { month: 'Jul', sales: 900 },
    { month: 'Aug', sales: 1300 },
    { month: 'Sep', sales: 1000 },
    { month: 'Oct', sales: 1200 },
    { month: 'Nov', sales: 1100 },
    { month: 'Dec', sales: 1600 }
];

function createSalesChart(salesData) {
    const months = salesData.map(item => item.month);
    const sales = salesData.map(item => item.sales);

    const ctx = document.getElementById('sales-chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Sales',
                data: sales,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    createSalesChart(salesData);
});

