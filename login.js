import app from backend.js;

const auth = getAuth(app);


firebase.auth().createUserWithEmailAndPassword(email,password)
.then((UserCredential) => {
    var user = UserCredential.user;
}).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
});

firebase.auth().signInWithEmailAndPassword(email,password)
.then((UserCredential) => {
    var user = UserCredential.user;
}).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
});