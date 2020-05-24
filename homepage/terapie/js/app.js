(function () {

	// Your web app's Firebase configuration
	const firebaseConfig = {
		apiKey: "AIzaSyClafsr8fB5tEZwzxiEov5txceRSkwMnhc",
		authDomain: "amico-avkdjm.firebaseapp.com",
		databaseURL: "https://amico-avkdjm.firebaseio.com",
		projectId: "amico-avkdjm",
		storageBucket: "amico-avkdjm.appspot.com",
		messagingSenderId: "867742373128",
		appId: "1:867742373128:web:b3abf9e35897a3205508bd"
	};

	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);

	// Get element
	const txtEmail = document.getElementById('txtEmail');
	const txtPassword = document.getElementById('txtPassword');
	const btnLogin = document.getElementById('btnLogin');

	//Login event for button
	btnLogin.addEventListener('click', e => {

		//Get fields
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();

		//Login
		const promise = auth.signInWithEmailAndPassword(email, pass);
		promise.catch(e => console.log(e.message));

	});

	console.log('test');

	// Add realtime login listener
	firebase.auth().onAuthStateChanged (firebaseUser => {
		if (firebaseUser) {
			console.log(firebaseUser);
		} else {
			console.log('not logged in');
		}
	});

}());