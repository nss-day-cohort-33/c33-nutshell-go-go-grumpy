
import { getChatData, postChatData, deleteChat, putChat } from "../api-handler/chat-handler"

function createChatForm() {
  getChatData()
    .then(poop =>
      listChats(poop)
    )
  let selectDOM = document.querySelector("#container");
  selectDOM.innerHTML = ` 
    <h1 class="page-heading"><span class="icon-chats"></span> messages</h1>
    <div id="chat-display" class="page-body"></div>
    <textarea id="chat-entry" type="text"></textarea>
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
          .then(chatData => listChats(chatData))
      })
  })
}

function createChatDisplay(chats) {
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
  div.setAttribute("id", `chatContainer-${chats.id}`)
  deleteBtn.setAttribute("id", `${chats.id}`)
  deleteBtn.setAttribute("class", "btn-delete")
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
  editBtn.setAttribute("class", "btn-edit")
  editBtn.textContent = "edit"
  editBtn.addEventListener("click", () => {
    console.log("edit clicked")
    let chatForm = createChatEditForm(chats)
    addChatFormDOM(div.id, chatForm)
  })

  el.appendChild(deleteBtn)
  el.appendChild(editBtn)
  return el
}

function createChatEditForm(chats) {
  return `
  <fieldset>
    <textarea type="text" name="chat-edit-entry" id="chat-edit-entry" value= ${chats.entry}></textarea>
    <input type="hidden" id="chat-edit-id" value=${chats.id}>
  </fieldset>
  <button id="editSaveBtn" type="button">Save Edit</button>`
}

let listChats = (chatData) => {
  let chatsDisplay = document.querySelector("#chat-display")
  chatsDisplay.innerHTML = ""
  chatData.forEach(poop => {
    chatsDisplay.appendChild(createChatDisplay(poop))
  })
}

function addChatFormDOM(chatContainer, chatForm) {
  let eventDisplay = document.querySelector("#chat-display")
  document.querySelector(`#${chatContainer}`).innerHTML = chatForm;
  document.querySelector("#editSaveBtn").addEventListener("click", () => {
    let eventID = document.querySelector("#chat-edit-id").value
    let editInputField = document.querySelector("#chat-edit-entry").value
    let updateChat = chatFactory(editInputField)
    updateChat.id = eventID
    putChat(updateChat)
      .then(() => {
        eventDisplay.innerHTML = ""
        getChatData()
          .then(newChat => listChats(newChat))
      })
  })
}

export { createChatForm }