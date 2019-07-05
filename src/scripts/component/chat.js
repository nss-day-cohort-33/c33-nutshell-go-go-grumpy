
import { getChatData, postChatData, deleteChat } from "../api-handler/chat-handler"

function eventListener() {
  document.querySelector("#chat-send").addEventListener("click", function () {
    let chatEntry = document.querySelector("#chat-entry").value
    let newChat = chatFactory(chatEntry)
    postChatData(newChat)
    .then(() => {
      getChatData()
        .then (chatData => listChats(chatData))
      })
    }
  )}

let listChats = (chatData) => {
  let chatsDisplay = document.querySelector("#chat-display")
  chatsDisplay.innerHTML = ""
  chatData.forEach(poop => {
    chatsDisplay.appendChild(createChatDisplay(poop))
  })
}

function chatFactory(entry) {
  return {
    entry: entry
  }
}

function createChatForm() {
  let selectDOM = document.querySelector("#container");
  selectDOM.innerHTML = ` 
    <div id="chat-display"></div>
    <input type="hidden" id="chat-id">
    <textarea id="chat-entry"></textarea>
    <button id="chat-send">send chat</button>
  `;
  eventListener()
}

function createChatDisplay(chats){
  let chatsDisplay = document.querySelector("#chat-display")
  let el = document.createElement("div");
  let div = document.createElement("div");
  let section = document.createElement("section");
  let deleteBtn = document.createElement("button");
  // let editBtn = document.createElement("button");
  section.innerHTML = `
  <section id="${chats.id}">
    <article>
      <p>${chats.entry}</p>
    </article>
  </section>`
  el.appendChild(section)
  el.appendChild(div)
  div.setAttribute("id", `eventContainer-${chats.id}`)
  deleteBtn.setAttribute("id", `${chats.id}`)
  deleteBtn.textContent = "delete"
  deleteBtn.addEventListener("click", () => {
    console.log("delete clicked")
    let id = event.target.id
    deleteChat(id)
      .then(data => {
        chatsDisplay.innerHTML = ""
        getChatData()
          .then(chats =>
            listChats(chats)
          )
      })
  })
  el.appendChild(deleteBtn)
  return el
}

export { createChatForm }