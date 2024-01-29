"use strict";

const url = "https://dahlgren.miun.se/ramschema_ht23.php";
let cProgEl = document.getElementById("cProg");
let cCodeEl = document.getElementById("cCode");
let cNameEl = document.getElementById("cName");
let searchFieldEl = document.getElementById("search-field");
let sortDirection = true;

window.onload = init;

async function init() {
  try {
    const response = await fetch(url);
    let scheduleList = await response.json();

    //Eventlyssnare för sortering
    cProgEl.addEventListener("click", function () {
      sortDirection = !sortDirection;
      sortArrayByProgression(scheduleList);
      displaySchedule(scheduleList);
    });

    cCodeEl.addEventListener("click", function () {
      sortDirection = !sortDirection;
      sortArrayByCode(scheduleList);
      displaySchedule(scheduleList);
    });

    cNameEl.addEventListener("click", function () {
      sortDirection = !sortDirection;
      sortArrayByName(scheduleList);
      displaySchedule(scheduleList);
    });

    //Filtera vid sökning
    searchFieldEl.addEventListener("input", function () {
      let searchInput = searchFieldEl.value;

      displaySchedule(filterSchedule(scheduleList, searchInput));
    });

    sortArrayByName(scheduleList);
    displaySchedule(scheduleList);
  } catch {
    document.getElementById("error").innerHTML = "<p>Något gick fel...</p>";
  }
}

function filterSchedule(schedule, searchInput) {
  return schedule.filter((schedule) => {
    let name = schedule.coursename.toLowerCase();
    let code = schedule.code.toLowerCase();

    return (
      name.includes(searchInput.toLowerCase()) ||
      code.includes(searchInput.toLowerCase())
    );
  });
}

function displaySchedule(schedule) {
  const scheduleListEl = document.getElementById("schedule-list");
  scheduleListEl.innerHTML = "";

  schedule.forEach((schedule) => {
    scheduleListEl.innerHTML += `
        <tr>
            <td>${schedule.code}</td>
            <td>${schedule.coursename}</td>
            <td>${schedule.progression}</td>
        </tr>
        `;
  });
}

//Sortera lista efter namn
function sortArrayByName(schedule) {
  if (sortDirection) {
    schedule.sort((a, b) => (a.coursename > b.coursename ? 1 : -1));
  } else {
    schedule.sort((a, b) => (a.coursename > b.coursename ? 1 : -1)).reverse();
  }
}

function sortArrayByCode(schedule) {
  if (sortDirection) {
    schedule.sort((a, b) => (a.code > b.code ? 1 : -1));
  } else {
    schedule.sort((a, b) => (a.code > b.code ? 1 : -1)).reverse();
  }
}

function sortArrayByProgression(schedule) {
  if (sortDirection) {
    schedule.sort((a, b) => (a.progression > b.progression ? 1 : -1));
  } else {
    schedule.sort((a, b) => (a.progression > b.progression ? 1 : -1)).reverse();
  }
}
