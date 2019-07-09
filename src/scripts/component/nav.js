//Curt

import { createEventForm, saveEventListener } from "./event.js"
import { createArticleForm, newsListener } from "./new.js"
import { createChatForm } from "./chat.js"


function createNavBar() {
    let navBarDiv = document.querySelector("#navContainer")
    navBarDiv.setAttribute("id", "navBar")
    navBarDiv.innerHTML = `
    <img class="logo" src="../images/logo.png"/>
    <button id="newsMod" type="button"><span class="icon-news"></span> news</button>
    <button id="eventsMod" type="button"><span class="icon-events"></span> events</button>
    <button id="tasksMod" type="button"><span class="icon-tasks"></span> tasks</button>
    <button id="friendsMod" type="button"><span class="icon-friends"></span> friends</button>
    <button id="chatMod" type="button"><span class="icon-chats"></span> messages</button>
    `
    let newsBtn = document.querySelector("#newsMod")
    let eventsBtn = document.querySelector("#eventsMod")
    let tasksBtn = document.querySelector("#tasksMod")
    let chatBtn = document.querySelector("#chatMod")
    let friendsBtn = document.querySelector("#friendsMod")
    newsBtn.addEventListener("click", () => {
        createArticleForm()
        newsListener()
    })
    eventsBtn.addEventListener("click", () => {
        createEventForm()
        saveEventListener()
    })
    tasksBtn.addEventListener("click", () => {

    })
    chatBtn.addEventListener("click", () => {
        createChatForm()
    })
    friendsBtn.addEventListener("click", () => {
    })
}

export { createNavBar }