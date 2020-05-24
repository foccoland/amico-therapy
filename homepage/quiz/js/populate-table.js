
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

const db = firebase.database();

// storageService is a reference to firebase storage service
const storageService = firebase.storage();
//storageRef is a reference to your actual instantiation of that service
const storageRef = storageService.ref();

//********************* jQuery *************************

var switched = false;
var loaded = false;

var contentLoaded = false;

var gEsercizi;

$(document).ready(function() {

  let eserciziPath = db.ref('esercizi');
  eserciziPath.on('value', snapshot => {
    if (contentLoaded === false) {
      contentLoaded = true;
      if (snapshot != null) {

        //JSON Esercizi completo
        let esercizi = snapshot.val();
        gEsercizi = esercizi;

        //Categorie
        let categorie = Object.keys(esercizi);

        categorie.forEach(categoria => {
          const objCategoria = _.get(esercizi, categoria);

          if (objCategoria != null) {

            //Prendo i titoli dei quiz
            const titoli = Object.keys(objCategoria);

            titoli.forEach((titolo) => {
              console.log(titolo);
              var tabelle = "";
              //Genero tabelle per ogni quiz/titolo aggiunto
              tabelle = tabelle.concat("<div style=\"margin-top: 50px\" class=\"table-responsive\" id=\"" + titolo + "\">" +
              "<div id=\"titolo\" style=\"margin: 0 auto; display: center; width: 300px;\" class=\"row center titoloQuiz\">" +
              "<p class=\"center\" id=\"" + titolo + "\"  style=\"font-size: 30px; margin-bottom: 20px;\">" + loadTitolo(titolo) + "</p>" +
              "</div>" +
              "<div style=\"display: flex; justify-content: center;\" id=\"titolo\" class=\"flexrow titoloQuiz\">" +
              "<button class=\"btn btn-sm btn-info btn-eliminaTitolo\" id=\"btnDeleteTitolo" + titolo + "of" + categoria + "\" type=\"button\" name=\"eliminaTitolo\"><i class=\"fas fa-trash\"></i> Elimina quiz</button>" +
              "</div>" +
              "</div>");

              if(categoria === "storie") {
                let storiaArea = _.get(esercizi, categoria + "." + titolo + ".testo");

                var storyArea = "<div class=\"flexrow\" id=\"storiaflex\" style\"margin: 0 auto; width: 50%;\"><textarea id=\"" + titolo + "TxtArea\" name=\"storiaArea\" rows=\"10\" cols=\"100\">" + storiaArea + "</textarea>";
                var editButton = "<button id=\"" + titolo + "BtnEditTextArea\" class=\"btn btn-info\" type=\"button\" name=\"areaButton\"><i class=\"fas fa-edit\"></i> Modifica testo</button></div>";
                tabelle = tabelle.concat(storyArea);
                tabelle = tabelle.concat(editButton);
              }

              //Header e corpo tabella
              var headerAndTable = "";
              headerAndTable = headerAndTable.concat("<table id=\"" + titolo + "Table" + "\" class=\"table table-bordered\" width=\"100%\" cellspacing=\"0\">");
              headerAndTable = headerAndTable.concat("<thead>");
              headerAndTable = headerAndTable.concat("<tr>");
              headerAndTable = headerAndTable.concat("<th>Domanda</th>");

              //Differenziazione nome colonna per terapie motorie
              if (categoria !== "terapieMotorie") {
                if (categoria !== "storie") {
                  headerAndTable = headerAndTable.concat("<th>Media</th>");
                }
                headerAndTable = headerAndTable.concat("<th>Risposta Corretta</th>");
                headerAndTable = headerAndTable.concat("<th>Risposta Sbagliata 1</th>");
                headerAndTable = headerAndTable.concat("<th>Risposta Sbagliata 2</th>");
              } else {
                headerAndTable = headerAndTable.concat("<th>Media</th>");
                headerAndTable = headerAndTable.concat("<th>Frase es. riuscito</th>");
                headerAndTable = headerAndTable.concat("<th>Frase es. non riuscito</th>");
              }

              headerAndTable = headerAndTable.concat("<th>Modifica</th>");
              headerAndTable = headerAndTable.concat("</tr>");
              headerAndTable = headerAndTable.concat("</thead>");
              headerAndTable = headerAndTable.concat("<tbody>");
              headerAndTable = headerAndTable.concat("</tbody>");
              headerAndTable = headerAndTable.concat("</table>");

              tabelle = tabelle.concat(headerAndTable);

              //Append() al div
              $('div#' + categoria).append(tabelle);

              //Array delle domande
              let domande = _.get(objCategoria, titolo + ".domande");

              domande.forEach((elemDomanda, i) => {
                // Dati singolo elemento-domanda
                let question = elemDomanda.domanda;
                let media = elemDomanda.media;
                let correctAnswer = elemDomanda.rispostaCorretta;
                let arrWrongAnswers = elemDomanda.risposteSbagliate;
                let domandaID = elemDomanda.id;

                //Inizializzazione riga
                var tr = "";

                // Genero id per modifica dati Riga
                let rowID = i + "of" + titolo + "of" + categoria;
                //Riga HTML dati domanda
                tr = tr.concat("<tr");
                tr = tr.concat(" id=\"" + rowID + "\">");
                tr = tr.concat("<td class=\"domanda\" id=" + rowID + ">" + question + "</td>");
                tr = tr.concat();
                if (categoria !== "storie") {
                  if (categoria === "musica") {
                    tr = tr.concat("<td style=\"font-size: 12px;\" class=\"media\" id=" + rowID + ">" +
                    "<div class=\"container_row\">");
                    if (typeof media != 'undefined') {
                      tr = tr.concat("<div class=\"row\"><a id=\"" + rowID + "\" href=\"" + media + "\">Anteprima</a></div>");
                    }
                    tr = tr.concat("<div class=\"row\"><input id=\"" + rowID + "\" class=\"file-select\" type=\"file\" accept = \".mp3\"/></div>");
                    tr = tr.concat("<div class=\"row\"><img class=\"loading\" id=\"" + rowID + "\" src=\"../images/pulse.gif\" alt=\"Caricamento, attendere...\" style=\"width:30px;height:30px;\"></div>");
                  } else {
                    tr = tr.concat("<td style=\"font-size: 12px;\" class=\"media\" id=" + rowID + ">" +
                    "<div class=\"container_row\">");
                    console.log(media);
                    if (typeof media != 'undefined') {
                      tr = tr.concat("<div class=\"row\"><a id=\"" + rowID + "\" href=\"" + media + "\">Anteprima</a></div>");
                    }
                    tr = tr.concat("<div class=\"row\"><input id=\"" + rowID + "\" class=\"file-select\" type=\"file\" accept = \"image/*\"/></div>");
                    tr = tr.concat("<div class=\"row\"><img class=\"loading\" id=\"" + rowID + "\" src=\"../images/pulse.gif\" alt=\"Caricamento, attendere...\" style=\"width:30px;height:30px;\"></div>");
                  }
                }
                tr = tr.concat("<div class=\"row\"><button class=\"btn btn-sm btn-info file-submit\" id=\"" + rowID + "\" style=\"visibility: hidden\"><i class=\"fas fa-file-upload fa-sm\"></i> Carica file</button></div>" +
                "</div>" +
                "</td>");
                tr = tr.concat("<td class=\"rispostaCorretta\" id=" + rowID + ">" + correctAnswer + "</td>");
                tr = tr.concat("<td class=\"rispostaSbagliata1\" id=" + rowID + ">" + arrWrongAnswers[0] + "</td>");
                if (categoria !== 'terapieMotorie') {
                  tr = tr.concat("<td class=\"rispostaSbagliata2\" id=" + rowID + ">" + arrWrongAnswers[1] + "</td>");
                }
                tr = tr.concat("<td><label class=\"switch\"><input type=\"checkbox\" id=" + rowID + "><span class=\"slider round\"></span></label></td>");
                tr = tr.concat("</tr>");

                let idTable = titolo + "Table";


                // Una volta cliccato lo switch non aggiunge più tutti gli elementi su Firebase
                if (!switched) {
                  // La tabella verrà caricata al primo caricamento della pagina;
                  // Poichè firebase.database.ref.on() è sempre in ascolto, è
                  // doveroso evitare il caricamento per ogni evento di firebase
                  if (!loaded) {
                    $('#'+ idTable +' tbody').append(tr);
                    if (domande.length === i) {
                      loaded = true;
                    }
                  } else {
                    $('#'+ idTable +' tbody').empty().append(tr);
                  }
                  //Al termine del caricamento svanisce la gif
                  $('img#loading').hide();
                }
              })
              //append() sulla card di tabelle già esistente
              if (tabelle !== "") {
                $('div#' + categoria + 'Collapse').append(tabelle);
              } else {
                tabelle = tabelle.concat("<p>Non ci sono quiz sulle storie</p>");
              }
            });
          }
        });
      }
    }
  });
});

function createTitolo(titolo) {
  return titolo.split(" ").join("_");
}

function loadTitolo(titolo) {
  return titolo.split("_").join(" ");
}

// Perche'?
// $("body").on( "click", "button", () => {
//   alert( "Triggred by " + $(this).text() );
// });
$('body').on('click', 'button[name$="areaButton"]', function(event) {
  console.log('sono entrato');
  var actualClickedID = event.target.id;
  if (actualClickedID.includes("BtnEditTextArea")) {
    let titolo = actualClickedID.replace("BtnEditTextArea", "");
    let newStoryline = $('textarea#' + titolo + "TxtArea").val();
    console.log('newStoryline: ' + newStoryline);
    let path = db.ref('esercizi/storie/' + titolo);
    path.update({
      testo: newStoryline
    });
    $('textarea#' + titolo + "TxtArea").css('background-color', '#acc997');
    setTimeout(function() {
      $('textarea#' + titolo + "TxtArea").css('background-color', 'inherit');
    }, 1000);
  }
  console.log('sono uscito');
});

$('body').on('click', 'button[name$="modificaTitolo"]', function(event) {
  console.log('sono entrato');
  var actualClickedID = event.target.id;
  if (actualClickedID.includes("btnEditTitolo")) {
    let categoria = actualClickedID.split('of')[1];
    let titolo = actualClickedID.split('of')[0].replace("btnEditTitolo", "");
    let path = db.ref('esercizi/' + categoria);
    path.once('value').then(snapshot => {
      let quiz = snapshot.val();
      let oldTitolo = Object.keys(quiz)[oldTitolo];
      let newTitolo = $('input[id$=\'' + titolo + '\']').val();
      console.log(JSON.stringify(quiz) + '\n' + oldTitolo + '\n' + newTitolo);
      quiz = renameKey(quiz, oldTitolo, newTitolo);
      let categPath = db.ref('esercizi/' + categoria);
      categPath.update(quiz);
      db.ref('esercizi/' + categoria + '/' + oldTitolo).remove();
    });
  }
  let result = confirm('Modifica avvenuta con successo');
  if (result) {
    window.location.reload();
  }
});

const renameKey = (object, key, newKey) => {
  const clonedObj = clone(object);
  const targetKey = clonedObj[key];
  delete clonedObj[key];
  clonedObj[newKey] = targetKey;
  return clonedObj;
};

const clone = (obj) => Object.assign({}, obj);

$('body').on('click', 'button[name$="eliminaTitolo"]', function(event) {
  console.log('sono entrato');
  var actualClickedID = event.target.id;
  if (actualClickedID.includes("btnDeleteTitolo")) {
    let categoria = actualClickedID.split('of')[1];
    let titolo = actualClickedID.split('of')[0].replace("btnDeleteTitolo", "");
    let path = db.ref('esercizi/' + categoria + '/' + titolo);
    path.remove();
    let result = confirm('Eliminazione avvenuta con successo');
    if (result) {
      window.location.reload();
    }
  }
});

$('body').on('click', 'input[type=\"file\"]', function() {

  var id = event.target.id;

  // gets triggered any time someone selects a new file via the upload via the Choose File upload button
  document.querySelector('.file-select[id$=\'' + id + '\']').addEventListener('change', handleFileUploadChange);

  document.querySelector('.file-submit[id$=\'' + id + '\']').addEventListener('click', handleFileUploadSubmit);

  // variable selectedFile will keep track of whatever file a user has input via the Choose File button.
  let selectedFile;
  function handleFileUploadChange(e) {
    selectedFile = e.target.files[0];
    let id = e.target.id;
    console.log(id);
    $('.file-submit[id$=\'' + id + '\']').css('visibility', 'visible');
  }

  // manage the submission
  function handleFileUploadSubmit(e) {
    //create a child directory called images, and place the file inside this directory

    if (`${selectedFile.type}`.split("/").pop() === 'mpeg') {
      const uploadTask = storageRef.child(`songMusicQuiz/${selectedFile.name}`).put(selectedFile);
      uploadTask.on('state_changed', (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Caricamento ' + progress + '%');
        //const mediaUrl = selectedFile.databaseURL;

        $('img[id$=\'' + id + '\']').css('visibility', 'visible');

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
         let id = e.target.id;
         let rowID = id.split('of')[0];
         let titolo = id.split('of')[1];
         let categoria = id.split('of')[2];
         let path = db.ref('esercizi/' + categoria + '/' + titolo + '/domande/' + rowID);
         path.update({
           media: downloadURL
         });
         console.log('media aggiunto!');

         $('img[id$=\'' + id + '\']').css('visibility', 'hidden');
         $('td[id$=\'' + id + '\'][class$=\'media\']').css('background-color', '#acc997');
         $('a[id$=\'' + id + '\']').attr('href', downloadURL);
         setTimeout(function() {
           $('td[id$=\'' + id + '\'][class$=\'media\']').css('background-color', 'inherit');
         }, 1000);

         console.log('id: ' + id + '\n' +
                  'rowID: ' + rowID + '\n' +
                  'categoria: ' + categoria + '\n' +
                  'titolo: ' + titolo);
        });
      });
    } else {
      const uploadTask = storageRef.child(`imagesQuiz/${selectedFile.name}`).put(selectedFile);
      uploadTask.on('state_changed', (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Caricamento ' + progress + '%');
        //const mediaUrl = selectedFile.databaseURL;

        $('img[id$=\'' + id + '\']').css('visibility', 'visible');

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
         let id = e.target.id;
         let rowID = id.split('of')[0];
         let titolo = id.split('of')[1];
         let categoria = id.split('of')[2];
         let path = db.ref('esercizi/' + categoria + '/' + titolo + '/domande/' + rowID);
         path.update({
           media: downloadURL
         });
         console.log('media aggiunto!');

         $('img[id$=\'' + id + '\']').css('visibility', 'hidden');
         $('a[id$=\'' + id + '\']').attr('href', downloadURL);
         $('td[id$=\'' + id + '\'][class$=\'media\']').css('background-color', '#acc997');
         setTimeout(function() {
           $('td[id$=\'' + id + '\'][class$=\'media\']').css('background-color', 'inherit');
         }, 1000);

         console.log('id: ' + id + '\n' +
                  'rowID: ' + rowID + '\n' +
                  'categoria: ' + categoria + '\n' +
                  'titolo: ' + titolo);
        });
      });
    }

  }
});

$("body").on("click", "input[type=\"checkbox\"]", function() {

  let quizClicked = $(this).attr('id');

  const titolo = quizClicked.split("of")[1];
  const index = quizClicked.split("of")[0];

  if($(this).prop("checked") == true) {
      console.log("Checkbox " + quizClicked + " is checked.");

      let domanda = $("td[id$='" + quizClicked + "'][class$='domanda']").text();
      let rispostaCorretta = $("td[id$='" + quizClicked + "'][class$='rispostaCorretta']").text();
      let rispostaSbagliata1 = $("td[id$='" + quizClicked + "'][class$='rispostaSbagliata1']").text();
      let rispostaSbagliata2 = $("td[id$='" + quizClicked + "'][class$='rispostaSbagliata2']").text();

      $("td[id$='" + quizClicked + "'][class$='domanda']").empty().append("<input id=\"domanda\" value=\"" + domanda + "\"></input>");
      $("td[id$='" + quizClicked + "'][class$='rispostaCorretta']").empty().append("<input id=\"rispostaCorretta\" value=\"" + rispostaCorretta + "\"></input>");
      $("td[id$='" + quizClicked + "'][class$='rispostaSbagliata1']").empty().append("<input id=\"rispostaSbagliata1\" value=\"" + rispostaSbagliata1 + "\"></input>");
      $("td[id$='" + quizClicked + "'][class$='rispostaSbagliata2']").empty().append("<input id=\"rispostaSbagliata2\" value=\"" + rispostaSbagliata2 + "\"></input>");

  } else if($(this).prop("checked") == false) {
      console.log("Checkbox " + quizClicked + " is unchecked.");

      let newDomanda = $("input[id$='domanda']").val();
      let newRispostaCorretta = $("input[id$='rispostaCorretta']").val();
      let newRispostaSbagliata1 = $("input[id$='rispostaSbagliata1']").val();
      let newRispostaSbagliata2 = $("input[id$='rispostaSbagliata2']").val();

      console.log("newDomanda: " + newDomanda + "\n" +
        "newRispostaCorretta: " + newRispostaCorretta + "\n" +
        "newRispostaSbagliata1: " + newRispostaSbagliata1 + "\n" +
        "newRispostaSbagliata2: " + newRispostaSbagliata2);

      let elemDomanda = {
        domanda: newDomanda,
        rispostaCorretta: newRispostaCorretta,
        risposteSbagliate: [ newRispostaSbagliata1, newRispostaSbagliata2 ],
      }

      writeNewDomanda(titolo, index, elemDomanda);

      $("td[id$='" + quizClicked + "'][class$='domanda']").empty().append(newDomanda);
      $("td[id$='" + quizClicked + "'][class$='rispostaCorretta']").empty().append(newRispostaCorretta);
      $("td[id$='" + quizClicked + "'][class$='rispostaSbagliata1']").empty().append(newRispostaSbagliata1);
      $("td[id$='" + quizClicked + "'][class$='rispostaSbagliata2']").empty().append(newRispostaSbagliata2);


      $('tr[id$=\'' + quizClicked + '\']').css('background-color', '#acc997');

      setTimeout(function() {
        console.log('index: ' + index);
        $('tr[id$=\'' + quizClicked + '\']').css('background-color', 'inherit');
      }, 1000);
  }

  console.log(quizClicked);
});

function getDate(longDate) {
    let day = longDate.slice(8, 10);
    let month = longDate.slice(5, 7);
    let year = longDate.slice(0, 4);
    if (month.substring(0, 1) == '0') {
        month = month.slice(1, 2);
    }
    if (day.substring(0, 1) == '0') {
        day = day.slice(1, 2);
    }
    return day + ' ' + months[month - 1] + ' ' + year;
}

function fromSimpletoLongDate(simpleDate) {
  let day = simpleDate.split(" ")[0];
  (day.toString().length === 1) ? (day = "0" + day) : day;
  var month;
  simpleDate.split(" ").find(function(v) {
    for (var i = 0; i < months.length; i++) {
      if (v == months[i]) {
        month = i+1;
        (month.toString().length === 1) ? (month = "0" + month) : month;
      }
    }
  });

  let year = simpleDate.split(" ")[2];
  return year + "-" + month + "-" + day;
}

function writeNewDomanda(titolo, riga, elemDomanda) {
  let categorie = Object.keys(gEsercizi);
  categorie.forEach((categoria, i) => {
    if (_.has(gEsercizi, categoria + "." + titolo)) {

      let eserciziPath = db.ref('esercizi/' + categoria + '/' + titolo + '/domande/' + riga);
      eserciziPath.update(elemDomanda);
    }
  });
}

// button sign in Google
$('#btnLogout').click(function() {
  signOut();
});

  //sign out
function signOut() {
  firebase.auth().signOut().then(function() {
    window.location.href = 'http://amicoassistente.altervista.org'
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}

firebase.auth().onAuthStateChanged(function(user) {
if(user) {
  var email = user.email;
  var emailVerified = user.emailVerified;
  var uid = user.uid;
  var providerData = user.providerData;
  $('#welcomeUser').html(email);
  console.log('Email: ' + email + ' Email Verified: ' + emailVerified + ' Uid: ' + uid + ' Provider: ' + providerData);
} else {
  console.log('No user.');
  window.location.href = 'http://amicoassistente.altervista.org';
}
});

//Aggiungi storie
$('#btnAddStoryQuiz').click(function() {
  $(this).attr('disabled', 'disabled');
  var table = "";
  //Genero tabelle per ogni quiz/titolo aggiunto
  table = table.concat("<div class=\"table-responsive\" id=\"" + 'newTitolo' + "\">" +
  "<tr>" +
  "<p style=\"font-size: 30px; margin-left: 10px;\" id=\"" + 'newTitolo' + "\">" + "<input style=\"width: 250px;\" id=\"newTitolo\" value=\"nuovo titolo\"></input>" + "</p>" +
  "</tr></div>");
  table = table.concat("<div class=\"flexrow\"><textarea id=\"" + 'newTitolo' + "\" name=\"storia\" rows=\"8\" cols=\"80\"></textarea>");
  table = table.concat("<button class=\"btn btn-lg btn-info\" type=\"button\" id=\"confirmStoria\" name=\"confermaAggiunta\">Conferma quiz</button>");
  table = table.concat("</div>");
  table = table.concat("<table id=\"" + 'newTitolo' + "Table" + "\" class=\"table table-bordered\" width=\"100%\" cellspacing=\"0\">");
  table = table.concat("<thead>");
  table = table.concat("<tr>");
  table = table.concat("<th>Domanda</th>");
  table = table.concat("<th>Risposta Corretta</th>");
  table = table.concat("<th>Risposta Sbagliata 1</th>");
  table = table.concat("<th>Risposta Sbagliata 2</th>");
  table = table.concat("<th>Modifica</th>");
  table = table.concat("</tr>");
  table = table.concat("</thead>");
  table = table.concat("<tbody>");
  table = table.concat("</tbody>");
  table = table.concat("</table>");

  var tr = "";
  for (var i = 0; i < 5; i++) {
    let rowID = i;
    tr = tr.concat("<tr");
    tr = tr.concat(" id=\"" + rowID + "\">");
    tr = tr.concat("<td class=\"domanda\" id=" + rowID + ">" + "<input id=\"domanda" + rowID + "\" value=\"\"></input>" + "</td>");
    tr = tr.concat("<td class=\"rispostaCorretta\" id=" + rowID + ">" + "<input id=\"rispostaCorretta" + rowID + "\" value=\"\"></input>" + "</td>");
    tr = tr.concat("<td class=\"rispostaSbagliata1\" id=" + rowID + ">" + "<input id=\"rispostaSbagliata1" + rowID + "\" value=\"\"></input>" + "</td>");
    tr = tr.concat("<td class=\"rispostaSbagliata2\" id=" + rowID + ">" + "<input id=\"rispostaSbagliata2" + rowID + "\" value=\"\"></input>" + "</td>");
    tr = tr.concat("<td><label class=\"switch\"><input disabled type=\"checkbox\" id=" + rowID + "><span class=\"slider round\"></span></label></td>");
    tr = tr.concat("</tr>");
  }
  $('div#storie').append(table);
  $('#newTitoloTable tbody').append(tr);
  window.location = '#newTitolo';
});
$("body").on("click", "button[id$=\"confirmStoria\"]", function() {

  var titoloWithSpaces = $('input#newTitolo').val();
  var titoloQuiz = createTitolo(titoloWithSpaces);

  var testo = $('textarea#newTitolo').val();

  var domande = [
    $("input#domanda0").val(),
    $("input#domanda1").val(),
    $("input#domanda2").val(),
    $("input#domanda3").val(),
    $("input#domanda4").val()
  ];

  var risposteCorrette = [
    $("input[id$='rispostaCorretta0']").val(),
    $("input[id$='rispostaCorretta1']").val(),
    $("input[id$='rispostaCorretta2']").val(),
    $("input[id$='rispostaCorretta3']").val(),
    $("input[id$='rispostaCorretta4']").val()
  ];

  var risposteSbagliate1 = [
    $("input#rispostaSbagliata10").val(),
    $("input#rispostaSbagliata11").val(),
    $("input#rispostaSbagliata12").val(),
    $("input#rispostaSbagliata13").val(),
    $("input#rispostaSbagliata14").val()
  ];

  var risposteSbagliate2 = [
    $("input#rispostaSbagliata20").val(),
    $("input#rispostaSbagliata21").val(),
    $("input#rispostaSbagliata22").val(),
    $("input#rispostaSbagliata23").val(),
    $("input#rispostaSbagliata24").val()
  ];

  console.log(testo + '\n' + domande + '\n' +
    risposteCorrette + '\n' +
    risposteSbagliate1 + '\n' +
    risposteSbagliate2);

  var path = db.ref('esercizi/storie');
  let newStoria = {
    [titoloQuiz] : {
      "domande" : [ {
        "domanda" : domande[0],
        "rispostaCorretta" : risposteCorrette[0],
        "risposteSbagliate" : [ risposteSbagliate1[0], risposteSbagliate2[0] ]
      }, {
        "domanda" : domande[1],
        "rispostaCorretta" : risposteCorrette[1],
        "risposteSbagliate" : [ risposteSbagliate1[1], risposteSbagliate2[1] ]
      }, {
        "domanda" : domande[2],
        "rispostaCorretta" : risposteCorrette[2],
        "risposteSbagliate" : [ risposteSbagliate1[2], risposteSbagliate2[2] ]
      }, {
        "domanda" : domande[3],
        "rispostaCorretta" : risposteCorrette[3],
        "risposteSbagliate" : [ risposteSbagliate1[3], risposteSbagliate2[3] ]
      }, {
        "domanda" : domande[4],
        "rispostaCorretta" : risposteCorrette[4],
        "risposteSbagliate" : [ risposteSbagliate1[4], risposteSbagliate2[4] ]
      } ],
      "testo" : testo
    }
  };

  path.update(newStoria);
  alert('Esercizio aggiunto!');
  window.location.href = 'http://amicoassistente.altervista.org/homepage/quiz/quiz.html';
});

//Aggiungi musica
$('#btnAddMusicQuiz').click(function() {
  $(this).attr('disabled', 'disabled');
  var table = "";
  //Genero tabelle per ogni quiz/titolo aggiunto
  table = table.concat("<div class=\"table-responsive\" id=\"" + 'newTitolo' + "\">" +
  "<tr>" +
  "<p style=\"font-size: 30px; margin-left: 10px;\" id=\"" + 'newTitolo' + "\">" + "<input style=\"width: 250px;\" id=\"newTitolo\" value=\"nuovo titolo\"></input>" + "</p>" +
  "</tr></div>");
  table = table.concat("<div class=\"flexrow\">");
  table = table.concat("<p>Puoi aggiungere brani musicali in un secondo momento.</p>");
  table = table.concat("</div>");
  table = table.concat("<div class=\"flexrow\">");
  table = table.concat("<button class=\"btn btn-lg btn-info\" type=\"button\" id=\"confirmMusica\" name=\"confermaAggiunta\" style=\"margin: 50px;\">Conferma quiz</button>");
  table = table.concat("</div>");
  table = table.concat("<table id=\"" + 'newTitolo' + "Table" + "\" class=\"table table-bordered\" width=\"100%\" cellspacing=\"0\">");
  table = table.concat("<thead>");
  table = table.concat("<tr>");
  table = table.concat("<th>Domanda</th>");
  table = table.concat("<th>Risposta Corretta</th>");
  table = table.concat("<th>Risposta Sbagliata 1</th>");
  table = table.concat("<th>Risposta Sbagliata 2</th>");
  table = table.concat("<th>Modifica</th>");
  table = table.concat("</tr>");
  table = table.concat("</thead>");
  table = table.concat("<tbody>");
  table = table.concat("</tbody>");
  table = table.concat("</table>");

  var tr = "";
  for (var i = 0; i < 5; i++) {
    let rowID = i;
    tr = tr.concat("<tr");
    tr = tr.concat(" id=\"" + rowID + "\">");
    tr = tr.concat("<td class=\"domanda\" id=" + rowID + ">" + "<input id=\"domanda" + rowID + "\" value=\"\"></input>" + "</td>");
    tr = tr.concat("<td class=\"rispostaCorretta\" id=" + rowID + ">" + "<input id=\"rispostaCorretta" + rowID + "\" value=\"\"></input>" + "</td>");
    tr = tr.concat("<td class=\"rispostaSbagliata1\" id=" + rowID + ">" + "<input id=\"rispostaSbagliata1" + rowID + "\" value=\"\"></input>" + "</td>");
    tr = tr.concat("<td class=\"rispostaSbagliata2\" id=" + rowID + ">" + "<input id=\"rispostaSbagliata2" + rowID + "\" value=\"\"></input>" + "</td>");
    tr = tr.concat("<td><label class=\"switch\"><input disabled type=\"checkbox\" id=" + rowID + "><span class=\"slider round\"></span></label></td>");
    tr = tr.concat("</tr>");
  }
  $('div#musica').append(table);
  $('#newTitoloTable tbody').append(tr);
  window.location = '#newTitolo';
});
$("body").on("click", "button[id$=\"confirmMusica\"]", function() {
  var titoloWithSpaces = $('input#newTitolo').val();
  var titoloQuiz = createTitolo(titoloWithSpaces);

  var domande = [
    $("input#domanda0").val(),
    $("input#domanda1").val(),
    $("input#domanda2").val(),
    $("input#domanda3").val(),
    $("input#domanda4").val()
  ];

  var risposteCorrette = [
    $("input[id$='rispostaCorretta0']").val(),
    $("input[id$='rispostaCorretta1']").val(),
    $("input[id$='rispostaCorretta2']").val(),
    $("input[id$='rispostaCorretta3']").val(),
    $("input[id$='rispostaCorretta4']").val()
  ];

  var risposteSbagliate1 = [
    $("input#rispostaSbagliata10").val(),
    $("input#rispostaSbagliata11").val(),
    $("input#rispostaSbagliata12").val(),
    $("input#rispostaSbagliata13").val(),
    $("input#rispostaSbagliata14").val()
  ];

  var risposteSbagliate2 = [
    $("input#rispostaSbagliata20").val(),
    $("input#rispostaSbagliata21").val(),
    $("input#rispostaSbagliata22").val(),
    $("input#rispostaSbagliata23").val(),
    $("input#rispostaSbagliata24").val()
  ];

  console.log(domande + '\n' +
    risposteCorrette + '\n' +
    risposteSbagliate1 + '\n' +
    risposteSbagliate2);

  var path = db.ref('esercizi/musica');
  let newMusica = {
    [titoloQuiz] : {
      "domande" : [ {
        "domanda" : domande[0],
        "rispostaCorretta" : risposteCorrette[0],
        "risposteSbagliate" : [ risposteSbagliate1[0], risposteSbagliate2[0] ]
      }, {
        "domanda" : domande[1],
        "rispostaCorretta" : risposteCorrette[1],
        "risposteSbagliate" : [ risposteSbagliate1[1], risposteSbagliate2[1] ]
      }, {
        "domanda" : domande[2],
        "rispostaCorretta" : risposteCorrette[2],
        "risposteSbagliate" : [ risposteSbagliate1[2], risposteSbagliate2[2] ]
      }, {
        "domanda" : domande[3],
        "rispostaCorretta" : risposteCorrette[3],
        "risposteSbagliate" : [ risposteSbagliate1[3], risposteSbagliate2[3] ]
      }, {
        "domanda" : domande[4],
        "rispostaCorretta" : risposteCorrette[4],
        "risposteSbagliate" : [ risposteSbagliate1[4], risposteSbagliate2[4] ]
      } ]
    }
  };

  path.update(newMusica);
  alert('Esercizio aggiunto!');
  window.location.href = 'http://amicoassistente.altervista.org/homepage/quiz/quiz.html';
});

//Aggiungi musica
$('#btnAddVipQuiz').click(function() {
  $(this).attr('disabled', 'disabled');
  var table = "";
  //Genero tabelle per ogni quiz/titolo aggiunto
  table = table.concat("<div class=\"table-responsive\" id=\"" + 'newTitolo' + "\">" +
  "<tr>" +
  "<p style=\"font-size: 30px; margin-left: 10px;\" id=\"" + 'newTitolo' + "\">" + "<input style=\"width: 250px;\" id=\"newTitolo\" value=\"nuovo titolo\"></input>" + "</p>" +
  "</tr></div>");
  table = table.concat("<div class=\"flexrow\">");
  table = table.concat("<p>Puoi aggiungere le foto in un secondo momento.</p>");
  table = table.concat("</div>");
  table = table.concat("<div class=\"flexrow\">");
  table = table.concat("<button class=\"btn btn-lg btn-info\" type=\"button\" id=\"confirmVip\" name=\"confermaAggiunta\" style=\"margin: 50px;\">Conferma quiz</button>");
  table = table.concat("</div>");
  table = table.concat("<table id=\"" + 'newTitolo' + "Table" + "\" class=\"table table-bordered\" width=\"100%\" cellspacing=\"0\">");
  table = table.concat("<thead>");
  table = table.concat("<tr>");
  table = table.concat("<th>Domanda</th>");
  table = table.concat("<th>Risposta Corretta</th>");
  table = table.concat("<th>Risposta Sbagliata 1</th>");
  table = table.concat("<th>Risposta Sbagliata 2</th>");
  table = table.concat("<th>Modifica</th>");
  table = table.concat("</tr>");
  table = table.concat("</thead>");
  table = table.concat("<tbody>");
  table = table.concat("</tbody>");
  table = table.concat("</table>");

  var tr = "";
  for (var i = 0; i < 5; i++) {
    let rowID = i;
    tr = tr.concat("<tr");
    tr = tr.concat(" id=\"" + rowID + "\">");
    tr = tr.concat("<td class=\"domanda\" id=" + rowID + ">" + "<input id=\"domanda" + rowID + "\" value=\"\"></input>" + "</td>");
    // tr = tr.concat("<td class=\"media\" id=" + rowID + ">" +
    //   "<div id=\"songSubmit\">" +
    //     "<input id=\"" + rowID + "\" type = \"file\" class=\"file-select\" accept = \".mp3\"/>" +
    //     "<button id=\"" + rowID + "\"class=\"file-submit\">Carica canzone</button>" +
    //   "</div>" + "</td>");
    tr = tr.concat("<td class=\"rispostaCorretta\" id=" + rowID + ">" + "<input id=\"rispostaCorretta" + rowID + "\" value=\"\"></input>" + "</td>");
    tr = tr.concat("<td class=\"rispostaSbagliata1\" id=" + rowID + ">" + "<input id=\"rispostaSbagliata1" + rowID + "\" value=\"\"></input>" + "</td>");
    tr = tr.concat("<td class=\"rispostaSbagliata2\" id=" + rowID + ">" + "<input id=\"rispostaSbagliata2" + rowID + "\" value=\"\"></input>" + "</td>");
    tr = tr.concat("<td><label class=\"switch\"><input disabled type=\"checkbox\" id=" + rowID + "><span class=\"slider round\"></span></label></td>");
    tr = tr.concat("</tr>");
  }
  $('div#vip').append(table);
  $('#newTitoloTable tbody').append(tr);
  window.location = '#newTitolo';
});
$("body").on("click", "button[id$=\"confirmVip\"]", function() {
  var titoloWithSpaces = $('input#newTitolo').val();
  var titoloQuiz = createTitolo(titoloWithSpaces);

  var domande = [
    $("input#domanda0").val(),
    $("input#domanda1").val(),
    $("input#domanda2").val(),
    $("input#domanda3").val(),
    $("input#domanda4").val()
  ];

  var risposteCorrette = [
    $("input[id$='rispostaCorretta0']").val(),
    $("input[id$='rispostaCorretta1']").val(),
    $("input[id$='rispostaCorretta2']").val(),
    $("input[id$='rispostaCorretta3']").val(),
    $("input[id$='rispostaCorretta4']").val()
  ];

  var risposteSbagliate1 = [
    $("input#rispostaSbagliata10").val(),
    $("input#rispostaSbagliata11").val(),
    $("input#rispostaSbagliata12").val(),
    $("input#rispostaSbagliata13").val(),
    $("input#rispostaSbagliata14").val()
  ];

  var risposteSbagliate2 = [
    $("input#rispostaSbagliata20").val(),
    $("input#rispostaSbagliata21").val(),
    $("input#rispostaSbagliata22").val(),
    $("input#rispostaSbagliata23").val(),
    $("input#rispostaSbagliata24").val()
  ];

  console.log(domande + '\n' +
    risposteCorrette + '\n' +
    risposteSbagliate1 + '\n' +
    risposteSbagliate2);

  var path = db.ref('esercizi/vip');
  let newVip = {
    [titoloQuiz] : {
      "domande" : [ {
        "domanda" : domande[0],
        "rispostaCorretta" : risposteCorrette[0],
        "risposteSbagliate" : [ risposteSbagliate1[0], risposteSbagliate2[0] ]
      }, {
        "domanda" : domande[1],
        "rispostaCorretta" : risposteCorrette[1],
        "risposteSbagliate" : [ risposteSbagliate1[1], risposteSbagliate2[1] ]
      }, {
        "domanda" : domande[2],
        "rispostaCorretta" : risposteCorrette[2],
        "risposteSbagliate" : [ risposteSbagliate1[2], risposteSbagliate2[2] ]
      }, {
        "domanda" : domande[3],
        "rispostaCorretta" : risposteCorrette[3],
        "risposteSbagliate" : [ risposteSbagliate1[3], risposteSbagliate2[3] ]
      }, {
        "domanda" : domande[4],
        "rispostaCorretta" : risposteCorrette[4],
        "risposteSbagliate" : [ risposteSbagliate1[4], risposteSbagliate2[4] ]
      } ]
    }
  };

  path.update(newVip);
  alert('Esercizio aggiunto!');
  window.location.href = 'http://amicoassistente.altervista.org/homepage/quiz/quiz.html';
});

//Aggiungi musica
$('#btnAddTerapieQuiz').click(function() {
  $(this).attr('disabled', 'disabled');
  var table = "";
  //Genero tabelle per ogni quiz/titolo aggiunto
  table = table.concat("<div class=\"table-responsive\" id=\"" + 'newTitolo' + "\">" +
  "<tr>" +
  "<p style=\"font-size: 30px; margin-left: 10px;\" id=\"" + 'newTitolo' + "\">" + "<input style=\"width: 250px;\" id=\"newTitolo\" value=\"nuovo titolo\"></input>" + "</p>" +
  "</tr></div>");
  table = table.concat("<div class=\"flexrow\">");
  table = table.concat("<p>Puoi aggiungere le foto in un secondo momento.</p>");
  table = table.concat("</div>");
  table = table.concat("<div class=\"flexrow\">");
  table = table.concat("<button class=\"btn btn-lg btn-info\" type=\"button\" id=\"confirmTerapieMotorie\" name=\"confermaAggiunta\" style=\"margin: 50px;\">Conferma quiz</button>");
  table = table.concat("</div>");
  table = table.concat("<table id=\"" + 'newTitolo' + "Table" + "\" class=\"table table-bordered\" width=\"100%\" cellspacing=\"0\">");
  table = table.concat("<thead>");
  table = table.concat("<tr>");
  table = table.concat("<th>Domanda</th>");
  table = table.concat("<th>Frase es. riuscito</th>");
  table = table.concat("<th>Frase es. non riuscito</th>");
  table = table.concat("<th>Modifica</th>");
  table = table.concat("</tr>");
  table = table.concat("</thead>");
  table = table.concat("<tbody>");
  table = table.concat("</tbody>");
  table = table.concat("</table>");

  var tr = "";
  for (var i = 0; i < 5; i++) {
    let rowID = i;
    tr = tr.concat("<tr");
    tr = tr.concat(" id=\"" + rowID + "\">");
    tr = tr.concat("<td class=\"domanda\" id=" + rowID + ">" + "<input id=\"domanda" + rowID + "\" value=\"\"></input>" + "</td>");
    // tr = tr.concat("<td class=\"media\" id=" + rowID + ">" +
    //   "<div id=\"songSubmit\">" +
    //     "<input id=\"" + rowID + "\" type = \"file\" class=\"file-select\" accept = \".mp3\"/>" +
    //     "<button id=\"" + rowID + "\"class=\"file-submit\">Carica canzone</button>" +
    //   "</div>" + "</td>");
    tr = tr.concat("<td class=\"rispostaCorretta\" id=" + rowID + ">" + "<input id=\"rispostaCorretta" + rowID + "\" value=\"\"></input>" + "</td>");
    tr = tr.concat("<td class=\"rispostaSbagliata1\" id=" + rowID + ">" + "<input id=\"rispostaSbagliata1" + rowID + "\" value=\"\"></input>" + "</td>");
    tr = tr.concat("<td><label class=\"switch\"><input disabled type=\"checkbox\" id=" + rowID + "><span class=\"slider round\"></span></label></td>");
    tr = tr.concat("</tr>");
  }
  $('div#terapieMotorie').append(table);
  $('#newTitoloTable tbody').append(tr);
  window.location = '#newTitolo';
});
$("body").on("click", "button[id$=\"confirmTerapieMotorie\"]", function() {
  var titoloWithSpaces = $('input#newTitolo').val();
  var titoloQuiz = createTitolo(titoloWithSpaces);

  var domande = [
    $("input#domanda0").val(),
    $("input#domanda1").val(),
    $("input#domanda2").val(),
    $("input#domanda3").val(),
    $("input#domanda4").val()
  ];

  var risposteCorrette = [
    $("input[id$='rispostaCorretta0']").val(),
    $("input[id$='rispostaCorretta1']").val(),
    $("input[id$='rispostaCorretta2']").val(),
    $("input[id$='rispostaCorretta3']").val(),
    $("input[id$='rispostaCorretta4']").val()
  ];

  var risposteSbagliate1 = [
    $("input#rispostaSbagliata10").val(),
    $("input#rispostaSbagliata11").val(),
    $("input#rispostaSbagliata12").val(),
    $("input#rispostaSbagliata13").val(),
    $("input#rispostaSbagliata14").val()
  ];

  console.log(domande + '\n' +
    risposteCorrette + '\n' +
    risposteSbagliate1);

  var path = db.ref('esercizi/terapieMotorie');
  let newTerapieMotorie = {
    [titoloQuiz] : {
      "domande" : [ {
        "domanda" : domande[0],
        "rispostaCorretta" : risposteCorrette[0],
        "risposteSbagliate" : [ risposteSbagliate1[0] ]
      }, {
        "domanda" : domande[1],
        "rispostaCorretta" : risposteCorrette[1],
        "risposteSbagliate" : [ risposteSbagliate1[1] ]
      }, {
        "domanda" : domande[2],
        "rispostaCorretta" : risposteCorrette[2],
        "risposteSbagliate" : [ risposteSbagliate1[2] ]
      }, {
        "domanda" : domande[3],
        "rispostaCorretta" : risposteCorrette[3],
        "risposteSbagliate" : [ risposteSbagliate1[3] ]
      }, {
        "domanda" : domande[4],
        "rispostaCorretta" : risposteCorrette[4],
        "risposteSbagliate" : [ risposteSbagliate1[4] ]
      } ]
    }
  };

  path.update(newTerapieMotorie);
  alert('Esercizio aggiunto!');
  window.location.href = 'http://amicoassistente.altervista.org/homepage/quiz/quiz.html';
});

//**********************// Musica Firebase Storage listeners //********************//

// // gets triggered any time someone selects a new file via the upload via the Choose File upload button
// document.querySelector('.file-select').addEventListener('change', handleFileUploadChange);
//
// document.querySelector('.file-submit').addEventListener('click', handleFileUploadSubmit);
//
// // variable selectedFile will keep track of whatever file a user has input via the Choose File button.
// let selectedFile;
// function handleFileUploadChange(e) {
//   selectedFile = e.target.files[0];
// }
//
// // manage the submission
// function handleFileUploadSubmit(e) {
//   //create a child directory called images, and place the file inside this directory
//   const uploadTask = storageRef.child(`songMusicQuiz/${selectedFile.name}`).put(selectedFile);
//   uploadTask.on('state_changed', (snapshot) => {
//     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('Caricamento ' + progress + '%');
//     //const mediaUrl = selectedFile.databaseURL;
//
//     switch (snapshot.state) {
//     case firebase.storage.TaskState.PAUSED: // or 'paused'
//       console.log('Caricamento in pausa.');
//       break;
//     case firebase.storage.TaskState.RUNNING: // or 'running'
//       console.log('Caricamento in corso..');
//       break;
//     }
//   // Observe state change events such as progress, pause, and resume
//   }, (error) => {
//     // Handle unsuccessful uploads
//     console.log(error);
//   }, function() {
//      // Do something once upload is complete
//      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
//      console.log('File disponibile all\' indirizzo: ', downloadURL);
//      document.write('Canzone caricata.');
//     });
//   });
// }
