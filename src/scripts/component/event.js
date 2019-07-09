import { postEventsData, getEventsData, deleteEvent, putEvent} from "../api-handler/event-handler.js";


// Updates the display so that the current data from json
function createEventForm() {
    let currentUserId = sessionStorage.getItem(name)
    getEventsData(currentUserId)
        .then(events =>
            listEvents(events)
        )
    // creating the the form to input the data.
    let formContainer = document.querySelector("#container")
    formContainer.innerHTML = `

        <fieldset>
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
function eventFactory(name, location, date, currentUserId) {
    return {
        name: name,
        date: date,
        location: location,
        currentUser: currentUserId
    }
}

// It controls the save button and gets the value of the input fields
function saveEventListener() {
    let formContainer = document.querySelector("#container")
    document.querySelector("#saveBtn").addEventListener("click", function () {
        let current = sessionStorage.getItem(name)
        console.log("button")
        let nameEventValue = document.querySelector("#nameOfEvent").value
        let dateEventValue = document.querySelector("#eventDate").value
        let locationEventValue = document.querySelector("#locationOfEvent").value
        let newEvent = eventFactory(nameEventValue, locationEventValue, dateEventValue, current)
        postEventsData(newEvent)
        .then(()=>{
        getEventsData(current)
            .then(events =>
                listEvents(events)
            )
        })
    })
}

//  creates the event items that are posted under the form
function createEvent(events) {
    let currentUserId = sessionStorage.getItem(name)
    parseInt(currentUserId)
    let eventDisplay = document.querySelector("#displayEvents")
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
    el.appendChild(div)
    div.setAttribute("id", `eventContainer-${events.id}`)
    // the delete button control
    deleteBtn.setAttribute("id", `${events.id}`)
    deleteBtn.textContent = "delete"
    deleteBtn.addEventListener("click", () => {

        let id = event.target.id
        deleteEvent(id)
            .then(data => {
                eventDisplay.innerHTML = ""
                getEventsData(currentUserId)
                    .then(taco =>
                        listEvents(taco)
                    )
            })

    })
    // the edit button
    editBtn.setAttribute("id", `editBtn-${events.id}`)
    editBtn.textContent = "edit"
    editBtn.addEventListener("click", ()=> {
        console.log("edit button")
        let editForm = createEventEditForm(events)
        addEditFormDOM(div.id, editForm)

    })
    el.appendChild(deleteBtn)
    el.appendChild(editBtn)
    return el
}


// creating the Edit form  to input the new data
function createEventEditForm (events){
    return `

    <fieldset >
    <label for="NameOfEvent">Event Name</label>
    <input type="text" name="NameOfEvent" id="editNameOfEvent" value=${events.name}>
    <input type="hidden" id="editEvent-id" value=${events.id}>
</fieldset>
<fieldset>
    <label for="eventDate">Event Date</label>
    <input type="text" name="editEventDate" id="editEventDate" value=${events.eventDate}>
</fieldset>
<fieldset>
    <label for="locationOfEvent">Location of Event:</label>
    <input type="text" name="editLocationOfEvent" id="editLocationOfEvent" value= ${events.location}>
</fieldset>

<button id= "editSaveBtn" type="button">Save Event</button>`
}


// it gets all of the objects from json and displays it
const listEvents = (eventArr) => {
    let eventDisplay = document.querySelector("#displayEvents")
    document.querySelector("#displayEvents").innerHTML = ""
    eventArr.forEach(event => {
        eventDisplay.appendChild(createEvent(event))
    })
}

// will add the edited event to the data base and update the list of events
function addEditFormDOM (editContainer, editForm){
    let currentUserId = sessionStorage.getItem(name)
    let eventDisplay = document.querySelector("#displayEvents")
    document.querySelector(`#${editContainer}`).innerHTML = editForm;
    document.querySelector("#editSaveBtn").addEventListener("click", () => {
    let eventName = document.querySelector("#editNameOfEvent").value
    let eventDate = document.querySelector("#editEventDate").value
    let eventLocation = document.querySelector("#editLocationOfEvent").value
    let eventID = document.querySelector("#editEvent-id").value
    let updateEvent = eventFactory(eventName, eventLocation, eventDate, x)
        updateEvent.id = eventID
    putEvent(updateEvent)
    .then (() => {
        eventDisplay.innerHTML = ""
        getEventsData(currentUserId)
        .then(newEvent => listEvents(newEvent))
    })
})
}


export { createEventForm, saveEventListener }