
import { getData, postData, deleteData } from "./api-handler"

function getChatData() {
  return getData("chats")
}

function postChatData(placeholder) {
  return postData("chats", placeholder)
}

function deleteChat (id) {
  return deleteData("chats", id)
}


export { getChatData, postChatData, deleteChat}