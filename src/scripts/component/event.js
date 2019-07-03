import { postEventsData, getEventsData, deleteEvent } from "../api-handler/event-handler.js";

let eventDisplay = document.querySelector("#displayEvents")
// Updates the display so that the current data from json
function createEventFrom() {
    getEventsData()
        .then(events =>
            listEvents(events)
        )
    // creating the the form to input the data.
    let formContainer = document.querySelector("#container")
    formContainer.innerHTML = `
    <form class="eventForm">
        <fieldset >
        <label for="NameOfEvent">Event Name</label>
        <input type="text" name="NameOfEvent" id="nameOfEvent">
    </fieldset>
    <fieldset>
        <label for="eventDate">Event Date</label>
        <input type="date" name="EventDate" id="eventDate" >
    </fieldset>
    <fieldset>
        <label for="locationOfEvent">Location of Event:</label>
        <input type="text" name="locationOfEvent" id="locationOfEvent">
    </fieldset>
    <button id= "saveBtn" type="button">Save Event</button>
    <div id = "displayEvents"></div>
    `
}

// the factory function that is a template to put the data into json
function eventFactory(name, location, date) {
    return {
        name: name,
        location: location,
        date: date
    }
}

// It controls the save button and gets the value of the input fields
function eventListener() {
    let formContainer = document.querySelector("#container")
    document.querySelector("#saveBtn").addEventListener("click", function () {
        console.log("button")
        let nameEventValue = document.querySelector("#nameOfEvent").value
        let dateEventValue = document.querySelector("#eventDate").value
        let locationEventValue = document.querySelector("#locationOfEvent").value
        let newEvent = eventFactory(nameEventValue, dateEventValue, locationEventValue)
        postEventsData(newEvent)
        getEventsData()
            .then(events =>
                listEvents(events)
            )
    })
}

//  creates the event items that are posted under the form
function createEvent(events) {

    let el = document.createElement("div");
    let div = document.createElement("div");
    let section = document.createElement("section");
    let deleteBtn = document.createElement("button");
    let editBtn = document.createElement("button");
    section.innerHTML = `
  <section id = "${events.id}">
  <h2> ${events.name} </h2>
       <article>
           <p> ${events.location} ${events.date} </p>
        </article>
  </section>`;

    el.appendChild(section);
    div.setAttribute("id", `eventContainer-${events.id}`)
    // the delete button control
    deleteBtn.setAttribute("id", `${events.id}`)
    deleteBtn.textContent = "delete"
    deleteBtn.addEventListener("click", () => {
        console.log("hello")
        let id = event.target.id
        deleteEvent(id)
            .then(data => {
                console.log(data)
                eventDisplay.innerHTML = ""
                getEventsData()
                    .then(events =>
                        listEvents(events)
                    )
            })

    })
    el.appendChild(div)
    el.appendChild(deleteBtn)
    return el
}

// it gets all of the objects from json and displays it
const listEvents = (eventArr) => {
    let eventDisplay = document.querySelector("#displayEvents")
    document.querySelector("#displayEvents").innerHTML = ""
    eventArr.forEach(event => {
        eventDisplay.appendChild(createEvent(event))
    })
}



export { createEventFrom, eventListener }