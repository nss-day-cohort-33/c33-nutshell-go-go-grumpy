// Curt

import { populateHomepage } from "./homepage.js"

//function to create the log in form
function createLoginFormComponent () {
    let formContainer = document.querySelector("#container")
    formContainer.innerHTML = `
    <h1>Welcome User. Please input your login information</h2>
    <input id="userName" name="userEditor" type="text" placeholder="Your Name Here">
    <input id="userPassword" name="userEditor" type="text" placeholder="Password">
    <button id="loginBtn">Login</button>
    `
    loginEvent()
}

//function to create the registration form
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

//factory function to format data into DB
function createUserFactory (name, email, password) {
    return {
    name: name,
    email: email,
    password: password
    }
}

//Event listener for user login
function loginEvent() {
    document.querySelector("#loginBtn").addEventListener("click", () => {
        let userName = document.querySelector("#userName").value
        let userPassword = document.querySelector("#userPassword").value
    //Querying through the DB to check if the input of "userName" matches a name in the DB
        fetch(`http://localhost:8088/users?name=${userName}`)
    //Converting json data to javascript
        .then( data => data.json())
    //About to do something with the array pulled from DB
        .then ( user => {
    //Console log the array
            console.log(user)
    //Check if there was a name in the array and check if the userpassword matches the DB
            if (user.length > 0 && user[0].password === userPassword) {
                console.log("you are registered")
                sessionStorage.setItem(name, user[0].id)
    //Call function to load homepage
                populateHomepage()
    //Do something else if the name and password don't exist
            } else {
                alert("Improper credentials submitted. Pleaase try again.")
            }
        })
    })
}

export { createLoginFormComponent, createRegistrationForm, createUserFactory}