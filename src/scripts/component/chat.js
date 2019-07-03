
import { getChatData } from "../api-handler/chat-handler"




const listChats = () => {
  selectDOM.innerHTML = ""
  // selectDOM.appendChild(createChatForm());
}


function createChatForm() {
  let selectDOM = document.querySelector("#container");
  selectDOM.innerHTML = ` 
    <input type="hidden" id="chat-id" >
    <textarea id="chat-entry"></textarea>
    <button id="chat-send">send chat</button>
  `;
}


getChatData()
.then (chatData => listChats(chatData))


export { createChatForm }