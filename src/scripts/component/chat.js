
import { getChatData, postChatData } from "../api-handler/chat-handler"


function eventListener() {
  document.querySelector("#chat-send").addEventListener("click", function () {
    let chatEntry = document.querySelector("#chat-entry").value
    let newChat = chatFactory(chatEntry)
    // postNewChat(newChat)
    postChatData(newChat)
    console.log(newChat)
  })
}

// const listChats = (newChat) => {
//   let selectDOM = document.querySelector("#container");
//   newChat.forEach(entry => {
//     selectDOM.appendChild(createChatForm(entry));
//   })
// }

function chatFactory(entry) {
  return {
    entry: entry
  }
}

function createChatForm() {
  let selectDOM = document.querySelector("#container");
  selectDOM.innerHTML = ` 
    <input type="hidden" id="chat-id">
    <textarea id="chat-entry"></textarea>
    <button id="chat-send">send chat</button>
  `;
  eventListener()
}


getChatData()
// .then (chatData => listChats(chatData))


export { createChatForm }