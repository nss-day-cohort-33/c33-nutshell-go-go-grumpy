
import { getData } from "api-handler.js"

function getChatData() {
  return getData("chatData")
}

export { getChatData }