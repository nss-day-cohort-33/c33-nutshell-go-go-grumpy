
import { getData } from "./api-handler"

function getChatData() {
  return getData("chats")
}

export { getChatData }