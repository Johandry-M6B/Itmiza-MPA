import { checkSessionForAuth } from "./main.js";

checkSessionForAuth("../../index.html");

const $loginForm = document.getElementById("login-form");
const $email = document.getElementById("email");
const $password = document.getElementById("password");

$loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  login();
});

async function login() {
  const encodedEmail = encodeURIComponent($email.value);
  let response = await fetch(
    `http://localhost:3000/users?email=${encodedEmail}`
  );
  let data = await response.json();

  if (data.length != 1) {
    alert("lThe account does not exist, I invite you to register");
    return;
  }

  if (data[0].password === $password.value) {
    localStorage.setItem("currentUser", JSON.stringify(data[0]));
    window.location.href = "../views/post.html";
  } else {
    alert("Wrong credentials, please try again");
  }

  console.log("Email:", $email.value);
  console.log("Respuesta del servidor:", data);
}
