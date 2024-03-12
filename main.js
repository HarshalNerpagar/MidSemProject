const mainImgContainer = document.querySelector(".image-container");
const mainImg = document.querySelector(".main-image");
const planetTitle = document.querySelector(".section__info--title");
const mainContent = document.querySelector(".section__info--text_content");
const source = document.querySelector(".section__info--text_source");
const rotation = document.querySelector(".rotation_text");
const revolution = document.querySelector(".revolution_text");
const radius = document.querySelector(".radius_text");
const temperature = document.querySelector(".temperature_text");
const navBarButtons = document.querySelectorAll(".nav__link");
const navList = document.querySelector(".nav__list");
const menuButton = document.querySelector(".hamburger_menu");
const sectionInfoButtons = document.querySelectorAll(".section-button");
const sectionInfoButtonsText = document.querySelectorAll(".button_text");
const rootStyles = getComputedStyle(document.documentElement);
const surfaceGeologyImg = document.createElement("img");
let currentWidth = window.innerWidth;
let data = null;

axios
  .get("data.json")
  .then((response) => {
    data = response.data;
    displayPlanetsData("EARTH");
  })
  .catch((err) => {
    console.log(err);
  });

window.addEventListener("resize", function () {
  currentWidth = window.innerWidth;
  removeStyle();
  sectionInfoButtonsStyle(planetTitle.innerText);
  positionImg(planetTitle.innerText);
});

navBarButtons.forEach((button) => {
  button.addEventListener("click", function () {
    switch (button.innerText) {
      case "VENUS":
        removeClasses();
        removeStyle();
        removeSurfaceGeologyImg();
        displayPlanetsData("VENUS");
        break;
      case "EARTH":
        removeClasses();
        removeStyle();
        removeSurfaceGeologyImg();
        displayPlanetsData("EARTH");
        break;
      case "MARS":
        removeClasses();
        removeStyle();
        removeSurfaceGeologyImg();
        displayPlanetsData("MARS");
        break;
      case "JUPITER":
        removeClasses();
        removeStyle();
        removeSurfaceGeologyImg();
        displayPlanetsData("JUPITER");
        break;
      case "SATURN":
        removeClasses();
        removeStyle();
        removeSurfaceGeologyImg();
        displayPlanetsData("SATURN");
        break;
      case "URANUS":
        removeClasses();
        removeStyle();
        removeSurfaceGeologyImg();
        displayPlanetsData("URANUS");
        break;
      case "NEPTUNE":
        removeClasses();
        removeStyle();
        removeSurfaceGeologyImg();
        displayPlanetsData("NEPTUNE");
        break;
      default:
        removeClasses();
        removeStyle();
        removeSurfaceGeologyImg();
        displayPlanetsData("MERCURY");
    }
  });
});

function displayPlanetsData(planet) {
  const planets = [
    "MERCURY",
    "VENUS",
    "EARTH",
    "MARS",
    "JUPITER",
    "SATURN",
    "URANUS",
    "NEPTUNE",
  ];

  sectionInfoButtons.forEach((button) => {
    button.addEventListener("click", function () {
      switch (button.classList[0]) {
        case "internal":
          // -------Display the main image---------
          removeSurfaceGeologyImg();
          fadeOutImage(() => {
            mainImg.src = data[planets.indexOf(planet)].images.internal;
            fadeInImage();
          });
          mainImg.alt = `internal structure of ${planet}`;

          // -------Display the main text---------
          mainContent.innerText = data[planets.indexOf(planet)].structure.content;
          source.href = data[planets.indexOf(planet)].structure.source;

          // -------Add style for button---------
          sectionInfoButtonsStyle(planet);
          break;
        case "surface":
          // -------Display the surface geology image---------
          fadeOutImage(() => {
            mainImg.src = data[planets.indexOf(planet)].images.planet;
            fadeInImage();
          });
          positionSurfaceGeologyImg(planets, planet);

          // -------Display the main text---------
          mainContent.innerText = data[planets.indexOf(planet)].geology.content;
          source.href = data[planets.indexOf(planet)].geology.source;

          // ------Add style for button---------
          sectionInfoButtonsStyle(planet);
          break;
        default:
          // -------Display the main image---------
          removeSurfaceGeologyImg();
          fadeOutImage(() => {
            mainImg.src = data[planets.indexOf(planet)].images.planet;
            fadeInImage();
          });
          mainImg.alt = `planet ${planet}`;

          // -------Display the main text---------
          mainContent.innerText = data[planets.indexOf(planet)].overview.content;
          source.href = data[planets.indexOf(planet)].overview.source;

          // -------Add style for button---------
          sectionInfoButtonsStyle(planet);
      }
    });
  });
  // -------Display the main image---------
  fadeOutImage(() => {
    mainImg.src = data[planets.indexOf(planet)].images.planet;
    fadeInImage();
  });
  mainImg.alt = `planet ${planet}`;
  mainImg.classList.add(`${planet.toLowerCase()}-image`);

  // -------Display the main text---------
  planetTitle.innerText = data[planets.indexOf(planet)].name;
  mainContent.innerText = data[planets.indexOf(planet)].overview.content;
  source.href = data[planets.indexOf(planet)].overview.source;

  // -------Display additional information---------
  rotation.innerText = data[planets.indexOf(planet)].rotation;
  revolution.innerText = data[planets.indexOf(planet)].revolution;
  radius.innerText = data[planets.indexOf(planet)].radius;
  temperature.innerText = data[planets.indexOf(planet)].temperature;

  // -------Add focus classes---------
  navBarButtons[planets.indexOf(planet)].classList.add(
    `${planet.toLowerCase()}-focus`
  );

  // ------Add style for overview button---------
  sectionInfoButtonsStyle(planet);
}

menuButton.addEventListener("click", function () {
  navList.classList.toggle("nav__list-active");
  menuButton.classList.toggle("hamburger_menu-opacity");
});

function removeClasses() {
  navBarButtons.forEach((button) => {
    button.classList.remove("mercury-focus");
    button.classList.remove("venus-focus");
    button.classList.remove("earth-focus");
    button.classList.remove("mars-focus");
    button.classList.remove("jupiter-focus");
    button.classList.remove("saturn-focus");
    button.classList.remove("uranus-focus");
    button.classList.remove("neptune-focus");
  });
  mainImg.classList.remove("mercury-image");
  mainImg.classList.remove("venus-image");
  mainImg.classList.remove("earth-image");
  mainImg.classList.remove("mars-image");
  mainImg.classList.remove("jupiter-image");
  mainImg.classList.remove("saturn-image");
  mainImg.classList.remove("uranus-image");
  mainImg.classList.remove("neptune-image");
}

function removeStyle() {
  sectionInfoButtons.forEach((button) => {
    button.style.backgroundColor = "transparent";
    button.style.borderBottom = "";
  });
}

function removeSurfaceGeologyImg() {
  surfaceGeologyImg.remove();
}

function positionSurfaceGeologyImg(planets, planet) {
  positionImg(planet);
  surfaceGeologyImg.src = data[planets.indexOf(planet)].images.geology;
  mainImg.alt = `geology of planet ${planet}`;
  surfaceGeologyImg.classList.add("surface_geology-image");
  mainImgContainer.appendChild(surfaceGeologyImg);
}

function positionImg(planet) {
  if (planet === "JUPITER") {
    if (currentWidth <= 600) {
      surfaceGeologyImg.style.transform = "translate(-50%, 10%)";
    } else {
      surfaceGeologyImg.style.transform = "translate(-50%, -10%)";
    }
  } else if (planet === "SATURN") {
    if (currentWidth <= 600) {
      surfaceGeologyImg.style.transform = "translate(-50%, 10%)";
    } else {
      surfaceGeologyImg.style.transform = "translate(-50%, -35%)";
    }
  } else {
    if (currentWidth <= 600) {
      surfaceGeologyImg.style.transform = "translate(-50%, 10%)";
    } else if (currentWidth <= 955) {
      surfaceGeologyImg.style.transform = "translate(-50%, -27%)";
    } else {
      surfaceGeologyImg.style.transform = "translate(-50%, 30%)";
    }
  }
}

function sectionInfoButtonsStyle(planet) {
  let colorButton = rootStyles.getPropertyValue(
    `--${planet.toLowerCase()}-color`
  );

  switch (mainImg.alt.split(" ")[0]) {
    case "internal":
      if (currentWidth <= 600) {
        sectionInfoButtons[1].style.borderBottom = `4px solid ${colorButton}`;
        sectionInfoButtons[1].style.backgroundColor = "transparent";
      } else {
        sectionInfoButtons[1].style.backgroundColor = colorButton;
      }
      break;
    case "geology":
      if (currentWidth <= 600) {
        sectionInfoButtons[2].style.borderBottom = `4px solid ${colorButton}`;
        sectionInfoButtons[2].style.backgroundColor = "transparent";
      } else {
        sectionInfoButtons[2].style.backgroundColor = colorButton;
      }
      break;
    default:
      if (currentWidth <= 600) {
        sectionInfoButtons[0].style.borderBottom = `4px solid ${colorButton}`;
        sectionInfoButtons[0].style.backgroundColor = "transparent";
      } else {
        sectionInfoButtons[0].style.backgroundColor = colorButton;
      }
  }

  sectionInfoButtons.forEach((button) => {
    let children = button.children;
    let spaceIndex = children[1].innerText.indexOf(" ");

    if (currentWidth <= 600 && spaceIndex !== -1) {
      children[1].innerText = children[1].innerText.slice(spaceIndex + 1);
    } else {
      sectionInfoButtonsText[1].innerText = "INTERNAL STRUCTURE";
      sectionInfoButtonsText[2].innerText = "SURFACE GEOLOGY";
    }

    button.addEventListener("click", function () {
      removeStyle();
      if (currentWidth <= 600) {
        button.style.borderBottom = `4px solid ${colorButton}`;
        button.style.backgroundColor = "transparent";
      } else {
        button.style.backgroundColor = colorButton;
      }
    });
  });
}

function fadeOutImage(callback) {
  mainImg.style.opacity = 0;
  setTimeout(callback, 500);
}

function fadeInImage() {
  mainImg.style.opacity = 1;
}