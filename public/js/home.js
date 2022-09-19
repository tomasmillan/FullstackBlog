import { collection, getDocs, db } from "./firebase.js";

const blogSection = document.querySelector(".blog__section");
const readMore = document.querySelector(".btn__hero");

readMore.addEventListener("click", () => {
  location.href = "/blogs";
});

const createBlog = (id, blog) => {
  const { title, article, bannerImage } = blog;
  blogSection.innerHTML += `
    <div class="blog__card">
        <img src="${blog.bannerImage}" class="blog__img" alt="">
        <h1 class="blog__title">${String(blog.title).substring(0, 100)}</h1>
        <p class="blog__overview">${
          String(blog.article).substring(0, 40) + "..."
        }</p>
        <a href="/${id}" class="btn btn__blog">read</a>
    </div>
    `;
};

const querySnapshot = await getDocs(collection(db, "blogs"));
querySnapshot.forEach(async (doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  createBlog(doc.id, await doc.data());
});

function goTo() {
  alert("no");
}
