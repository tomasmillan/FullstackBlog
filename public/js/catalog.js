/* HTML Box to Re-write */
const boxContainer = document.getElementsByClassName("cards__container")[0];
const catalogTitle = document.getElementById("catalog__title");
const input = document.getElementById("searchBar");
/* Buttons */
const btns = document.querySelectorAll(".filter__btn");
/* New Array   */
let items = [];

async function loadContent() {
  const response = await fetch(
    "https://api.jsonbin.io/v3/b/62ed9b89e13e6063dc6d66fc"
  );
  const data = await response.json();
  return data;
}

window.addEventListener("DOMContentLoaded", async () => {
  boxContainer.innerHTML =
    '<li class="loader"><span class="mif-spinner3 ani-pulse"></span> loading</li>';
  catalogTitle.innerText = "categorias";
  const data = await loadContent();
  items = data.data;
  generateCards(items);
});
document.addEventListener("DOMContentLoaded", applyFilterCards);
Array.from(btns).forEach((element) => {
  element.addEventListener("click", applyFilterCards);
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
        <h4 class="card-title text-bold text-cap">${items.title}</h4>
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
