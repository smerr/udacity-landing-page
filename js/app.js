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

let lockScroll = false;
let lastScrollTimeout = false;

const activeClass = "active";
const menuItemClass = "menu__link";
const scrollOptions = { behavior: "smooth" };

function getNavBarList() {
  return document.getElementById("navbar__list");
}

function getAllSections() {
  return document.getElementsByTagName("section");
}

function getListItems() {
  return document.getElementsByClassName(menuItemClass);
}

function percentageInView(element) {
  // Get the relevant measurements and positions
  const scrollTop = window.scrollY;
  const viewportHeight = window.innerHeight;
  const elementOffsetTop = element.offsetTop;

  // Calculate percentage of the element that's been seen
  const distance = scrollTop + (viewportHeight - elementOffsetTop);

  // the difference
  return Math.abs(distance - viewportHeight);
}

function onLoad() {
  for (const element of getAllSections()) {
    const id = element.getAttribute("id");
    const newSection = element.dataset.nav;
    const li = document.createElement("li");
    const ul = getNavBarList();

    ul.appendChild(li);
    li.dataset.sectionid = id;
    li.classList.add(menuItemClass);
    li.appendChild(document.createTextNode(newSection));
  }

  document.getElementById("navbar__list").addEventListener("click", onNavClick);
}

function onNavClick(event) {
  const target = event.target;
  if (target.className.includes(menuItemClass)) {
    const section = document.getElementById(target.dataset.sectionid);

    for (const link of getListItems()) {
      link.classList.remove(activeClass);
    }

    target.classList.add(activeClass);
    section.classList.add(activeClass);

    section.scrollIntoView(scrollOptions);
  }
}

function onScroll() {
  if (lockScroll) return;

  if (lastScrollTimeout) {
    clearTimeout(lastScrollTimeout);
  }

  lastScrollTimeout = setTimeout(() => {
    lockScroll = true;

    let counter = 0;
    let falseCounter = 0;
    let activeSection = false;
    let smallestInViewValue = false;
    const sectionsInView = [];

    for (const section of getAllSections()) {
      counter++;

      const bounding = section.getBoundingClientRect();
      const bool = bounding.top < window.innerHeight && bounding.bottom >= 0;

      if (section.classList.contains(activeClass)) {
        activeSection = section;
      }

      if (!bool) {
        falseCounter++;
        section.classList.remove(activeClass);
      }

      if (bool) {
        const value = percentageInView(section);
        section.dataset.inView = value;
        sectionsInView.push(section);

        if (smallestInViewValue === false || smallestInViewValue > value) {
          smallestInViewValue = value;
        }
      }
    }

    for (const section of sectionsInView) {
      const value = section.dataset.inView;

      if (Number(value) === 0 || Number(value) === smallestInViewValue) {
        activeSection = section;
        section.classList.add(activeClass);
      } else {
        section.classList.remove(activeClass);
      }
    }

    for (const link of getListItems()) {
      const linkSectionId = link.dataset.sectionid;

      if (activeSection && linkSectionId === activeSection.getAttribute("id")) {
        link.classList.add(activeClass);
      } else link.classList.remove(activeClass);
    }

    if (activeSection && falseCounter === counter) {
      activeSection.classList.add(activeClass);
    }

    lockScroll = false;
  }, 300);
}

document.addEventListener("scroll", onScroll, { passive: true });
document.addEventListener("DOMContentLoaded", onLoad);
