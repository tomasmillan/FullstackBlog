/* HTML Box to Re-write */
const boxContainer = document.getElementsByClassName("cards__container")[0];
const catalogTitle = document.getElementById("catalog__title");
const input = document.getElementById("searchBar");
/* Buttons */
const btns = document.querySelectorAll(".filter__btn");
/* New Array   */
let items = [];
// json bin route
const root = "https://api.jsonbin.io/v3";
const route = "/b/62ed9b89e13e6063dc6d66fc";
const header = {
  headers: {
    "Content-Type": "application/json",
    "X-Master-Key":
      "$2b$10$H4hr/2HpE/fP2mm2emvcnuhDdK/NoPoD4s1fDOcXRYlbcUzFu2tLa",
  },
};

const apiFetchUrl = root + route;
console.log(apiFetchUrl);
async function loadContent() {
  const response = await fetch(apiFetchUrl, header);
  const { record } = await response.json();
  const { products } = record;
  return products;
}

window.addEventListener("DOMContentLoaded", async () => {
  boxContainer.innerHTML =
    '<li class="loader"><span class="mif-spinner3 ani-pulse"></span> loading</li>';
  catalogTitle.innerText = "categorias";
  const products = await loadContent();
  items = products;
  generateCards(products);
});
document.addEventListener("DOMContentLoaded", applyFilterCards);
Array.from(btns).forEach((element) => {
  element.addEventListener("click", (event) => {
    applyFilterCards(event);
  });
});

function applyFilterCards(event) {
  // HTML: data-id , data-adress, JS .dataset.adress .dataset.id
  const filter = event.target.dataset?.value;
  catalogTitle.innerText = filter;
  generateCards(items, filter);
}

function generateCards(items, filterPlace) {
  let cards = "";
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
        <img src="${items.image}" class="card__img">   
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
input.addEventListener("keyup", (e) => {
  const newItems = items.filter((item) =>
    `${item.title.toLowerCase()} ${item.author.toLowerCase()}`.includes(
      input.value.toLowerCase()
    )
  );
  generateCards(newItems);
});
