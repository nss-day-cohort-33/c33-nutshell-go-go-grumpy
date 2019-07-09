import {getData, postData, deleteData, putData} from "./api-handler"

function getEventsData (){
 return getData("events")
}
function postEventsData (placeholder){
    return postData("events", placeholder)
   }

function deleteEvent (id){
    return deleteData("events", id)
}

function putEvent (data){
    console.log(data)
   return putData("events", data)

}

export{getEventsData, postEventsData, deleteEvent, putEvent}