// Global variables
let alarmListArr = []; // Array to store alarm times
const selectMenu = document.querySelectorAll("select"); // Select elements for setting alarm time
const setAlarmBtn = document.querySelector("#btn-setAlarm"); // Button to set an alarm
let alarmCount =  0; // Counter for the number of alarms set
let alarmTime; // Variable to store the current alarm time
let ring = new Audio("audio/alarm.mp3"); // Audio object for the alarm sound

// Function to update the clock display
function updateClock(){
    // Get the current date and time
    let current = new Date();
    // Extract the day of the week, month, day of the month, year, hours, minutes, and seconds
    let dname = current.getDay(),
        mo = current.getMonth(),
        dnum = current.getDate(),
        yr = current.getFullYear(),
        hou = current.getHours(),
        min = current.getMinutes(),
        sec = current.getSeconds(),
        pe = "AM";

    // Convert hours to  12-hour format and determine AM/PM
    if(hou==0){
        hou =  12;
    }
    if(hou>12){
        hou -=12;
        pe = "PM";
    }

    // Function to pad numbers with leading zeros
    Number.prototype.pad = function(digits){
        for(var n = this.toString(); n.length<digits; n=0+n);
        return n;
    }

    // Arrays for month names, week days, and element IDs
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var week = ["Sunday", "Monday", "Tusday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var ids =["dayName", "month", "dayNum", "year", "hour", "minutes", "seconds", "period"];
    var values = [week[dname], months[mo], dnum.pad(2),yr,hou.pad(2),min.pad(2),sec.pad(2),pe];

    // Update the clock display elements with the current date and time
    for(var i=0; i<ids.length;i++){
        document.getElementById(ids[i]).firstChild.nodeValue = values[i];
    }

    // Check if the current time matches any alarm times and play the alarm if it does
    for(let i=0; i<alarmListArr.length;i++){
        if(alarmListArr[i]==`${hou.pad(2)}:${min.pad(2)}:${sec.pad(2)} ${pe}`){
            console.log("Alarm ringing...");
            ring.load();
            ring.play();
            document.querySelector("#stopAlarm").style.visibility= "visible";
        }
    }
}

// Function to initialize the clock display
function initClock() {
    updateClock();
    window.setInterval("updateClock()",1000);
}

// Populate the select menus with options for setting the alarm time
for(let i=12; i>0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=59; i>=0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=2; i>0;i--){
    let ampm = i==  1? "AM":"PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Function to set an alarm
function setAlarm(){
    document.querySelector("#alarm-h3").innerText = "Alarms";
    let time = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
    if(time.includes("setHour") || time.includes("setMinute") || time.includes("AM/PM")){
        alert("Please, Select Valide Input");
    }else{
        alarmCount++;
        document.querySelector(".alarmList").innerHTML += `
        <div class="alarmLog" id="alarm${alarmCount}">
            <span id="span${alarmCount}">${time}</span>
            <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
        </div>`;

        alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
        alarmListArr.push(alarmTime);
        console.log(document.querySelector(".btn-delete").value);
    }
}

// Event listener for the set alarm button
setAlarmBtn.addEventListener("click",setAlarm);

// Function to delete an alarm
function deleteAlarm(click_id){
    var element = document.getElementById("alarm"+click_id);
    var deleteIndex = alarmListArr.indexOf(document.querySelector("#span"+click_id).innerText);
    alarmListArr.splice(deleteIndex,1);
    element.remove();
}

// Function to stop the alarm
function stopAlarm(){
    ring.pause();
    document.querySelector("#stopAlarm").style.visibility= "hidden";
}