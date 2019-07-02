//Curt
// import {formData} from "./api-handler/form-handler.js"


function createFormComponent () {
    let formContainer = document.querySelector("#container")
    formContainer.innerHTML = `
    <h1>Welcome User. Please input your login information</h2>
    <input id="userName" name="userEditor" type="text" placeholder="Your Name Here">
    <input id="userPassword" name="userEditor" type="text" placeholder="Password">
    <button id="loginBtn">Login</button>
    `
}

function createRegistrationForm() {
    let formContainer = document.querySelector("#container")
    formContainer.innerHTML = `
    <h1>Welcome User. Please create user ID</h1>
    <input id="createUserName" name="userEditor" type="text" placeholder="Your Name">
    <input id="createUserEmail" name="userEditor" type="text" placeholder="Your Email">
    <input id="createUserPassword" name="userEditor" type="text" placeholder="Create Password">
    <button id="saveUserBtn">Save</button>
    `
}

function createUserFactory (name, email, password) {
    return {
    name: name,
    email: email,
    password: password
    }
}

export { createFormComponent, createRegistrationForm, createUserFactory}