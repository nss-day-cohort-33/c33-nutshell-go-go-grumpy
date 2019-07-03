
import { getData, postData } from "./api-handler"

function getChatData() {
  return getData("chats")
}

function postChatData(placeholder) {
  return postData("chats", placeholder)
}

export { getChatData, postChatData }