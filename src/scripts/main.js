let lastScrollPosition = window.scrollY;

//Language
const btn_language = document.getElementById("btn_language");
const menu_language = document.getElementById("menu_language");
const icon_language = document.getElementById("icon_language");
const icon_close_language = document.getElementById("icon_close_language");
//Menu
const btn_menu = document.getElementById("btn_menu");
const menu_list = document.getElementById("menu_list");

//Gallery variables
const galleryThreshold = 1920;
let dragStartPositionX = undefined;
let dragEndPositionX = undefined;
const gallery_items = document.getElementById("gallery_items");
const gallery_buttons = gallery_items.getElementsByTagName("button");
const gallery_modal = document.getElementById("gallery_modal");
const modal_image = document.getElementById("modal_image");
const btn_gallery_previous = document.getElementById(
  "gallery_control_previous"
);
const btn_gallery_next = document.getElementById("gallery_control_next");
const gallery_path = "./dist/images/gallery/";
const gallery_sequence = [
  "AWII_Launch_054.png",
  "AWII_Launch_049.png",
  "AWII_Launch_020.png",
  "AWII_Launch_16-10-23_013.png",
  "AWII_Launch_16-10-23_036.png",
  "AWII_Launch_009.png",
];
let gallery_currentImg = null;

//  HEADER
//  Show/Hide Language Menu
btn_language.addEventListener("click", () => {
  menu_language.classList.toggle("language__menu--hidden");
  icon_language.classList.toggle("language__button__icon--hidden");
  icon_close_language.classList.toggle("close__icon--hidden");
});
//  Show/Hide Nav Menu
btn_menu.addEventListener("click", () => {
  menu_list.classList.toggle("menu__list--hidden");
  header_bar.classList.remove("header-bar--background-color-primary");
  if (!menu_list.classList.contains("menu__list--hidden"))
    header_bar.classList.add("header-bar--background-color-primary");
});

// SCROLLING
//  Header Bar
const header_bar = document.getElementById("header_bar");

let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
let ticking = false;
// Handle Scroll function
function handleScroll() {
  if (!ticking && menu_list.classList.contains("menu__list--hidden")) {
    window.requestAnimationFrame(() => {
      // Obter a posição atual de rolagem
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Determinar a direção da rolagem
      let scrollDirection = "none";
      // console.log(scrollTop);
      if (scrollTop > lastScrollTop) {
        scrollDirection = "down";
        header_bar.classList.add("header-bar--hidden");
      } else if (scrollTop < lastScrollTop) {
        scrollDirection = "up";
        header_bar.classList.remove("header-bar--hidden");
      }
      //  Change scroll bar style based on position
      if (scrollTop !== 0) {
        if (menu_list.classList.contains("menu__list--hidden")) {
          header_bar.classList.add("header-bar--background-color");
        } else {
          header_bar.classList.add("header-bar--background-color-primary");
        }
      } else {
        header_bar.classList.remove(
          "header-bar--background-color",
          "header-bar--background-color-primary"
        );
      }
      // Atualizar a posição de rolagem anterior
      lastScrollTop = scrollTop;
      // console.log("Direção de rolagem: " + scrollDirection);
      ticking = false;
    });
    ticking = true;
  }
}
// Scrolling Event
window.addEventListener("scroll", handleScroll);

//  GALLERY
//  Upadte image function
function updateImage() {
  modal_image.src = `${gallery_path}${gallery_sequence[gallery_currentImg]}`;
}
//  Returns number of selected image
function getImageOrder(name) {
  // console.log(parseInt(name.match(/-?\d+/)[0]));
  return parseInt(name.match(/-?\d+/)[0]) - 1;
}
//  Add event to imagens on gallery and Show modal when clicked
for (i = 0; i < gallery_buttons.length; i++) {
  let currentButton = gallery_buttons[i];
  gallery_buttons[i].addEventListener("click", () => {
    gallery_modal.classList.remove("gallery__modal--hidden");
    // console.log(`${gallery_path}${gallery_sequence[i]}`);
    gallery_currentImg = getImageOrder(currentButton.name);
    updateImage();
  });
}

//  Control gallery scroll with arrow buttons
btn_gallery_previous.addEventListener("click", () => {
  gallery_items.style.transform = "translateX(0px)";
  btn_gallery_previous.classList.add("disabled");
  btn_gallery_next.classList.remove("disabled");
});
btn_gallery_next.addEventListener("click", () => {
  const translateEnd = -980;
  gallery_items.style.transform = `translateX(${translateEnd}px)`;
  btn_gallery_previous.classList.remove("disabled");
  btn_gallery_next.classList.add("disabled");
});

//  Control gallery scroll on drag event
function handleDragOver(ev) {
  // console.log(ev.screenX);
  dragEndPositionX = ev.screenX;

  let newTranslation = dragStartPositionX - dragEndPositionX;
  let currentTranslate = gallery_items.style.transform;
  if (!currentTranslate) {
    currentTranslate = "0";
  }
  currentTranslate = parseInt(currentTranslate.match(/-?\d+/)[0]);
  // console.log(`Move gallery: ${currentTranslate}px`);

  if (currentTranslate - newTranslation < -(galleryThreshold / 2)) {
    newTranslation = 0;
  }
  if (currentTranslate - newTranslation > 0) {
    newTranslation = 0;
  }
  // console.log(`translateX(${-newTranslation}px)`);
  const stringTransform = `translateX(${currentTranslate - newTranslation}px)`;
  // const stringTransform = `"translateX(${newTranslation})"`;
  // gallery_items.style.transform = '"translateX(' + newTranslation + 'px)"';
  gallery_items.style.transform = stringTransform;
}

function handleDragEnd(ev) {
  const newTranslation = dragStartPositionX - dragEndPositionX;
  // console.log(`translateX(${newTranslation}px)`);
  const stringTransform = `translateX(${newTranslation}px)`;
  gallery_items.style.transform = stringTransform;
  gallery_items.style.border = "1px solid red";
  // console.log("End drag");
}

gallery_items.addEventListener("dragstart", (ev) => {
  // console.log("Start draging galery");
  // gallery_items.style.transform = "translateX(-980px)";
  // console.log(ev);
  gallery_items.addEventListener("dragover", handleDragOver);
  // gallery_items.addEventListener("dragend", handleDragEnd);
});

//  Gallery Modal
//  Close modal buttton
const btn_close_modal = document.getElementById("btn_close_modal");
btn_close_modal.addEventListener("click", () => {
  gallery_modal.classList.add("gallery__modal--hidden");
});
//  Close modal on image click
modal_image.addEventListener("click", () => {
  gallery_modal.classList.add("gallery__modal--hidden");
});
//  Previous image controll
document
  .getElementById("gallery_modal_previous")
  .addEventListener("click", () => {
    gallery_currentImg =
      (gallery_currentImg - 1 + gallery_buttons.length) %
      gallery_buttons.length;
    updateImage();
  });
// Next image controll
document.getElementById("gallery_modal_next").addEventListener("click", () => {
  gallery_currentImg = (gallery_currentImg + 1) % gallery_buttons.length;
  updateImage();
});

//  TRAILER SECTION
const trailer_view = document.getElementById("trailer_view");
let trailer_animationLoaded = false;
trailer_view.addEventListener("animationstart", handleTrailerOnView);
//  Load animation when the section enters the view
function handleTrailerOnView() {
  trailer_animationLoaded = true;
  trailer_view.classList.add("animation--removed");
  trailer_view.removeEventListener("animationstart", handleTrailerOnView);
}

//TAB SECTION
//Protagonists
let protagonists_tab = document.getElementById("protagonists_tab");
let protagonists_content_parent = document.getElementById(
  "protagonists_content_parent"
);
let protagonists_buttons = protagonists_tab.getElementsByTagName("button");
// console.log(protagonists_buttons);
let protagonists_content =
  protagonists_content_parent.getElementsByTagName("div");
let protagonists_image = document.getElementById("protagonists_image");

// console.log(protagonists_content_parent);
// console.log(protagonists_content);
// console.log(protagonists_tab);
// console.log(protagonists_image);

for (let i = 0; i < protagonists_buttons.length; i++) {
  // Add events to tab buttons
  protagonists_buttons[i].addEventListener("click", function () {
    let name = protagonists_buttons[i].name;
    //  Change tab panel content
    handleProtagonistsTab(name);
    changeTabImage(protagonists_image, name, false);

    for (let j = 0; j < protagonists_buttons.length; j++) {
      if (i != j) {
        protagonists_buttons[j].classList.remove("tab__item--current");
      } else {
        protagonists_buttons[j].classList.add("tab__item--current");
      }
    }
  });
}

function changeTabImage(imgElement, name, start) {
  imgElement.className = "";
  imgElement.classList.add("tab-section__image");
  if (start) {
    imgElement.classList.add("tab-section__image--start");
  }
  imgElement.classList.add("tab-section__image--" + name);
}

function handleProtagonistsTab(name) {
  for (let j = 0; j < protagonists_content.length; j++) {
    if (protagonists_content[j].id === name) {
      //Exibir
      protagonists_content[j].classList.remove("tab__content--hidden");
    } else {
      //Ocultar
      protagonists_content[j].classList.add("tab__content--hidden");
    }
  }
}

//Places
let places_tab = document.getElementById("places_tab");
let places_content_parent = document.getElementById("places_content_parent");
let places_buttons = places_tab.getElementsByTagName("button");

let places_content = places_content_parent.getElementsByTagName("div");
let places_image = document.getElementById("places_image");

for (let i = 0; i < places_buttons.length; i++) {
  // Add events to tab buttons
  places_buttons[i].addEventListener("click", function () {
    let name = places_buttons[i].name;
    //  Change tab panel content
    handlePlacesTab(places_buttons[i].name);
    changeTabImage(places_image, name, true);

    for (let j = 0; j < places_buttons.length; j++) {
      if (i != j) {
        places_buttons[j].classList.remove("tab__item--current");
      } else {
        places_buttons[j].classList.add("tab__item--current");
      }
    }
  });
}

function handlePlacesTab(name) {
  for (let j = 0; j < places_content.length; j++) {
    if (places_content[j].id === name) {
      //Exibir
      places_content[j].classList.remove("tab__content--hidden");
    } else {
      //Ocultar
      places_content[j].classList.add("tab__content--hidden");
    }
  }
}
