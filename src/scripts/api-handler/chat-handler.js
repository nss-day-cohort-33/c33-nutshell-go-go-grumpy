import { getData, postData, deleteData, putData, getAllData } from "./api-handler"

function getChatData(currentUser) {
  return getData("chats", currentUser)
}
function getAllChat (chat){
  return getAllData("chats")
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

export { getAllChat, getChatData, postChatData, deleteChat, putChat}