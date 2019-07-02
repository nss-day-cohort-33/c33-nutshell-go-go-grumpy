// Mark
import { getData, postData } from "./api-handler.js"

function postUsertoDB(placeholder) {
  return postData("users", placeholder)
}

function formData() {
  return getData("users")
}


export { formData, postUsertoDB }

