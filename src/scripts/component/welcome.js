import {createFormComponent, createRegistrationForm, createUserFactory } from "./form.js"
import { postUsertoDB } from "../api-handler/form-handler.js";

let welcomeContainer = document.querySelector("#container")

function registerEvent() {
    document.querySelector("#saveUserBtn").addEventListener("click", () => {
    // console.log("register")
    let createUser = document.querySelector("#createUserName").value
    console.log(createUser)
    let createEmail = document.querySelector("#createUserEmail").value
    console.log(createEmail)
    let createPassword = document.querySelector("#createUserPassword").value
    console.log(createPassword)
    let newUserData = createUserFactory(createUser, createEmail, createPassword)
    console.log(newUserData)
    postUsertoDB(newUserData)
})
}

function createWelcomePage () {
    welcomeContainer.innerHTML = `
    <h1 class="welcomeh1">Welcome to Nuthouse<h1>
    <h2>Please Login or Register to continue to Dashboard</h2>
    <button id="loginBtn">Login</button>
    <button id="registerBtn">Register</button>
    `
    document.querySelector("#loginBtn").addEventListener("click", () => {
        // console.log("work")
        createFormComponent()
    })
    document.querySelector("#registerBtn").addEventListener("click", () => {
        // console.log("register")
        createRegistrationForm()
        registerEvent()
    })
}


export { createWelcomePage }