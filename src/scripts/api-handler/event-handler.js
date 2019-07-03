import {getData, postData} from "./api-handler"

function getEventsData (){
 return getData("events")
}
function postEventsData (placeholder){
    return postData("events", placeholder)
   }
export{getEventsData, postEventsData}