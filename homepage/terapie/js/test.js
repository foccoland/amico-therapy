let str = "4 Febbraio 1993";
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

console.log(fromSimpletoLongDate(str));

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
