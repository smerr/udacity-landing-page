/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**Define Global Variables*/

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active

document.addEventListener("DOMContentLoaded", function () {
  // this function runs when the DOM is ready, i.e. when the document has been parsed
  document.getElementById("user-greeting").textContent = "Welcome back, Bart";
});

let main = document.getElementsByTagName("main");
main = main[0];
let navElement = main.getElementsByTagName("section");
let newSection = navElement[0].dataset.nav;

let li = document.createElement("li");
let ul = document.getElementsByTagName("ul");
ul[0].appendChild(li);
