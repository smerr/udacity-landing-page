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

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Scroll to section on link click

// Set sections as active

// https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/
let lockScroll = false;
let lastScrollTimeout = false;

const activeClass = "active";
const menuItemClass = "menu__link";
const scrollOptions = { behavior: "smooth" };

function onLoad() {
  let main = document.getElementsByTagName("main")[0];
  let sectionElements = main.getElementsByTagName("section");

  for (const element of sectionElements) {
    const id = element.getAttribute("id");
    const newSection = element.dataset.nav;
    const li = document.createElement("li");
    const ul = document.getElementsByTagName("ul")[0];

    ul.appendChild(li);
    li.classList.add(menuItemClass);
    li.setAttribute("data-sectionid", id);
    li.appendChild(document.createTextNode(newSection));
  }

  document.getElementById("navbar__list").addEventListener("click", onNavClick);
}

function onNavClick(event) {
  const target = event.target;
  if (target.className.includes(menuItemClass)) {
    const section = document.getElementById(target.dataset.sectionid);
    const links = document.getElementsByClassName(menuItemClass);

    for (const link of links) {
      link.classList.remove(activeClass);
    }

    section.classList.add(activeClass);
    target.classList.add(activeClass);

    section.scrollIntoView(scrollOptions);
  }
}

function onScroll(event) {
  if (lockScroll) return;

  if (lastScrollTimeout) clearTimeout(lastScrollTimeout);

  lastScrollTimeout = setTimeout(() => {
    lockScroll = true;
    console.log("iHeight", window.innerHeight);
    console.log("iWidth", window.innerWidth);
    console.log("cHeight", document.documentElement.clientHeight);
    console.log("cWidth", document.documentElement.clientWidth);
    const allSections = document.getElementsByTagName("section");
    for (const section of allSections) {
      let bounding = section.getBoundingClientRect();
      let bool =
        bounding.top <= 1 &&
        bounding.left >= 0 &&
        bounding.bottom >=
          (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <=
          (window.innerWidth || document.documentElement.clientWidth);
      console.log(section.getAttribute("id"), bounding);
      console.log(bool);
    }
    lockScroll = false;
  }, 300);
}

document.addEventListener("scroll", onScroll, { passive: true });
document.addEventListener("DOMContentLoaded", onLoad);
