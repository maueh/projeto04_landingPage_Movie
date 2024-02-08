const el = document.createElement("span");
let protagonists_tab = document.getElementById("protagonists_tab");
let protagonists_content = document.getElementById("protagonists_content");

let lastScrollPosition = window.scrollY;
console.log(protagonists_tab);

let buttons = protagonists_tab.getElementsByTagName("button");
let content = protagonists_content.getElementsByTagName("div");

let protagonist_image = document.getElementById("protagonists_image");

const btn_language = document.getElementById("btn_language");
const menu_language = document.getElementById("menu_language");
const icon_language = document.getElementById("icon_language");
const icon_close_language = document.getElementById("icon_close_language");

const btn_menu = document.getElementById("btn_menu");
const menu_list = document.getElementById("menu_list");

const galleryThreshold = 1920;
let dragStartPositionX = undefined;
let dragEndPositionX = undefined;
const gallery_items = document.getElementById("gallery_items");

const btn_gallery_previous =  document.getElementById("gallery_control_previous");
const btn_gallery_next =  document.getElementById("gallery_control_next");

btn_gallery_previous.addEventListener("click", ()=>{
  gallery_items.style.transform= "translateX(0px)";
  btn_gallery_previous.classList.add("disabled");
  btn_gallery_next.classList.remove("disabled");
})

btn_gallery_next.addEventListener("click", ()=>{
  const translateEnd = -980;
  gallery_items.style.transform= `translateX(${translateEnd}px)`;
  btn_gallery_previous.classList.remove("disabled");
  btn_gallery_next.classList.add("disabled");
})

let img = new Image();
img.src ="../images/cropped-fav_512-1-192x192.png";


gallery_items.addEventListener("dragstart", (ev) => {
  ev.dataTransfer.setDragImage(img, -99999, -99999);
  dragStartPositionX = ev.screenX;
  console.log("draging galery");
  // gallery_items.style.transform = "translateX(-980px)";
  console.log(ev);
  gallery_items.addEventListener("dragover", handleDragOver);
  // gallery_items.addEventListener("dragend", handleDragEnd);
});

function handleDragOver(ev) {
  
  console.log(ev.screenX);
  dragEndPositionX = ev.screenX;

  let newTranslation = dragStartPositionX - dragEndPositionX;
  let currentTranslate = gallery_items.style.transform;
  if (!currentTranslate) {
    currentTranslate = "0";
  }
  currentTranslate = parseInt(currentTranslate.match(/-?\d+/)[0]);
  console.log(`É ${currentTranslate}`);

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
  console.log(`translateX(${newTranslation}px)`);
  const stringTransform = `translateX(${newTranslation}px)`;
  // const stringTransform = `"translateX(${newTranslation})"`;
  // gallery_items.style.transform = '"translateX(' + newTranslation + 'px)"';
  gallery_items.style.transform = stringTransform;
  gallery_items.style.border = "1px solid red";
  console.log("End drag");
}

const trailer_view = document.getElementById("trailer_view");
let trailer_animationLoaded = false;

trailer_view.addEventListener("animationstart", handleTrailerOnView);

function handleTrailerOnView() {
  trailer_animationLoaded = true;
  // alert("Olá");
  trailer_view.classList.add("animation--removed");
  trailer_view.removeEventListener("animationstart", handleTrailerOnView);
}

btn_language.addEventListener("hover", () => {
  // menu_language.classList.s
});

btn_language.addEventListener("click", () => {
  menu_language.classList.toggle("language__menu--hidden");
  icon_language.classList.toggle("language__button__icon--hidden");
  icon_close_language.classList.toggle("close__icon--hidden");
});

btn_menu.addEventListener("click", () => {
  menu_list.classList.toggle("menu__list--hidden");
  header_bar.classList.remove("header-bar--background-color-primary");
  // header_bar.classList.remove("header-bar--background-color");
  if (menu_list.classList.contains("menu__list--hidden")) {
    // header_bar.classList.add("header-bar--background-color");s
  } else {
    header_bar.classList.add("header-bar--background-color-primary");
  }
});

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    // console.log(`clicou em ${buttons[i].name}`);
    alterarAba(buttons[i].name);

    protagonist_image.className = "";
    protagonist_image.classList.add("protagonists__image");
    protagonist_image.classList.add("protagonists__image--" + buttons[i].name);

    for (let j = 0; j < buttons.length; j++) {
      if (i != j) {
        buttons[j].classList.remove("tab__item--current");
      } else {
        buttons[j].classList.add("tab__item--current");
      }
    }
  });
}

function alterarAba(name) {
  let c = document.getElementById("protagonists_tab");
  let protagonists_content = document.getElementById("protagonists_content");
  console.log(protagonists_content);
  console.log(protagonists_tab);
  console.log("executa " + name);
  for (let j = 0; j < content.length; j++) {
    console.log("loop");
    console.log("content" + content);
    console.log(content);
    console.log(content[j].name);
    if (content[j].id === name) {
      //Exibir
      console.log("Exibir " + content[j].name);
      content[j].classList.remove("tab__content--hidden");
    } else {
      //Ocultar
      console.log("Ocultar " + content[j].name);
      content[j].classList.add("tab__content--hidden");
    }
  }
}

// ROLAGEM

const header_bar = document.getElementById("header_bar");
/*
document.addEventListener("scroll", (e) => {
  let currentPosition = window.screenY;
  console.log(lastScrollPosition, currentPosition);
  if (lastScrollPosition < currentPosition) {
    console.log("scroll down");
  } else {
    console.log("scroll up");
  }
  console.log(document.body.scrollTop);
  lastScrollPosition = currentPosition;
});
*/
let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
let ticking = false;
// Função para lidar com o evento de rolagem
function handleScroll() {
  if (!ticking && menu_list.classList.contains("menu__list--hidden")) {
    window.requestAnimationFrame(() => {
      // doSomething(lastKnownScrollPosition);

      // Obter a posição atual de rolagem
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Determinar a direção da rolagem
      let scrollDirection = "none";
      console.log(scrollTop);
      if (scrollTop > lastScrollTop) {
        scrollDirection = "down";
        header_bar.classList.add("header-bar--hidden");
      } else if (scrollTop < lastScrollTop) {
        scrollDirection = "up";
        header_bar.classList.remove("header-bar--hidden");
      }

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

      // Exibir a direção da rolagem no console (você pode adaptar isso conforme necessário)
      console.log("Direção de rolagem: " + scrollDirection);

      ticking = false;
    });

    ticking = true;
  }
}

// Adicionar um ouvinte de rolagem ao documento
window.addEventListener("scroll", handleScroll);
