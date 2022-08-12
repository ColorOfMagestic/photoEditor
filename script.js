// sections
const first = document.querySelector(".intro-screen__first");
const second = document.querySelector(".intro-screen__second");
const third = document.querySelector(".intro-screen__third");
const dotsWrapper = document.querySelector(".dots");
const intros = document.querySelectorAll(".intro-screen");

// buttons
const screenToggles = document.querySelectorAll(".screen-toggle");
const photoButtons = document.querySelectorAll(".photo__buttons-item");
const inputFileButton = document.querySelector(".add-image__btn");
const btnBack = document.querySelector(".btn-back");
const btnSave = document.querySelector('[data-filter="save"]');

// elements
const dots = document.querySelectorAll(".dot");
const photoFooter = document.querySelector(".photo__footer");
const preview = document.querySelector(".preview");
const previewImg = document.querySelector(".preview img");
const inputFile = document.querySelector(".add-image__input");

let blur = 3,
  invert = 100;

let count = 0;
let int = 0;
let flag = true;
let isInvert = false;
let isBlur = false;

// Переключение экранов

screenToggles.forEach((btn) => {
  btn.addEventListener("click", () => {
    count++;
    int++;

    let screen = +intros[int - 1].dataset.screen;

    if (screen === 2) {
      addClass(dotsWrapper, "hidden");
    }

    dots.forEach((dot) => {
      removeClass(dot, "dot--active");
    });

    for (let i = 0; i < dots.length; i++) {
      addClass(dots[count], "dot--active");
    }

    if (btn.closest(".intro-screen__first")) {
      addClass(first, "intro-screen__first--active");
    }
    if (btn.closest(".intro-screen__second")) {
      addClass(second, "intro-screen__second--active");
    }
    if (btn.closest(".intro-screen__third")) {
      addClass(third, "intro-screen__third--active");
    }
  });
});

// Кнопка назад

btnBack.addEventListener("click", back);

function back() {
  removeClass(btnBack, "btn-back--active");
  removeClass(preview, "preview--active");
  removeClass(photoFooter, "photo__footer--active");
  setTimeout(() => {
    removeClass(previewImg, "photo__buttons-item--invert");

    removeClass(previewImg, "photo__buttons-item--blur");

  }, 1000);
}

// Наложение фильтров

photoButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    let filter = btn.dataset.filter;
    switch (filter) {
      case "invert":
        addClass(previewImg, "photo__buttons-item--invert");
        removeClass(previewImg, "photo__buttons-item--blur");
        break;
      case "blur":
        addClass(previewImg, "photo__buttons-item--blur");
        removeClass(previewImg, "photo__buttons-item--invert");
        break;
    }
  });
});

// Загрузка фото

inputFileButton.addEventListener("click", () => inputFile.click());
inputFile.addEventListener("change", loadImage);

function loadImage() {
  let file = inputFile.files[0];
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  previewImg.addEventListener("load", () => {
    addClass(preview, "preview--active");
    setTimeout(() => {
      addClass(btnBack, "btn-back--active");
    }, 1000);
  });
}

previewImg.addEventListener("click", () => {
  if (flag) {
    addClass(photoFooter, "photo__footer--active");
    flag = !flag;
  } else {
    removeClass(photoFooter, "photo__footer--active");
    flag = !flag;
  }
});
// Сохранение фото

function savePhoto() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = previewImg.naturalWidth;
  canvas.height = previewImg.naturalHeight;
  if(previewImg.classList.contains('photo__buttons-item--invert')){
    ctx.filter = `invert(${invert}%)`;
  }
  if(previewImg.classList.contains('photo__buttons-item--blur')){
    ctx.filter = `blur(${blur}px)`;
  }
  ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);

  const link = document.createElement('a');
  link.download = 'photo.jpg';
  link.href = canvas.toDataURL();
  link.click();
}

btnSave.addEventListener("click", savePhoto);

// Вспомогательные функции

function addClass(v, cls) {
  v.classList.add(`${cls}`);
}

function removeClass(v, cls) {
  v.classList.remove(`${cls}`);
}
