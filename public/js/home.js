import { db } from "./firebase";

const blogSection = document.querySelector(".blogs-section");
const readMore = document.querySelector(".btn__hero");

readMore.addEventListener("click", () => {
  location.href = "/blog";
});

db.collection("blogs")
  .get()
  .then((blogs) => {
    blogs.forEach((blog) => {
      if (blog.id != decodeURI(location.pathname.split("/").pop())) {
        createBlog(blog);
      }
    });
  });

const createBlog = (blog) => {
  let data = blog.data();
  blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100) + "..."}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + "..."}</p>
        <a href="/${blog.id}" class="btn dark">read</a>
    </div>
    `;
};
