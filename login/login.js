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

  const btnLogin = document.getElementById('btnLogin');

  // add register event
  btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const password = txtPassword.value;

    // Login
    var promise = auth.signInWithEmailAndPassword(email, password);
    promise
    .then(user => {
      console.log(user);
      //alert('Accesso effettuato con successo.');
			window.location.href = '../homepage/index.html'
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/wrong-password') {
        alert('La password non è corretta.');
      } else if (errorCode == 'auth/weak-password') {
        alert('La password è troppo corta.');
      } else if(errorCode == 'auth/invalid-email') {
        alert('La mail non è valida.');
      } else if(errorCode == 'auth/operation-not-allowed') {
        alert('Operazione non consentita.');
      } else {
        console.log(erroreMessage);
      }
    });
  });

// button forgotten password
	$('#btnForgot').click(function() {
		sendPasswordReset();
	});

	// send password reset
	function sendPasswordReset() {
			var email = document.getElementById('txtEmail').value;

			if(email == "") {
				alert('Inserisci un indirizzo mail a cui inviare la procedura di recupero password.');
			} else {
				firebase.auth().sendPasswordResetEmail(email)
				.then(function() {
					// Password Reset Email Sent!
					alert('Una mail di recupero password è stata inviata al tuo indirizzo.');
				}).catch(function(error) {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					if (errorCode == 'auth/invalid-email') {
						alert('Indirizzo mail non valido.');
					} else if (errorCode == 'auth/user-not-found') {
						alert(errorMessage);
					}
					console.log(error);
				});
			}
	}

	// button Facebook sign in
    $('#btnFacebook').click(function() {
      signInWithFacebook();
    });

  // faceboook sign-in
  function signInWithFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
			window.location.href = '../homepage/index.html'

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  // button sign in Google
  	$('#btnGoogle').click(function() {
  		signInWithGoogle();
  	});

    // google sign-in
    function signInWithGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();
      // sign in with google
        firebase.auth().signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log('User: ' + user);
					window.location.href = '../homepage/index.html'
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          console.log(errorCode);
      });
    }

		// button sign in Google
			$('#btnLogout').click(function() {
				signOut();
			});

			//sign out
		function signOut() {
			firebase.auth().signOut().then(function() {
				window.location.href = '../login/index.html'
  			// Sign-out successful.
			}).catch(function(error) {
  			// An error happened.
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
