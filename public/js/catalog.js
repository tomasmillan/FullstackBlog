const items = [
  {
    id: 0,
    img: "img/1.jpg",
    name: "Tomi",
    place: "America",
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
    place: "oceania",
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
/* HTML Box to Re-write */
const boxContainer = document.getElementsByClassName("cards__container")[0];
const catalogTitle = document.getElementById("catalog__title");
/* Buttons */
const btns = document.querySelectorAll(".filter__btn");

function applyFilterCards(event) {
  // HTML: data-id , data-adress, JS .dataset.adress .dataset.id
  const filter = event.target.dataset?.value;
  catalogTitle.innerText = filter;
  generateCards(items, filter);
}

document.addEventListener("DOMContentLoaded", applyFilterCards);
Array.from(btns).forEach((element) => {
  element.addEventListener("click", applyFilterCards);
});

function generateCards(items, filterPlace) {
  let cards = "";
  console.log(filterPlace);
  items.forEach((item) => {
    if (!filterPlace) {
      cards += createCard(item);
    } else {
      if (item.place.toLowerCase() === filterPlace.toLowerCase()) {
        cards += createCard(item);
      }
    }
  });
  boxContainer.innerHTML = cards;
}

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
  return card;
}
