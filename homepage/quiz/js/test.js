const _ = require('./lodash.js');

let quiz = {
  "musica" : {
    "titoloMusica1" : {
      "domande" : [ {
        "domanda" : "domanda1",
        "media" : "audio",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "123456"
      }, {
        "domanda" : "domanda2",
        "media" : "audio",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "123456"
      }, {
        "domanda" : "domanda3",
        "media" : "audio",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "123456"
      }, {
        "domanda" : "domanda4",
        "media" : "audio",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "123456"
      }, {
        "domanda" : "domanda5",
        "media" : "audio",
        "rispostaCorretta" : "",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "123456"
      } ]
    },
    "titoloMusica2" : {
      "domande" : [ {
        "domanda" : "domanda1",
        "media" : "audio",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "234567"
      }, {
        "domanda" : "domanda2",
        "media" : "audio",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "234567"
      }, {
        "domanda" : "domanda3",
        "media" : "audio",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "234567"
      }, {
        "domanda" : "domanda4",
        "media" : "audio",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "234567"
      }, {
        "domanda" : "domanda5",
        "media" : "audio",
        "rispostaCorretta" : "",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "234567"
      } ]
    }
  },
  "storie" : {
    "titoloStoria1" : {
      "domande" : [ {
        "domanda" : "domanda1",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "345678"
      }, {
        "domanda" : "domanda2",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "345678"
      }, {
        "domanda" : "domanda3",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "345678"
      }, {
        "domanda" : "domanda4",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "345678"
      }, {
        "domanda" : "domanda5",
        "rispostaCorretta" : "",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "345678"
      } ],
      "testo" : "testo"
    },
    "titoloStoria2" : {
      "domande" : [ {
        "domanda" : "domanda1",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "456789"
      }, {
        "domanda" : "domanda2",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "456789"
      }, {
        "domanda" : "domanda3",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "456789"
      }, {
        "domanda" : "domanda4",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "456789"
      }, {
        "domanda" : "domanda5",
        "rispostaCorretta" : "",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "456789"
      } ],
      "testo" : "testo"
    }
  },
  "terapieMotorie" : {
    "titoloQuizMotorio1" : {
      "domande" : [ {
        "domanda" : "domanda1",
        "media" : "gif",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1" ],
        "id" : "567890"
      }, {
        "domanda" : "domanda2",
        "media" : "gif",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1" ],
        "id" : "567890"
      }, {
        "domanda" : "domanda3",
        "media" : "gif",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1" ],
        "id" : "567890"
      }, {
        "domanda" : "domanda4",
        "media" : "gif",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1" ],
        "id" : "567890"
      }, {
        "domanda" : "domanda5",
        "media" : "gif",
        "rispostaCorretta" : "",
        "risposteSbagliate" : [ "rispSbag1" ],
        "id" : "567890"
      } ]
    },
    "titoloQuizMotorio2" : {
      "domande" : [ {
        "domanda" : "domanda1",
        "media" : "gif",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1" ],
        "id" : "678901"
      }, {
        "domanda" : "domanda2",
        "media" : "gif",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1" ],
        "id" : "678901"
      }, {
        "domanda" : "domanda3",
        "media" : "gif",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1" ],
        "id" : "678901"
      }, {
        "domanda" : "domanda4",
        "media" : "gif",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1" ],
        "id" : "678901"
      }, {
        "domanda" : "domanda5",
        "media" : "gif",
        "rispostaCorretta" : "",
        "risposteSbagliate" : [ "rispSbag1" ],
        "id" : "678901"
      } ]
    }
  },
  "vip" : {
    "titoloQuizVip1" : {
      "domande" : [ {
        "domanda" : "domanda1",
        "media" : "immagine",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "789012"
      }, {
        "domanda" : "domanda2",
        "media" : "immagine",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "789012"
      }, {
        "domanda" : "domanda3",
        "media" : "immagine",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "789012"
      }, {
        "domanda" : "domanda4",
        "media" : "immagine",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "789012"
      } ]
    },
    "titoloQuizVip2" : {
      "domande" : [ {
        "domanda" : "domanda1",
        "media" : "immagine",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "890123"
      }, {
        "domanda" : "domanda2",
        "media" : "immagine",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "890123"
      }, {
        "domanda" : "domanda3",
        "media" : "immagine",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "890123"
      }, {
        "domanda" : "domanda4",
        "media" : "immagine",
        "rispostaCorretta" : "rispostaCorretta",
        "risposteSbagliate" : [ "rispSbag1", "rispSbag2" ],
        "id" : "890123"
      } ]
    }
  }
};

// function getIDDomanda(id) {
//   var categorie = Object.keys(quiz);
//   var objCategorie = Object.values(quiz);
//   objCategorie.forEach(categoria => {
//
//     var titoli = Object.keys(categoria);
//     var contenutoTitoli = Object.values(categoria);
//
//     contenutoTitoli.forEach((contenuto, i) => {
//       if (contenuto.domande[0].id  == id) {
//         // console.log(contenuto.domande[i].domanda);
//         // console.log(contenuto.domande[i].rispostaCorretta);
//         // console.log(contenuto.domande[i].risposteSbagliate[0]);
//         //
//         // contenuto.domande[i].domanda = 'Domanda2';
//         //
//         // console.log(contenuto.domande[i].domanda);
//       }
//       console.log(contenuto.domande[i]);
//     });
//   });
// }
// getIDDomanda("456789");

function getDomanda(categoria, titolo, riga) {
  console.log(_.get(quiz, categoria + "." + titolo + ".domande[" + riga + "]"));
}

getDomanda("vip", "titoloQuizVip2", 3);

// console.log(Object.keys(quiz.titoli));

/*****************************/
// Inserire questo nel codice definitivo
  $('#btnAddStoryQuiz').click(addStoryTable());
  // $('#btnAddMusicQuiz').click();
  // $('#btnAddVipQuiz').click();
  // $('#btnAddTerapiecQuiz').click();

  function addStoryTable() {
    var table = "";
    //Genero tabelle per ogni quiz/titolo aggiunto
    table = table.concat("<div class=\"table-responsive\" id=\"" + 'newTitolo' + "\">" +
    "<tr>" +
    "<p style=\"font-size: 30px; margin-left: 10px;\">" + 'newTitolo' + "</p>" +
    "</tr></div>");
    table = table.concat("<textarea id=\"" + 'newTitolo' + "TextArea" + "\" name=\"storia\" rows=\"8\" cols=\"80\"></textarea>");
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
      tr = tr.concat("<td class=\"domanda\" id=" + rowID + ">" + "<input id=\"domanda\" value=\"\"></input>" + "</td>");
      tr = tr.concat("<td class=\"rispostaCorretta\" id=" + rowID + ">" + "<input id=\"rispostaCorretta\" value=\"\"></input>" + "</td>");
      tr = tr.concat("<td class=\"rispostaSbagliata1\" id=" + rowID + ">" + "<input id=\"rispostaSbagliata1\" value=\"\"></input>" + "</td>");
      tr = tr.concat("<td class=\"rispostaSbagliata2\" id=" + rowID + ">" + "<input id=\"rispostaSbagliata2\" value=\"\"></input>" + "</td>");
      tr = tr.concat("<td><label class=\"switch\"><input type=\"checkbox\" id=" + rowID + "><span class=\"slider round\"></span></label></td>");
      tr = tr.concat("</tr>");
    }
    $('div#storie').append(table);
    $('#newTitoloTable tbody').append(tr);
  }
// fino a qui
