import { collection } from "./firebase.js";
import { db, doc, setDoc } from "./firebase.js";

const blogTitleField = document.querySelector(".title");
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
        console.log(formdata);
        console.log(data);
        addImage(data, file.name);
        bannerPath = `${location.origin}/${data}`;
        console.log(bannerPath);
        banner.style.backgroundImage = `url("${bannerPath}.jpg")`;
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
  if (articleField.value.length && blogTitleField.value.length) {
    // generating id
    let letters = "abcdefghijklmnopqrstuvwxyz";
    let blogTitle = blogTitleField.value.split(" ").join("-");
    let id = "";
    for (let i = 0; i < 4; i++) {
      id += letters[Math.floor(Math.random() * letters.length)];
    }

    // setting up docName
    let docName = `${blogTitle}-${id}`;
    let date = new Date(); // for published at info

    //access firstore with db variable;
    db.collection("blogs")
      .doc(docName)
      .set({
        title: blogTitleField.value,
        article: articleField.value,
        bannerImage: bannerPath,
        publishedAt: `${date.getDate()} ${
          months[date.getMonth()]
        } ${date.getFullYear()}`,
      })
      .then(() => {
        location.href = `/${docName}`;
      })
      .catch((err) => {
        console.error(err);
      });
  }
});
