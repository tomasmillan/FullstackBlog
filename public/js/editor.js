import db from "../js/firebase" assert { type: "json" };
import {
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";

const blogTitleField = document.querySelector(".title");
const articleField = document.querySelector(".article");
console.log(db);

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

const uploadImage = (uploadFile, uploadType) => {
  const [file] = uploadFile.files;
  if (file && file.type.includes("image")) {
    const formData = new FormData();
    formData.append("image", file);

    fetch("/upload", {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (uploadType == "image") {
          addImage(data, file.name);
        } else {
          bannerPath = `${location.origin}/${data}`;
          banner.style.backgroundImage = `url("${bannerPath}")`;
        }
      });
  } else {
    alert("Por favor subir imagen");
  }
};

const month = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Nov",
  "Dic",
];

const addImage = (imagePath, alt) => {
  let curPos = articleField.selectionStart;
  let textToInsert = `\r! [${alt}](${imagePath})\r`;
  articleField.value =
    articleField.value.slice(0, curPos) +
    textToInsert +
    articleField.value.slice(curPos);
};

publishBtn.addEventListener("click", async () => {
  //generating id
  let letters = "abcdefghijklmnñopqrstuvwxyz";
  let blogTitle = blogTitleField.value.split(" ").join("-");
  let id = "";
  for (let i = 0; i < 4; i++) {
    id += letters[Math.floor(Math.random() * letters.length)];

    //docname
    let docName = `${blogTitle}-${id}`;
    let date = new Date();
    console.log("post");

    //Databse Connection
    //await setDoc(doc(db, "cities", "new-city-id"), data);
    //db.collection("cities").doc("new-city-id").set(data);
    await setDoc(doc(db, "blogs", docName), {
      title: blogTitleField.value,
      article: articleField.value,
      bannerImage: bannerPath,
      publishedAt: `${date.getDate()} ${
        month[date.getMonth()]
      } ${date.getFullYeAR()}`,
    })
      .then(() => {
        console.log("data entered");
        location.href = `${docName}`;
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
