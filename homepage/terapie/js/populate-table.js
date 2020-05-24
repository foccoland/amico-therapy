
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
var datiPazienti;
var switched = false;
var loaded = false;

//********************* jQuery *************************

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

$(document).ready(function() {

    let pazienti = db.ref('pazienti');

    pazienti.on('value', snapshot => {
      let datiPazienti = snapshot.val();
      var link = "";
      pazientiIDs = Object.keys(datiPazienti);
      pazientiIDs.forEach(item => {
        let nome = _.get(datiPazienti, item + '.generalita.nome');
        let cognome = _.get(datiPazienti, item + '.generalita.cognome');
        if (nome != null || cognome != null) {
          link = link.concat("<a href=\"#terapieGiornaliere\" id=\"" + item + "\">" + nome + " " + cognome + "</a>");
        }
      });
      $('#myDropdown').append(link);
    });

    $("body").on("click", "a", function(event) {

      let pazienti = db.ref('pazienti');
      pazienti.on('value', snapshot => {
        $('#terapieBody').css('display', 'block');
        let idPaziente = event.target.id;

        let datiPazienti = snapshot.val();

        let terapieGiornaliere = _.get(datiPazienti, idPaziente + ".terapie.giornaliera");
        let terapieIntervallari = _.get(datiPazienti, idPaziente + ".terapie.intervallare");

        var trGiornaliere = "";
        var trIntervallari = "";

        //Catturo dati solo se sono state compilate le terapie
        if (_.has(datiPazienti, idPaziente + ".terapie.giornaliera")) {
          terapieGiornaliere.forEach((terapia, i) => {
            let descrizione = terapia.descrizione;
            let farmaco = terapia.farmaco;
            let orario = getTime(terapia.orario);

            console.log(orario);
            console.log(terapia.orario);

            trGiornaliere = trGiornaliere.concat("<tr");
            trGiornaliere = trGiornaliere.concat(" id=\"" + "tg" + i.toString() + idPaziente + "\">");
            trGiornaliere = trGiornaliere.concat("<td class=\"descrizione\" id=" + "tg" + i.toString() + idPaziente + ">" + descrizione + "</td>");
            trGiornaliere = trGiornaliere.concat("<td class=\"farmaco\" id=" + "tg" + i.toString() + idPaziente + ">" + farmaco + "</td>");
            trGiornaliere = trGiornaliere.concat("<td class=\"orario\" id=" + "tg" + i.toString() + idPaziente + ">" + orario + "</td>");
            trGiornaliere = trGiornaliere.concat("<td><label class=\"switch\"><input type=\"checkbox\" id=\"" + "tg" + i.toString() + idPaziente + "\"><span class=\"slider round\"></span></label></td>");
            trGiornaliere = trGiornaliere.concat("<td><button type=\"button\" class=\"btn btnDeleteTerapia\" name=\"button\" id=\"" + "tg" + i.toString() + idPaziente + "\"><i class=\"fas fa-trash fa-lg\"></i></button></td>");
            trGiornaliere = trGiornaliere.concat("</tr>");
          });
        }

        if (_.has(datiPazienti, idPaziente + ".terapie.intervallare")) {
          terapieIntervallari.forEach((terapia, i) => {
            let descrizione = terapia.descrizione;
            let farmaco = terapia.farmaco;
            let giorni = terapia.giorni;
            let orario = getTime(terapia.orario);

            console.log(orario);

            trIntervallari = trIntervallari.concat("<tr");
            trIntervallari = trIntervallari.concat(" id=\"" + "ti" + i.toString() + idPaziente + "\">");
            trIntervallari = trIntervallari.concat("<td class=\"descrizione\" id=" + "ti" + i.toString() + idPaziente + ">" + descrizione + "</td>");
            trIntervallari = trIntervallari.concat("<td class=\"farmaco\" id=" + "ti" + i.toString() + idPaziente + ">" + farmaco + "</td>");
            trIntervallari = trIntervallari.concat("<td class=\"giorni\" id=" + "ti" + i.toString() + idPaziente + ">" + giorni + "</td>");
            trIntervallari = trIntervallari.concat("<td class=\"orario\" id=" + "ti" + i.toString() + idPaziente + ">" + orario + "</td>");
            trIntervallari = trIntervallari.concat("<td><label class=\"switch\"><input type=\"checkbox\" id=\"" + "ti" + i.toString() + idPaziente + "\"><span class=\"slider round\"></span></label></td>");
            trIntervallari = trIntervallari.concat("<td><button type=\"button\" class=\"btn btnDeleteTerapia\" name=\"button\" id=\"" + "ti" + i.toString() + idPaziente + "\"><i class=\"fas fa-trash fa-lg\"></i></button></td>");
            trIntervallari = trIntervallari.concat("</tr>");
          });
        }

        // Una volta cliccato lo switch non aggiunge più tutti gli elementi su Firebase
        if (!switched) {
          // La tabella verrà caricata al primo caricamento della pagina;
          // Poichè firebase.database.ref.on() è sempre in ascolto, è
          // doveroso evitare il caricamento per ogni evento di firebase
          if (!loaded) {
            $('#terapieGiornaliereTable tbody').append(trGiornaliere);
            $('#terapieIntervallariTable tbody').append(trIntervallari);
            loaded = true;
          } else {
            $('#terapieGiornaliereTable tbody').empty().append(trGiornaliere);
            $('#terapieIntervallariTable tbody').empty().append(trIntervallari);
          }
          //Al termine del caricamento svanisce la gif
          $('img#loading').hide();
        }

        $('body').on('click', 'button[class$=\'btn btnDeleteTerapia\']', function() {
          console.log('cliccato elimina terapia');
          let id = event.target.id;
          let terapiaClicked = $(this).attr('id');
          console.log('id; ' + id + '\n' + 'terapiaClicked: ' + terapiaClicked);
          var pathTerapia = db.ref("pazienti/" + terapiaClicked.slice(3).toString() + "/terapie/giornaliera/" + terapiaClicked.slice(2,3));
          pathTerapia.remove();
        });

        $("body").on("click", "input[type=\"checkbox\"]", function() {
          let terapiaClicked = $(this).attr('id');

          if($(this).prop("checked") == true) {
              console.log("Checkbox " + terapiaClicked + " is checked.");

              if (terapiaClicked.slice(0,2) === "tg") {
                console.log(terapiaClicked.slice(2,3));
                console.log('Terapia giornaliera')
                var descrizione = $("td[id$='" + terapiaClicked + "'][class$='descrizione']").text();
                var farmaco = $("td[id$='" + terapiaClicked + "'][class$='farmaco']").text();
                var orario = $("td[id$='" + terapiaClicked + "'][class$='orario']").text();
              } else {
                console.log(terapiaClicked.slice(2,3));
                console.log('Terapia intervallare')
                var descrizione = $("td[id$='" + terapiaClicked + "'][class$='descrizione']").text();
                var farmaco = $("td[id$='" + terapiaClicked + "'][class$='farmaco']").text();
                var giorni = $("td[id$='" + terapiaClicked + "'][class$='giorni']").text();
                var orario = $("td[id$='" + terapiaClicked + "'][class$='orario']").text();
              }

              if (switched == false) {
                switched = true;

                if (terapiaClicked.slice(0,2) === "tg") {
                  $("td[id$='" + terapiaClicked + "'][class$='descrizione']").empty().append("<input id=\"descrizione\" value=\"" + descrizione + "\"></input>");
                  $("td[id$='" + terapiaClicked + "'][class$='farmaco']").empty().append("<input id=\"farmaco\" value=\"" + farmaco + "\"></input>");
                  $("td[id$='" + terapiaClicked + "'][class$='orario']").empty().append("<input id=\"orario\" value=\"" + orario + "\"></input>");
                } else {
                  $("td[id$='" + terapiaClicked + "'][class$='descrizione']").empty().append("<input id=\"descrizione\" value=\"" + descrizione + "\"></input>");
                  $("td[id$='" + terapiaClicked + "'][class$='farmaco']").empty().append("<input id=\"farmaco\" value=\"" + farmaco + "\"></input>");
                  $("td[id$='" + terapiaClicked + "'][class$='giorni']").empty().append("<input id=\"giorni\" value=\"" + giorni + "\"></input>");
                  $("td[id$='" + terapiaClicked + "'][class$='orario']").empty().append("<input id=\"orario\" value=\"" + orario + "\"></input>");
                }

              }
          } else if($(this).prop("checked") == false) {
              console.log("Checkbox " + terapiaClicked + " is unchecked.");

              if (terapiaClicked.slice(0,2) === "tg") {
                var newDescrizione = $("input[id$='descrizione']").val();
                var newFarmaco = $("input[id$='farmaco']").val();
                var newOrario = $("input[id$='orario']").val();
              } else {
                console.log(terapiaClicked.slice(2,3));
                console.log('Terapia intervallare')
                var newDescrizione = $("input[id$='descrizione']").val();
                var newFarmaco = $("input[id$='farmaco']").val();
                var newGiorni = $("input[id$='giorni']").val();
                var newOrario = $("input[id$='orario']").val();
              }

              console.log("newDescrizione: " + newDescrizione + "\n" +
                "newFarmaco: " + newFarmaco + "\n" +
                "newOrario: " + newOrario + "\n" +
                "newGiorni: " + newGiorni);

              console.log(terapiaClicked.slice(3).toString());

              if (terapiaClicked.slice(0,2) === "tg") {
                var pathTerapia = db.ref("pazienti/" + terapiaClicked.slice(3).toString() + "/terapie/giornaliera/" + terapiaClicked.slice(2,3));
                var terapiaUpdated = {
                  "descrizione": newDescrizione,
                  "farmaco": newFarmaco,
                  "orario": fromSimpletoLongTime(newOrario)
                };
                pathTerapia.update(terapiaUpdated);
              } else {
                var pathTerapia = db.ref("pazienti/" + terapiaClicked.slice(3).toString() + "/terapie/intervallare/" + terapiaClicked.slice(2,3));
                var terapiaUpdated = {
                  "descrizione": newDescrizione,
                  "farmaco": newFarmaco,
                  "giorni": [newGiorni],
                  "orario": fromSimpletoLongTime(newOrario)
                };
                pathTerapia.update(terapiaUpdated);
              }



              if (terapiaClicked.slice(0,2) === "tg") {
                $("td[id$='" + terapiaClicked + "'][class$='descrizione']").empty().append(newFarmaco);
                $("td[id$='" + terapiaClicked + "'][class$='farmaco']").empty().append(newFarmaco);
                $("td[id$='" + terapiaClicked + "'][class$='orario']").empty().append(newOrario);
              } else {
                $("td[id$='" + terapiaClicked + "'][class$='descrizione']").empty().append(newFarmaco);
                $("td[id$='" + terapiaClicked + "'][class$='farmaco']").empty().append(newFarmaco);
                $("td[id$='" + terapiaClicked + "'][class$='giorni']").empty().append(newGiorni);
                $("td[id$='" + terapiaClicked + "'][class$='orario']").empty().append(newOrario);
              }

              let result = confirm("Modifiche effettuate");
              $("p#updatePage").css('visibility', 'visible');

              $("input[type$=\"checkbox\"]").prop('disabled', true);
              if (result) {
                  location.reload();
              }
          }

          console.log(terapiaClicked);
        });


        $('#btnAddTerapiaGiornaliera').click(function() {
          $(this).attr('disabled', 'disabled');
          var tr = "";

          tr = tr.concat("<tr");
          tr = tr.concat(" id=\"" + "terapiaGiornaliera" + "\">");
          tr = tr.concat("<td class=\"descrizione\" id=" + "terapiaGiornaliera" + ">" + "<input id=\"descrizione\" value=\"\"></input>" + "</td>");
          tr = tr.concat("<td class=\"farmaco\" id=" + "terapiaGiornaliera" + ">" + "<input id=\"farmaco\" value=\"\"></input>" + "</td>");
          tr = tr.concat("<td class=\"orario\" id=" + "terapiaGiornaliera" + ">" + "<input id=\"orario\" value=\"\"></input>" + "</td>");
          tr = tr.concat("<td><button id=\"btnConfermaTerapiaGiornaliera\" type=\"button\" style=\"color: #5FA082\" class=\"btn btnConfermaTerapiaGiornaliera\" name=\"confermaTerapiaGiornaliera\"><i class=\"fas fa-plus-square fa-2x\"></i></button></td>");
          tr = tr.concat("<td></td>");
          tr = tr.concat("</tr>");

          $('#terapieGiornaliereTable tbody').append(tr);
          window.location = '#btnAddTerapiaGiornaliera';
        });

        $('#btnAddTerapiaIntervallare').click(function() {
          $(this).attr('disabled', 'disabled');
          var tr = "";

          tr = tr.concat("<tr");
          tr = tr.concat(" id=\"" + "terapiaIntervallare" + "\">");
          tr = tr.concat("<td class=\"descrizione\" id=" + "terapiaIntervallare" + ">" + "<input id=\"descrizione\" value=\"\"></input>" + "</td>");
          tr = tr.concat("<td class=\"farmaco\" id=" + "terapiaIntervallare" + ">" + "<input id=\"farmaco\" value=\"\"></input>" + "</td>");
          tr = tr.concat("<td class=\"giorni\" id=" + "terapiaIntervallare" + ">" + "<input id=\"giorni\" value=\"\"></input>" + "</td>");
          tr = tr.concat("<td class=\"orario\" id=" + "terapiaIntervallare" + ">" + "<input id=\"orario\" value=\"\"></input>" + "</td>");
          tr = tr.concat("<td><button id=\"btnConfermaTerapiaIntervallare\" type=\"button\" style=\"color: #5FA082\" class=\"btn btnConfermaTerapiaIntervallare\" name=\"confermaTerapiaIntervallare\"><i class=\"fas fa-plus-square fa-2x\"></i></button></td>");
          tr = tr.concat("<td></td>");
          tr = tr.concat("</tr>");

          $('#terapieIntervallariTable tbody').append(tr);
          window.location = '#btnAddTerapiaIntervallare';
        });

        $('body').on('click', 'button[id$=\'btnConfermaTerapiaGiornaliera\']', function() {

          var descrizione = $('input#descrizione').val();
          var farmaco = $('input#farmaco').val();
          var orario = $('input#orario').val();

          var path = db.ref('pazienti/' + idPaziente + '/terapie/giornaliera');
          path.once('value').then(snapshot => {
            let terapieGiornaliereArray = snapshot.val();
            terapieGiornaliereArray.push({
              descrizione: descrizione,
              farmaco: farmaco,
              orario: fromSimpletoLongTime(orario)
            });
            path.update(terapieGiornaliereArray);
            let result = confirm('Terapia aggiunta. La pagina verrà aggiornata');
            if (result) {
              window.location.reload();
            }
          });
        });

        $('body').on('click', 'button[id$=\'btnConfermaTerapiaIntervallare\']', function() {

          var descrizione = $('input#descrizione').val();
          var farmaco = $('input#farmaco').val();
          var giorni = $('input#giorni').val();
          var orario = $('input#orario').val();

          var path = db.ref('pazienti/' + idPaziente + '/terapie/intervallare');
          path.once('value').then(snapshot => {
            let terapieIntervallariArray = snapshot.val();
            terapieIntervallariArray.push({
              descrizione: descrizione,
              farmaco: farmaco,
              giorni: giorni,
              orario: fromSimpletoLongTime(orario)
            });
            path.update(terapieIntervallariArray);
            let result = confirm('Terapia aggiunta. La pagina verrà aggiornata');
            if (result) {
              window.location.reload();
            }
          });

        });

      });

    });
});



function getTime(time) {
  let regularTime = "";
  if (Array.isArray(time)) {
      time.forEach((singleTime, i) => {
        if (i !== time.length - 1) {
          regularTime = regularTime.concat('Ore ');
          regularTime = regularTime.concat(singleTime.slice(11, 13) + ", ");
        } else {
          regularTime = regularTime.concat('Ore ');
          regularTime = regularTime.concat(singleTime.slice(11, 13));
        }
      });
  } else {
    regularTime = regularTime.concat('Ore ');
    regularTime = regularTime.concat(time.toString().slice(11, 13));
  }
  return regularTime;
}

function fromSimpletoLongTime(simpleTime) {
  if (simpleTime.length > 4) {
    let hours = simpleTime.split(", ");
    hours.forEach((hour, i) => {
      hours[i] = "placeholder" + hour.slice(4, 6);
    });
    return hours;
  } else {
    let hour = "placeholder" + hour.slice(4, 6);
    return hour;
  }
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
