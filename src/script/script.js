// Typing and appending new content

let phraseLength;
async function typePhrase(phrase, element, delay = 60) {
  const letters = phrase.split("");
  phraseLength = phrase.length;
  let i = 0;
  while (i < letters.length) {
    await waitForMs(delay);
    document.querySelector(element).append(letters[i]);
    i++;
  }
  return;
}

// Deleting new content

async function deletePhrase(element) {
  const sentence = document.querySelector(element).innerHTML;
  const letters = sentence.split("");

  for (let i = 0; i < phraseLength; i++) {
    await waitForMs(100);
    letters.pop();
    document.querySelector(element).innerHTML = letters.join("");
  }
}

// Async carousel for title
const carouselText = [
  { text: "Web Experiences." },
  { text: "Games." },
  { text: "Technical Ideas." },
];

async function carousel(carouselList, element) {
  let i = 0;
  while (true) {
    await waitForMs(1000);
    await typePhrase(carouselList[i].text, element);
    await waitForMs(1500);
    await deletePhrase(element);
    await waitForMs(500);
    i++;
    if (i >= carouselList.length) i = 0;
  }
}

carousel(carouselText, ".intro-title");

// Intro section - background interactive bubble functionality
let deltaMoveBubble = {};
let mousePosition = {
  x: 0,
  y: 0,
};
let previousMousePositionBubble = {
  x: 0,
  y: 0,
};
let bubble1 = {
  x: getOffset(document.querySelector(".bubble1")).left,
  y: getOffset(document.querySelector(".bubble1")).top,
  deltaXString: "",
  deltaYString: "",
};
let bubble2 = {
  x: getOffset(document.querySelector(".bubble2")).left,
  y: getOffset(document.querySelector(".bubble2")).top,
  deltaXString: "",
  deltaYString: "",
};
let bubble3 = {
  x: getOffset(document.querySelector(".bubble3")).left,
  y: getOffset(document.querySelector(".bubble3")).top,
  deltaXString: "",
  deltaYString: "",
};
let bubble4 = {
  x: getOffset(document.querySelector(".bubble4")).left,
  y: getOffset(document.querySelector(".bubble4")).top,
  deltaXString: "",
  deltaYString: "",
};
let bubble5 = {
  x: getOffset(document.querySelector(".bubble5")).left,
  y: getOffset(document.querySelector(".bubble5")).top,

  deltaXString: "",
  deltaYString: "",
};

// Set opacity of bubbles to 100%
const bubbles = document.querySelectorAll(".bubble");
setTimeout(() => {
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].style.opacity = "100%";
  }
}, 1500);

document.addEventListener("mousemove", function (e) {
  mousePosition = {
    x: e.pageX,
    y: e.pageY,
  };
  deltaMoveBubble = {
    x: e.pageX - previousMousePositionBubble.x,
    y: e.pageY - previousMousePositionBubble.y,
  };

  moveMouse(mousePosition);

  moveBubble(bubble1, ".bubble1", 50);
  moveBubble(bubble2, ".bubble2", 25);
  moveBubble(bubble3, ".bubble3", 10);
  moveBubble(bubble4, ".bubble4", 50);
  moveBubble(bubble5, ".bubble5", 5);

  previousMousePositionBubble = {
    x: e.pageX,
    y: e.pageY,
  };
});

function moveBubble(bubble, bubbleHTML, zPos) {
  bubble.x += deltaMoveBubble.x / zPos;
  bubble.y += deltaMoveBubble.y / zPos;
  bubble.deltaXString = bubble.x.toString() + "px";
  bubble.deltaYString = bubble.y.toString() + "px";

  document.querySelector(bubbleHTML).style.left = bubble.deltaXString;

  document.querySelector(bubbleHTML).style.top = bubble.deltaYString;
}

function moveMouse(mousePos) {
  document.querySelector(".mouse-hover").style.left = mousePos.x + "px";
  document.querySelector(".mouse-hover").style.top = mousePos.y + "px";
}

function getOffset(element) {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
  };
}

function waitForMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { typePhrase };

// ROTATE HEADER EFFECTS
const mountHeaderAndRotateX = () => {
  window.addEventListener("load", () => {
    const title = document.getElementById("threed-title");
    title.classList.add("rotate180x");
  });
};

mountHeaderAndRotateX();

// Remove the black cover from front screen
const blackScreen = document.querySelector(".black-cover");
setTimeout(() => {
  blackScreen.style.opacity = "0%";
}, 1000);
setTimeout(() => {
  blackScreen.style.display = "none";
}, 2000);

// RECENT WORKS SECTION

// Sets horizontal scroll position along with vertical movement
const scrollRecentWorksSectionOnMainPageScroll = () => {
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      const scrollBarObject = document
        .getElementById("scrolling-flex")
        .scrollBy(1, 0);
    } else if (scrollTop < lastScrollTop) {
      document.getElementById("scrolling-flex").scrollBy(-1, 0);
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
};

scrollRecentWorksSectionOnMainPageScroll();
