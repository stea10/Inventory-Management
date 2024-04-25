const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', (event) => {
    event.preventDefault();
    signOut(auth)
        .then(() => {
            // Sign-out successful, redirect to login page
            window.location.href = 'login.html';
        })
        .catch((error) => {
            // An error occurred during sign out
            console.error(error);
            alert('An error occurred during sign out.');
        });
});

