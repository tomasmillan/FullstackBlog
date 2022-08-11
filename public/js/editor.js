import { saveData } from "./firebase.js";
//blog content
const blogTitleField = document.querySelector(".blog__title");
const articleField = document.querySelector(".article");
//banner
const bannerImage = document.querySelector("#banner__upload");
const banner = document.querySelector(".banner");
let bannerPath;
//buttons
const publishBtn = document.querySelector(".blog__btn__publish");
const uploadInput = document.querySelector("#image__upload");
bannerImage.addEventListener("change", () => {
  uploadImage(bannerImage, "banner");
});
uploadInput.addEventListener("change", () => {
  uploadImage(uploadInput, "image");
});

const uploadImage = async (uploadFile, uploadType) => {
  const [file] = uploadFile.files;
  if (file && file.type.includes("image")) {
    const formdata = new FormData();
    formdata.append("image", file);
    await fetch("/upload", {
      method: "post",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        if (uploadType == "image") {
          addImage(data, file.name);
        } else {
          bannerPath = `${location.origin}/${data}`;
          const imgElement = `<img class="banner__post" src="${bannerPath}">`;
          banner.innerHTML = imgElement;
        }
      });
  } else {
    swal("Formato Incorrecto!", "Por favor subir imagen");
  }
};

const addImage = (imagepath, alt) => {
  let curPos = articleField.selectionStart;
  let textToInsert = `\r![${alt}](${imagepath})\r`;
  articleField.value =
    articleField.value.slice(0, curPos) +
    textToInsert +
    articleField.value.slice(curPos);
};

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

publishBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // generating id and info
  let letters = "abcdefghijklmnopqrstuvwxyz";
  let blogTitle = blogTitleField.value;
  let articleContent = articleField.value;
  let id = "";
  for (let i = 0; i < 4; i++) {
    id += letters[Math.floor(Math.random() * letters.length)];
  }
  let docName = `${blogTitle}-${id}`;
  let date = new Date();
  let publishedAtGenerator = `
  ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  saveData(
    docName,
    blogTitle,
    articleContent,
    bannerPath,
    publishedAtGenerator
  );
  swal("Felicitaciones!", "Generaste el post, para verlo anda a blogs");
  // location.href = `/${docName}`;
});
