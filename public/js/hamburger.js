const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".menu__links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});
