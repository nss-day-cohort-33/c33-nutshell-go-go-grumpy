import {getData, postData, deleteData, putData} from "./api-handler"

// Matthew McDevitt
// handles the event api

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