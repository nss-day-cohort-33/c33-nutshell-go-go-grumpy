import { getData } from "api-handler.js"

function getChatData (){
    return getData("chat")
   }
   export{getChatData}