"use strict";

var closeEl = document.getElementById("close"),
  navMobileCloseEl = document.getElementById("nav-mobile");
closeEl.addEventListener("click", function () {
  navMobileCloseEl.style.display = "none";
});
var hamburgerEl = document.getElementById("hamburger"),
  navMobileEl = document.getElementById("nav-mobile");
hamburgerEl.addEventListener("click", function () {
  navMobileEl.style.display = "block";
}), console.log("Hej");