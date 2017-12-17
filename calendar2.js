var CurrentYear = 0;
var CurrentMonth = 0;

function getDaysInMonth(year, month) {
    "use strict";
    return new Date(year, month + 1, 0).getDate();
}
function getDayOfWeek(year, month) {
    "use strict";
    return new Date(year, month, 1).getDay();
}
function createArray(totalDays, DoW) {
    "use strict";
    var array1 = [];
    for (var a = 0; a < (DoW - 1); a++) {
        array1.push("");
    }
    for (var b = 0; b < totalDays; b++) {
        array1.push(b+1);
    }
    if ((array1.length / 7) % 1 !== 0) {
        while((array1.length / 7) % 1 !== 0) {
            array1.push("");
        }
    }
    var array = [];
    while(array1.length > 0) {
        array.push(array1.splice(0,7));
    }
    return array;
}

function writeHeaders(id) {
    "use strict";
    var Months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if(id !== null){
        document.getElementById(id).innerHTML = "<div class=\"buttons\"><a href=\"#\" onClick=\"changeMonth(-1)\"><</a>" + Months[CurrentMonth] + " " + CurrentYear + "<a href=\"#\" onClick=\"changeMonth(1)\">></a></div><table class=\"table\"><thead><tr><th scope=\"col\">M</th><th scope=\"col\">T</th><th scope=\"col\">W</th><th scope=\"col\">T</th><th scope=\"col\">F</th><th scope=\"col\">S</th><th scope=\"col\">S</th></thead><tbody id=\"tCalendarBody\"></tbody></table>";
    } else {
        console.log("id is not set");
    }
}

function writeRows(id, array) {
    "use strict";
    var output = "<tr>";
    //output = output + array;
    //    console.log(array[0].length);
    //console.log(array.length);
    output += "<tr>";
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array[0].length; j++) {
            output += "<td>" + array[i][j] + "</td>";
        }
        output += "</tr>";
    }
    //console.log(output);
    document.getElementById(id).innerHTML = output;
}

function createTable(finalArray, id) {
    "use strict";
    writeHeaders(id);
    writeRows("tCalendarBody", finalArray);
}

function calendar(id, inYear, inMonth) {
    "use strict";
    var month = null;
    var year = null;
    if(id !== null){
        if(month === null || year === null) {
            var date = new Date();
            month = date.getMonth();
            year = date.getFullYear();
        } else {
            month = inMonth;
            year = inYear;
        }
        createTable(createArray(getDaysInMonth(year,month), getDayOfWeek(year, month)), id);
    } else {
        console.log("ID for the calendar to load to must be parsed");
    }
}

function changeMonth(amount) {
    "use strict";
    CurrentMonth += amount;
    if(CurrentMonth == 12){
        CurrentMonth = 0;
        CurrentYear += 1;
    }
    if(CurrentMonth == -1) {
        CurrentMonth = 11;
        CurrentYear += -1;
    }
    calendar("test", CurrentYear, CurrentMonth);
}
