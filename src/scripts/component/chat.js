
import { getChatData, postChatData, deleteChat, putChat } from "../api-handler/chat-handler"

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
    <input type="hidden" id="chat-edit-id" value=${chats.id}>
    <input type="text" name="chat-edit-entry" id="chat-edit-entry" value= ${chats.entry}>
  </fieldset>
  <button id="editSaveBtn" type="button">Save Chat</button>`



}

function addChatFormDOM (chatContainer, chatForm){
  let chatEntry = document.querySelector("#chat-entry").value
  let chatsDisplay = document.querySelector("#chat-display")
  document.querySelector(`#${chatContainer}`).innerHTML = chatForm;
  document.querySelector("#editSaveBtn").addEventListener("click", () => {
    let chatID = document.querySelector("#chat-edit-id").value
    let updateChat = chatFactory(chatEntry)
      updateChat.id = chatID
    putChat(updateChat)
    .then (() => {
      chatsDisplay.innerHTML = ""
      getChatData()
      .then(newChat => listChats(newChat))
    })
  })
}











export { createChatForm }