function pitstop() {
    var tire = document.getElementById("tire").nodeValue;                       // tire stores the answer for-- At what kms tire was changed
    var coolant = document.getElementById("coolant").nodeValue;                 // coolant stores the answer for-- At what kms coolant was changed
    var oil = document.getElementById("oil").nodeValue;                         // oil stores the answer for-- At what kms oil was changed
    window.location.href = "map.html";                                          // function is used to store values entered by user in database and move to next page
}