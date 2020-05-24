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

// storageService is a reference to firebase storage service
const storageService = firebase.storage();
//storageRef is a reference to your actual instantiation of that service
const storageRef = storageService.ref();

// gets triggered any time someone selects a new file via the upload via the Choose File upload button
document.querySelector('.file-select').addEventListener('change', handleFileUploadChange);

document.querySelector('.file-submit').addEventListener('click', handleFileUploadSubmit);

// variable selectedFile will keep track of whatever file a user has input via the Choose File button.
let selectedFile;
function handleFileUploadChange(e) {
  selectedFile = e.target.files[0];
}

// manage the submission
function handleFileUploadSubmit(e) {
  //create a child directory called images, and place the file inside this directory
  const uploadTask = storageRef.child(`imagesFaceQuiz/${selectedFile.name}`).put(selectedFile);
  uploadTask.on('state_changed', (snapshot) => {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Caricamento ' + progress + '%');
    //const mediaUrl = selectedFile.databaseURL;

    switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Caricamento in pausa.');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Caricamento in corso..');
      break;
    }
  // Observe state change events such as progress, pause, and resume
  }, (error) => {
    // Handle unsuccessful uploads
    console.log(error);
  }, function() {
     // Do something once upload is complete
     uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
     console.log('File disponibile all\' indirizzo: ', downloadURL);
     document.write('Immagine caricata.');
    });
  });
}
