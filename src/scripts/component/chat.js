
import { getChatData } from "../api-handler/chat-handler"


function eventListener() {
  document.querySelector("#chat-send").addEventListener("click", function () {
    let chatEntry = document.querySelector("#chat-entry").value
    let newChat = chatFactory(chatEntry)
    console.log(newChat)
  })
}


const listChats = () => {
  selectDOM.innerHTML = ""
  // selectDOM.appendChild(createChatForm());
}

function chatFactory(entry) {
  return {
    entry: entry
  }
}

function createChatForm() {
  let selectDOM = document.querySelector("#container");
  selectDOM.innerHTML = ` 
    <input type="hidden" id="chat-id" >
    <textarea id="chat-entry"></textarea>
    <button id="chat-send">send chat</button>
  `;
  eventListener()
}


getChatData()
.then (chatData => listChats(chatData))


export { createChatForm }