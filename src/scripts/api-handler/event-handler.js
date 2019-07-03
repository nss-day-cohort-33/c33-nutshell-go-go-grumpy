import {getData, postData, deleteData} from "./api-handler"

function getEventsData (){
 return getData("events")
}
function postEventsData (placeholder){
    return postData("events", placeholder)
   }

function deleteEvent (id){
    return deleteData("events", id)
}

export{getEventsData, postEventsData, deleteEvent}