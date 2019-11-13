var firebaseConfig = {
    apiKey: "AIzaSyC61KgtFq7wpY6YZpzLpMrgVeVPeVXPrU8",
    authDomain: "character-generator-3420c.firebaseapp.com",
    databaseURL: "https://character-generator-3420c.firebaseio.com",
    projectId: "character-generator-3420c",
    storageBucket: "character-generator-3420c.appspot.com",
    messagingSenderId: "853614400708",
    appId: "1:853614400708:web:bf200c85828f58e6f76591"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



document.querySelector('.btn-login').addEventListener('click', function (e) {
    e.preventDefault();

    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, password);
    promise
        .then((response) => {
            console.log(response);
            localStorage.setItem('loggedIn', email);
            window.location.replace('index.html')

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
})

// sign up
document.querySelector('.btn-signup').addEventListener('click', function (e) {
    e.preventDefault();
    let email = document.getElementById('signup-email').value;
    let password = document.getElementById('signup-password').value;
    
    const promise = firebase.auth().createUserWithEmailAndPassword(email, password);
    promise
        .then((response) => {
            console.log(response);
            localStorage.setItem('loggedIn', email);
            window.location.replace('index.html')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
})