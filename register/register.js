$(document).ready(function() {
  // Your web app's Firebase configuration
  const config = {
    apiKey: "AIzaSyClafsr8fB5tEZwzxiEov5txceRSkwMnhc",
    authDomain: "amico-avkdjm.firebaseapp.com",
    databaseURL: "https://amico-avkdjm.firebaseio.com",
    projectId: "amico-avkdjm",
    storageBucket: "amico-avkdjm.appspot.com",
    messagingSenderId: "867742373128",
    appId: "1:867742373128:web:b3abf9e35897a3205508bd"
  };

  firebase.initializeApp(config);

  var auth = firebase.auth();

  // get elements
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const txtRepeatPassword = document.getElementById('txtRepeatPassword');
  const btnRegister = document.getElementById('btnRegister');

  // add register event
  btnRegister.addEventListener('click', e => {
    const email = txtEmail.value;
    const password = txtPassword.value;
    const repeatPassword = txtRepeatPassword.value;

    if (password != repeatPassword) {
      alert('Le password non corrispondono.');
      return;
    }

    //register
    var promise = auth.createUserWithEmailAndPassword(email, password);
    promise
    .then(user => {
      console.log(user);
      //alert('Registrazione effettuata con successo.')
      sendEmailVerification();
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('La password è troppo corta.');
      } else if (errorCode == 'auth/email-already-in-use') {
        alert('La mail è già esistente.');
      } else if(errorCode == 'auth/invalid-email') {
        alert('La mail non è valida.');
      } else if(errorCode == 'auth/operation-not-allowed') {
        alert('Operazione non consentita.');
      } else {
        console.log(erroreMessage);
      }
    });
  });

  // send email verification
  function sendEmailVerification() {
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        alert('Una mail di verifica è stata inviata al tuo indirizzo.');
      });
  }

  auth.onAuthStateChanged(function(user) {
    if(user) {
      var email = user.email;
      var emailVerified = user.emailVerified;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log('Email: ' + email + ' Email Verified: ' + emailVerified + ' Uid: ' + uid + ' Provider: ' + providerData);
    } else {
      console.log('No user.');
    }
  });
});
