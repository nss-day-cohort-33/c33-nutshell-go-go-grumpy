import {getData} from "./api-handler"

function getEventsData (){
 return getData("events")
}

export{getEventsData}