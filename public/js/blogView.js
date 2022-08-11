import { collection, getDocs, db, doc } from "./firebase.js";
let blogId = decodeURI(location.pathname.split("/").pop());
const querySnapshot = await getDocs(collection(db, "blogs"));
let docRef = querySnapshot;
//new array
let info = [];
const setupBlog = (info) => {
  //HTML Connection
  const banner = document.querySelector(".banner__post");
  const titleTag = document.querySelector(".title__post");
  const publish = document.querySelector(".published");
  const article = document.querySelector(".article__post");
  //DOM Changes
  const imgElement = `<img class="banner__post" src="${info.bannerImage}">`;
  banner.innerHTML = imgElement;
  titleTag.innerHTML += info.title;
  publish.innerHTML += info.publishedAt;
  let data = info.article;
  let array = [];
  const addArticle = (ele, data) => {
    data = data.split("\n").filter((data) => data.length);
    array.push(data);
    data.forEach((array) => {
      // check for heading
      if (array[0] == "#") {
        let hCount = 0;
        let i = 0;
        while (array[i] == "#") {
          hCount++;
          i++;
        }
        let tag = `h${hCount}`;
        ele.innerHTML += `<${tag}>${array.slice(
          hCount,
          array.length
        )}</${tag}>`;
      }

      //checking for image format
      else if (array[0] == "!" && array[1] == "[") {
        let seperator;

        for (let i = 0; i <= array.length; i++) {
          if (
            array[i] == "]" &&
            array[i + 1] == "(" &&
            array[array.length - 1] == ")"
          ) {
            seperator = i;
          }
        }

        let alt = array.slice(2, seperator);
        let src = array.slice(seperator + 2, array.length - 1);
        ele.innerHTML += `
        <img src="${src}" alt="${alt}" class="article-image">
        `;
      } else {
        ele.innerHTML += `<p>${array}</p>`;
      }
    });
  };
  addArticle(article, info.article);
};

const createBlog = (id, blog) => {
  const { title, article, bannerImage } = blog;

  const blogSection = document.querySelector(".cards__container");
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
querySnapshot.forEach(async (doc) => {
  if (doc.id === blogId) {
    setupBlog(await doc.data());
  } else {
    createBlog(doc.id, await doc.data());
  }
});
