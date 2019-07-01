// Mark
import { getData } from "../api-handler/api-handler.js"

function formData() {
  return getData("users")
}


export { formData }

