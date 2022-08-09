import { collection } from "./firebase.js";
import { db, doc, setDoc, getDocs } from "./firebase.js";

const blogTitleField = document.querySelector(".blog__title");
const articleField = document.querySelector(".article");

//banner
const bannerImage = document.querySelector("#banner__upload");
const banner = document.querySelector(".banner");
let bannerPath;

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
    console.log(file);
    console.log(formdata);
    await fetch("/upload", {
      method: "post",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        bannerPath = `${location.origin}/${data}`;
        console.log(bannerPath);
        banner.style.backgroundImage = `${bannerPath.file}`;
      });
  } else {
    swal("Por favor subir imagen");
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

publishBtn.addEventListener("click", () => {
  // generating id and info
  let letters = "abcdefghijklmnopqrstuvwxyz";
  let blogTitle = blogTitleField.value.split(" ").join("-");
  let id = "";
  for (let i = 0; i < 4; i++) {
    id += letters[Math.floor(Math.random() * letters.length)];
  }
  let docName = `${blogTitle}-${id}`;
  let date = new Date();
  const saveFiles = {
    title: blogTitleField.value,
    article: articleField.value,
    bannerImage: bannerPath,
    publishedAt: `${date.getDate()} ${
      months[date.getMonth()]
    } ${date.getFullYear()}`,
  };
  console.log(saveFiles);
});
