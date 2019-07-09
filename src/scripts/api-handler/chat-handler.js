import { getData, postData, deleteData, putData } from "./api-handler"

function getChatData() {
  return getData("chats")
}

function postChatData(placeholder) {
  return postData("chats", placeholder)
}

function deleteChat (id) {
  return deleteData("chats", id)
}

function putChat (data){
 return putData("chats", data)

}

export { getChatData, postChatData, deleteChat, putChat}