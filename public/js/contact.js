//Form Variables
const form = document.getElementById("form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const mail = document.getElementById("mail");
const comment = document.getElementById("comment");
const submit = document.getElementById("submit");
const error = document.getElementById("errorMessage");

form.addEventListener("submit", (e) => {
  let messages = [];
  let simbols = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (
    firstName.value === "" ||
    firstName.value == null ||
    firstName.length < 2
  ) {
    messages.push("Ingrese un nombre valido");
  }
  if (lastName.value === "" || lastName.value == null || lastName.length < 2) {
    messages.push("Ingrese su apellido");
  }
  if (
    mail.value === "" ||
    mail.value == null ||
    mail.matches(simbols) == false
  ) {
    messages.push("Ingrese su mail");
  }
  if (comment === "" || comment == null) {
    messages.push("Ingrese algun comentario");
  }
  if (messages.length > 0) {
    error.innerText = messages.join(", ");
    e.preventDefault();
  }
});
