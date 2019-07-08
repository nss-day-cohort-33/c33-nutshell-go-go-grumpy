
import { getChatData, postChatData, deleteChat, putChat } from "../api-handler/chat-handler"

function createChatForm() {
  getChatData()
      .then(poop =>
          listChats(poop)
      )
  let selectDOM = document.querySelector("#container");
  selectDOM.innerHTML = ` 
    <div id="chat-display"></div>
    <input id="chat-entry" type="text">
    <button id="chat-send">send chat</button>
  `;
  eventListener()
}

function chatFactory(entry) {
  return {
    entry: entry
  }
}

function eventListener() {
  document.querySelector("#chat-send").addEventListener("click", function () {
    let chatEntry = document.querySelector("#chat-entry").value
    let newChat = chatFactory(chatEntry)
    postChatData(newChat)
    .then(() => {
      getChatData()
        .then (chatData => listChats(chatData))
    })
  })
}

function createChatDisplay(chats){
  let chatsDisplay = document.querySelector("#chat-display")
  let el = document.createElement("div");
  let div = document.createElement("div");
  let section = document.createElement("section");
  let deleteBtn = document.createElement("button");
  let editBtn = document.createElement("button");
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
    let id = event.target.id
    deleteChat(id)
      .then(data => {
        chatsDisplay.innerHTML = ""
        getChatData()
          .then(poop =>
            listChats(poop)
          )
      })
  })

  editBtn.setAttribute("id", `editBtn-${chats.id}`)
  editBtn.textContent = "edit"
  editBtn.addEventListener("click", ()=> {
    console.log("edit clicked")
    let chatForm = createChatEditForm(chats)
    addChatFormDOM(div.id, chatForm)
  })

  el.appendChild(deleteBtn)
  el.appendChild(editBtn)
  return el
}

function createChatEditForm (chats){
  return `
  <fieldset>
    <input type="text" name="chat-edit-entry" id="chat-edit-entry" value= ${chats.entry}>
    <input type="hidden" id="chat-edit-id" value=${chats.id}>
  </fieldset>
  <button id="editSaveBtn" type="button">Save Chat</button>`
}

let listChats = (chatData) => {
  let chatsDisplay = document.querySelector("#chat-display")
  chatsDisplay.innerHTML = ""
  chatData.forEach(poop => {
    chatsDisplay.appendChild(createChatDisplay(poop))
  })
}

function addChatFormDOM (chatContainer, chatForm){
  let eventDisplay = document.querySelector("#chat-display")
  document.querySelector(`#${chatContainer}`).innerHTML = chatForm;
  document.querySelector("#editSaveBtn").addEventListener("click", () => {
  let eventID = document.querySelector("#chat-edit-id").value
  let editInputField = document.querySelector("#chat-edit-entry").value
  let updateChat = chatFactory(editInputField)
      updateChat.id = eventID
  putChat(updateChat)
  .then (() => {
      eventDisplay.innerHTML = ""
      getChatData()
      .then(newChat => listChats(newChat))
  })
})
}

export { createChatForm, eventListener }