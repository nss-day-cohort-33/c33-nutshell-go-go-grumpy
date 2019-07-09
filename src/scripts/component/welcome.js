// Curt

import { createLoginFormComponent, createRegistrationForm, createUserFactory } from "./form.js"
import { postUsertoDB } from "../api-handler/form-handler.js";

let welcomeContainer = document.querySelector("#container")

//Event listener to save registration to DB
function registerEvent() {
    document.querySelector("#saveUserBtn").addEventListener("click", () => {
        let createUser = document.querySelector("#createUserName").value
        let createEmail = document.querySelector("#createUserEmail").value
        let createPassword = document.querySelector("#createUserPassword").value
        let newUserData = createUserFactory(createUser, createEmail, createPassword)
        postUsertoDB(newUserData)
        createLoginFormComponent()
    })
}

//Function to create the initial welcome page
function createWelcomePage() {
    welcomeContainer.innerHTML = `
    <img class="logo home-logo" src="../src/images/logo.png"/>
    <h1 class="welcomeh1">Welcome to the Nuthouse</h1>
    <h2 class="welcomeh2">Please login or register to continue to your dashboard.</h2>
    <div class="btn-container">
        <button id="loginBtn">Login</button>
        <button id="registerBtn">Register</button>
    </div>
    `
    document.querySelector("#loginBtn").addEventListener("click", () => {
        createLoginFormComponent()
    })
    document.querySelector("#registerBtn").addEventListener("click", () => {
        createRegistrationForm()
        registerEvent()
    })
}



export { createWelcomePage }