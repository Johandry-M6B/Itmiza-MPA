import { USERS } from "../../index.html"

const $registerForm = document.getElementById("register-form")
const $fullName = document.getElementById("full-name")
const $email = document.getElementById("email")
const $password = document.getElementById("password")


$registerForm.addEventListener("submit",  function (event) {
    event.preventDefault()
    registerUser()
})

async function registerUser() {
    const newUser = {
        fullName: $fullName.value,
        email: $email.value,
        password: $password.value,
        role: "user"
    }


    let response = await fetch(USERS, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newUser)
    })

    if (response.status == 201) {
        window.location.href = "./index.html"
        
    } else {
        alert("reintente mas tarde")
    }
}