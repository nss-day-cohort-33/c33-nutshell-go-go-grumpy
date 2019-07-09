import {getData, postData, deleteData, putData} from "./api-handler"

function getEventsData (currentUser){
 return getData("events", currentUser)
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