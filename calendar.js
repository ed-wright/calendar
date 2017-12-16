var CurrentYear = 0;
var CurrentMonth = 0;

function getDaysInMonth(year, month){
    return new Date(year, month + 1, 0).getDate();
}
function getDayOfWeek(year, month, type){
    var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if (type == 1){
        return daysOfWeek[new Date(year, month, 1).getDay()];
    } else {
        return new Date(year, month, 1).getDay();
    }
}
function createArray(totalDays, DoW){
    var NoOfDays = totalDays+(DoW-1);
    var NoOfWeeks = Math.ceil((NoOfDays)/7);


    //console.log(NoOfDays);
    var array1 = [];
    for(a  = 0; a < (DoW - 1); a++){
        array1.push("");
    }
    for(b = 0; b < totalDays; b++){
        array1.push(b+1);
    }
    if((array1.length/7)%1 != 0){
        while((array1.length/7)%1 != 0){
            array1.push("");
        }
    }
    var array = [];
    while(array1.length > 0){
        array.push(array1.splice(0,7));
    }
    return array;
}

function writeHeaders(id){
    var Months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    if(id != null){
        document.getElementById(id).innerHTML = '<div class="buttons"><a href="#" onClick="changeMonth(-1)"><</a>' + Months[CurrentMonth] + " " + CurrentYear + '<a href="#" onClick="changeMonth(1)">></a></div><table class="table"><thead><tr><th scope="col">M</th><th scope="col">T</th><th scope="col">W</th><th scope="col">T</th><th scope="col">F</th><th scope="col">S</th><th scope="col">S</th></thead><tbody id="tCalendarBody"></tbody></table>';
    } else {
        console.log("id is not set");
    }
}

function writeRows(id, array){
    var output = '<tr>';
    //output = output + array;
    //    console.log(array[0].length);
    //console.log(array.length);
    output += '<tr>';
    for(i = 0; i < array.length; i++){
        for(j = 0; j < array[0].length; j++){
            output += '<td>' + array[i][j] + '</td>';
        }
        output += '</tr>';
    }
    //console.log(output);
    document.getElementById(id).innerHTML = output;
}

function createTable(finalArray, id) {
    writeHeaders(id);
    writeRows("tCalendarBody", finalArray);
}

function calendar(id, year, month){
    if(id != null){
        if(year != null || month != null){
            CurrentYear = year;
            CurrentMonth = month;
            createTable(createArray(getDaysInMonth(year,month), getDayOfWeek(year, month,0)), id);
        } else {
            var today = new Date();
            CurrentMonth = today.getMonth()
            CurrentYear = today.getFullYear()
            createTable(createArray(getDaysInMonth(today.getFullYear(),today.getMonth()), getDayOfWeek(today.getFullYear(),today.getMonth(), 0)), id);
        }
    } else {
        console.log("ID for the calendar to load to must be parsed");
    }
}

function changeMonth(amount){
    CurrentMonth += amount;
    if(CurrentMonth == 12){
        CurrentMonth = 0;
        CurrentYear += 1;
    }
    if(CurrentMonth == -1){
        CurrentMonth = 11;
        CurrentYear += -1;
    }
    calendar("test", CurrentYear, CurrentMonth);
}

//window.onload = calendar("test");
