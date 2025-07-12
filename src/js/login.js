import { checkSessionForAuth } from "./main.js";
import { USERS } from "./main.js";
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
  const response = await fetch(
    `${USERS}?email=${encodedEmail}`
  );
  const data = await response.json();

  if (data.length === 0) {
    alert("lThe account does not exist, I invite you to register");
    return;
  }

  const user = data[0];

   if (user.password !== $password.value) {
    alert("Incorrect password");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  if(user.role === "admin") {
    window.location.href = "/src/views/post.html";
  }else{
    window.location.href = "/index.html";
  }

  
  

 

  console.log("Email:", $email.value);
  console.log("Respuesta del servidor:", data);
}
