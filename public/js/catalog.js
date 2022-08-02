const items = [
  {
    id: 0,
    img: "img/1.jpg",
    name: "Tomi",
    place: "Argentina",
    description: "Hola yo soy una descripcion",
  },
  {
    id: 1,
    img: "img/2.jpg",
    name: "maxi",
    place: "asia",
    description: "Hola yo soy una descripcion",
  },
  {
    id: 2,
    img: "img/3.jpg",
    name: "matias",
    place: "europa",
    description: "Hola yo soy una descripcion",
  },
  {
    id: 3,
    img: "img/4.jpg",
    name: "joaco",
    place: "Africa",
    description: "hola soy joaco como estas",
  },
  {
    id: 4,
    img: "img/5.jpg",
    name: "joaco",
    place: "Africa",
    description: "hola soy joaco como estas",
  },
  {
    id: 5,
    img: "img/6.jpg",
    name: "joaco",
    place: "Africa",
    description: "hola soy joaco como estas",
  },
  {
    id: 6,
    img: "img/8.jpg",
    name: "joaco",
    place: "Africa",
    description: "hola soy joaco como estas",
  },
  {
    id: 6,
    img: "img/8.jpg",
    name: "joaco",
    place: "Africa",
    description: "hola soy joaco como estas",
  },
];

const boxContainer = document.getElementsByClassName("cards__container")[0];
let i = 0;
for (i = 0; i < items.length; i++) {
  function createCard(items) {
    let card = `
  <div class="social-box bg-lightGray fg-grayBlue d-flex flex-column border-radius-4 m-1 drop-shadow" style="width: 15rem;">
  <div class="card-header d-flex flex-justify-center flex-align-center">
     <img src="${items.img}" class="card__img">   
  </div>
  <div class="card-content d-flex flex-justify-center flex-align-center">
     <h4 class="card-title text-bold text-cap">${items.name}</h4>
  </div>
  <div class="card-footer d-flex flex-justify-center flex-align-center">
     <p class="text-cap text-medium text-center">${items.description}</p>
  </div>
 </div>
  `;
    boxContainer.innerHTML += card;
  }
  createCard(items[i]);
}
