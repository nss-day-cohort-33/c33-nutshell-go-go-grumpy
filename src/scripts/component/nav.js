//Curt

import { createEventForm, saveEventListener } from "./event.js"
import {createArticleForm, newsListener} from "./new.js"
import { createChatForm} from "./chat.js"


function createNavBar() {
    let navBarDiv = document.querySelector("#navContainer")
    navBarDiv.setAttribute("id", "navBar")
    navBarDiv.innerHTML = `
    <button id="newsMod" type="button">View your news articles</button>
    <button id="eventsMod" type="button">View your events</button>
    <button id="tasksMod" type="button">View your tasks</button>
    <button id="chatMod" type="button">View your chats</button>
    <button id="friendsMod" type="button">View your friends list</button>
    `
    let newsBtn = document.querySelector("#newsMod")
    let eventsBtn = document.querySelector("#eventsMod")
    let tasksBtn = document.querySelector("#tasksMod")
    let chatBtn = document.querySelector("#chatMod")
    let friendsBtn = document.querySelector("#friendsMod")
    newsBtn.addEventListener("click", () => {
        console.log("news")
        createArticleForm()
        newsListener()
    })
    eventsBtn.addEventListener("click", () => {
        console.log("events")
        createEventForm()
        saveEventListener()
    })
    tasksBtn.addEventListener("click", () => {
        console.log("tasks")

    })
    chatBtn.addEventListener("click", () => {
        console.log("chats")
        createChatForm()
        eventListener()
    })
    friendsBtn.addEventListener("click", () => {
        console.log("friends")
    })
}

export {createNavBar}