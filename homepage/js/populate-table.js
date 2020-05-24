
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
var auth = firebase.auth();


var numPazienti = 0;

const months = [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre'
];

var pazientiIDs = {};

//********************* jQuery *************************

var switched = false;
var loaded = false;

$(document).ready(function() {

  let pazienti = db.ref('pazienti');
  var pazientiArray = {};
  pazienti.on('value', snapshot => {
    let pazientiData = snapshot.val();
    let arrayOfPazientiIDs = Object.keys(pazientiData);
    pazientiIDs = arrayOfPazientiIDs;
    numPazienti = arrayOfPazientiIDs;
    for (var i = 0; i < arrayOfPazientiIDs.length; i++) {
      let generalitaPath = db.ref('pazienti/' + arrayOfPazientiIDs[i] + '/generalita');
      generalitaPath.on('value', snapshot => {
        pazientiArray[i] = snapshot.val();
      });
    }

    var tr = "";
    var i;
    for (i = 0; i < arrayOfPazientiIDs.length; i++) {
      let paziente = _.get(pazientiArray, i.toString());
      if (paziente !== null) {
        let nome = _.get(pazientiArray, i.toString() + ".nome");
        let cognome = _.get(pazientiArray, i.toString() + ".cognome");
        let eta = _.get(pazientiArray, i.toString() + ".eta");
        let longDate = _.get(pazientiArray, i.toString() + ".dataNascita");
        let dataNascita = getDate(longDate);
        let luogoNascita = _.get(pazientiArray, i.toString() + ".luogoNascita");
        let citta = _.get(pazientiArray, i.toString() + ".luogoResidenza.0.city");
        let indirizzo = _.get(pazientiArray, i.toString() + ".luogoResidenza.0.street-address")

        tr = tr.concat("<tr");
        tr = tr.concat(" id=\"" + arrayOfPazientiIDs[i].toString() + "\">");
        tr = tr.concat("<td class=\"nome\" id=" + arrayOfPazientiIDs[i].toString() + ">" + nome + "</td>");
        tr = tr.concat("<td class=\"cogn\" id=" + arrayOfPazientiIDs[i].toString() + ">" + cognome + "</td>");
        tr = tr.concat("<td class=\"eta\" id=" + arrayOfPazientiIDs[i].toString() + ">" + eta + "</td>");
        tr = tr.concat("<td class=\"dataNascita\" id=" + arrayOfPazientiIDs[i].toString() + ">" + dataNascita + "</td>");
        tr = tr.concat("<td class=\"luogoNascita\" id=" + arrayOfPazientiIDs[i].toString() + ">" + luogoNascita + "</td>");
        tr = tr.concat("<td class=\"citta\" id=" + arrayOfPazientiIDs[i].toString() + ">" + citta + "</td>");
        tr = tr.concat("<td class=\"indirizzo\" id=" + arrayOfPazientiIDs[i].toString() + ">" + indirizzo + "</td>");
        tr = tr.concat("<td><label class=\"switch\"><input type=\"checkbox\" id=\"" + arrayOfPazientiIDs[i].toString() + "\"><span class=\"slider round\"></span></label></td>");
        tr = tr.concat("</tr>");

        let aSwitch = "<label class=\"switch\"><input type=\"checkbox\"><span class=\"slider round\"></span></label>";
        let aBSSwitch = "<div class=\"checkbox\"><label><input type=\"checkbox\" data-toggle=\"toggle\">Option one is enabled</label></div>";
      }
    }

    // Una volta cliccato lo switch non aggiunge più tutti gli elementi su Firebase
    if (!switched) {
      // La tabella verrà caricata al primo caricamento della pagina;
      // Poichè firebase.database.ref.on() è sempre in ascolto, è
      // doveroso evitare il caricamento per ogni evento di firebase
      if (!loaded) {
        $('#pazientiTable tbody').append(tr);
        loaded = true;
      } else {
        $('#pazientiTable tbody').empty().append(tr);
      }
      //Al termine del caricamento svanisce la gif
      $('img#loading').hide();
    }
  });

});

$("body").on("click", "input[type=\"checkbox\"]", function() {
  let pazienteClicked = $(this).attr('id');

  if($(this).prop("checked") == true) {
      console.log("Checkbox " + pazienteClicked + " is checked.");

      let nome = $("td[id$='" + pazienteClicked + "'][class$='nome']").text();
      let cogn = $("td[id$='" + pazienteClicked + "'][class$='cogn']").text();
      let eta = $("td[id$='" + pazienteClicked + "'][class$='eta']").text();
      let dataNascita = $("td[id$='" + pazienteClicked + "'][class$='dataNascita']").text();
      let luogoNascita = $("td[id$='" + pazienteClicked + "'][class$='luogoNascita']").text();
      let citta = $("td[id$='" + pazienteClicked + "'][class$='citta']").text();
      let indirizzo = $("td[id$='" + pazienteClicked + "'][class$='indirizzo']").text();

      if (switched == false) {
        switched = true;
        $("td[id$='" + pazienteClicked + "'][class$='nome']").empty().append("<input id=\"nome\" value=\"" + nome + "\"></input>");
        $("td[id$='" + pazienteClicked + "'][class$='cogn']").empty().append("<input id=\"cogn\" value=\"" + cogn + "\"></input>");
        $("td[id$='" + pazienteClicked + "'][class$='eta']").empty().append("<input id=\"eta\" value=\"" + eta + "\"></input>");
        $("td[id$='" + pazienteClicked + "'][class$='dataNascita']").empty().append("<input id=\"dataNascita\" value=\"" + dataNascita + "\"></input>");
        $("td[id$='" + pazienteClicked + "'][class$='luogoNascita']").empty().append("<input id=\"luogoNascita\" value=\"" + luogoNascita + "\"></input>");
        $("td[id$='" + pazienteClicked + "'][class$='citta']").empty().append("<input id=\"citta\" value=\"" + citta + "\"></input>");
        $("td[id$='" + pazienteClicked + "'][class$='indirizzo']").empty().append("<input id=\"indirizzo\" value=\"" + indirizzo + "\"></input>");
      }
  } else if($(this).prop("checked") == false) {
      console.log("Checkbox " + pazienteClicked + " is unchecked.");

      let newNome = $("input[id$='nome']").val();
      let newCognome = $("input[id$='cogn']").val();
      let newEta = $("input[id$='eta']").val();
      let newDataNascita = $("input[id$='dataNascita']").val();
      let newLuogoNascita = $("input[id$='luogoNascita']").val();
      let newCitta = $("input[id$='citta']").val();
      let newIndirizzo = $("input[id$='indirizzo']").val();

      console.log("newNome: " + newNome + "\n" +
        "newCognome: " + newCognome + "\n" +
        "newEta: " + newEta + "\n" +
        "newDataNascita: " + newDataNascita + "\n" +
        "newLuogoNascita: " + newLuogoNascita + "\n" +
        "newCitta: " + newCitta + "\n" +
        "newIndirizzo: " + newIndirizzo);

      let pathPaziente = db.ref("pazienti/" + pazienteClicked + "/generalita");
      let generalitaUpdated = {
        "cognome": newCognome,
        "dataNascita": fromSimpletoLongDate(newDataNascita),
        "eta": newEta,
        "luogoNascita": newLuogoNascita,
        "luogoResidenza": [
          {
            "city": newCitta,
            "street-address": newIndirizzo
          }
        ],
        "nome": newNome
      };

      pathPaziente.update(generalitaUpdated);

      $("td[id$='" + pazienteClicked + "'][class$='nome']").empty().append(newNome);
      $("td[id$='" + pazienteClicked + "'][class$='cogn']").empty().append(newCognome);
      $("td[id$='" + pazienteClicked + "'][class$='eta']").empty().append(newEta);
      $("td[id$='" + pazienteClicked + "'][class$='dataNascita']").empty().append(newDataNascita);
      $("td[id$='" + pazienteClicked + "'][class$='luogoNascita']").empty().append(newLuogoNascita);
      $("td[id$='" + pazienteClicked + "'][class$='citta']").empty().append(newCitta);
      $("td[id$='" + pazienteClicked + "'][class$='indirizzo']").empty().append(newIndirizzo);

      let result = confirm("Modifiche effettuate");
      $("p#updatePage").css('visibility', 'visible');

      $("input[type$=\"checkbox\"]").prop('disabled', true);
      if (result) {
          location.reload();
      }
  }

  console.log(pazienteClicked);
});

// Perche'?
// $("body").on( "click", "button", () => {
//   alert( "Triggred by " + $(this).text() );
// });

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

// button sign in Google
  $('#btnLogout').click(function() {
    signOut();
  });

  //sign out
function signOut() {
  firebase.auth().signOut().then(function() {
    window.location.href = 'http://amicoassistente.altervista.org';
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
  $('#welcomeUser').html(email);
  console.log('Email: ' + email + ' Email Verified: ' + emailVerified + ' Uid: ' + uid + ' Provider: ' + providerData);
} else {
  console.log('No user.');
  window.location.href = 'http://amicoassistente.altervista.org';
}
});
