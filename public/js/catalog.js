let popup = document.getElementById("popup");
let close = document.querySelectorAll("close");
let left = document.getElementById("left");
let right = document.getElementById("right");
let title = document.getElementsByClassName("catalog__title");

const continents = [];

left.addEventListener("click", () => {
  console.log("click left");
});

right.addEventListener("click", () => {
  console.log("click right");
});

function openPopup() {
  popup.classList.add("open__popup");
}

function closePopup() {
  popup.classList.remove("open__popup");
}
