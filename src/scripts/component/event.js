import {postEventsData} from "../api-handler/event-handler.js";
function createEventFrom (){
    // defining all the different elements to create events
    let formContainer = document.querySelector("#container")
    formContainer.innerHTML =`
    <form class="eventForm">
        <fieldset >
        <label for="NameOfEvent">Event Name</label>
        <input type="text" name="NameOfEvent" id="nameOfEvent" required>
    </fieldset>
    <fieldset>
        <label for="eventDate">Event Date</label>
        <input type="date" name="EventDate" id="eventDate" required>
    </fieldset>
    <fieldset>
        <label for="locationOfEvent">Location of Event:</label>
        <input type="text" name="locationOfEvent" id="locationOfEvent" required>
    </fieldset>
    <button id= "saveBtn" type="button">Save Event</button>
    <div id = "displayEvents"></div>
    `
}
function eventFactory  (name, location, date){
    return {
        name: name,
        location: location,
        date: date
    }
}

function eventListener (){
    document.querySelector("#saveBtn").addEventListener("click", function (){
        console.log("button")
        let nameEventValue = document.querySelector("#nameOfEvent").value
        let dateEventValue = document.querySelector("#eventDate").value
        let locationEventValue = document.querySelector("#locationOfEvent").value
        let newEvent = eventFactory (nameEventValue, dateEventValue, locationEventValue)
        postEventsData(newEvent)
    })
}




export{createEventFrom, eventListener}