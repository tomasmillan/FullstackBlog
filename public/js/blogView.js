import { collection, getDocs, db, doc } from "./firebase.js";
console.log("Estoy en blogView.js");
let blogId = decodeURI(location.pathname.split("/").pop());
const querySnapshot = await getDocs(collection(db, "blogs"));
let docRef = querySnapshot;
console.log(docRef);
console.log(blogId);
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
  article.innerHTML += info.article;
};

const createBlog = (id, blog) => {
  const { title, article, bannerImage } = blog;

  const blogSection = document.querySelector(".readmore");
  blogSection.innerHTML += `
    <div class="blog__card">
        <img src="${blog.bannerImage}" class="blog__img" alt="">
        <h1 class="blog__title">${String(blog.title).substring(0, 100)}</h1>
        <p class="blog__overview">${
          String(blog.article).substring(0, 200) + "..."
        }</p>
        <a href="/${id}" class="btn btn__blog">read</a>
    </div>
    `;
};

// const addArticle = (ele, data) => {
// data = data.split("\n").filter((item) => item.length);
// console.log(data);
// data.forEach((item) => {
//   // check for heading
//   if (item[0] == "#") {
//     let hCount = 0;
//     let i = 0;
//     while (item[i] == "#") {
//       hCount++;
//       i++;
//     }
//     let tag = `h${hCount}`;
//     ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`;
//   }
//   //checking for image format
//   else if (item[0] == "!" && item[1] == "[") {
//     let seperator;
//     for (let i = 0; i <= item.length; i++) {
//       if (
//         item[i] == "]" &&
//         item[i + 1] == "(" &&
//         item[item.length - 1] == ")"
//       ) {
//         seperator = i;
//       }
//     }
//     let alt = item.slice(2, seperator);
//     let src = item.slice(seperator + 2, item.length - 1);
//     ele.innerHTML += `
//           <img src="${src}" alt="${alt}" class="article-image">
//           `;
//   } else {
//     ele.innerHTML += `<p>${item}</p>`;
//   }
// });
// };
querySnapshot.forEach(async (doc) => {
  if (doc.id === blogId) {
    setupBlog(await doc.data());
  } else {
    createBlog(doc.id, await doc.data());
  }
});
