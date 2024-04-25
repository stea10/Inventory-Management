
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

// Function to get total stock amount
async function getTotalStockAmount() {
  const productsRef = db.collection('All Products');
  const snapshot = await productsRef.get();
  let totalStockAmount = 0;
  snapshot.forEach(doc => {
    totalStockAmount += doc.data().stockAmount;
  });
  return totalStockAmount;
}

// Display achievements and item count
async function displayAchievements() {
    const achievements = await getAchievements();
    const itemCount = await countItems();
    const totalStockAmount = await getTotalStockAmount();
  
    // Display achievements
    const achievementsList = document.getElementById('achievements-list');
  
    achievements.forEach((achievement, index) => {
        const { Name, Description, Goal } = achievement;
        let progress, progressText;
        
        if (index === 0) {
            // First achievement
            progress = Math.min((itemCount / Goal) * 100, 100);
            progressText = itemCount >= Goal ? 'Completed' : `${itemCount}/${Goal}`;
        } else if (index === 1) {
            // Second achievement
            progress = Math.min((totalStockAmount / Goal) * 100, 100);
            progressText = totalStockAmount >= Goal ? 'Completed' : `${totalStockAmount}/${Goal}`;
        }
    
        const achievementDiv = document.createElement('div');
        achievementDiv.innerHTML = `
            <h2>${Name}</h2>
            <p>${Description}</p>
            <div class="progress-bar">
                <div class="progress-bar-inner" style="width: ${progress}%; max-width: 200px;"></div>
            </div>
            <p>${progressText}</p>
        `;
        achievementsList.appendChild(achievementDiv);
    });
}
async function getAchievements() {
    const achievementsRef = db.collection('Achievements');
    const snapshot = await achievementsRef.get();
    const achievements = [];
    snapshot.forEach(doc => {
      achievements.push(doc.data());
    });
    return achievements;
  }
  async function countItems() {
    const productsRef = db.collection('All Products');
    const snapshot = await productsRef.get();
    return snapshot.size; // Number of items in the collection
  }

// Call displayAchievements when the page loads
document.addEventListener('DOMContentLoaded', () => {
  displayAchievements();
});
