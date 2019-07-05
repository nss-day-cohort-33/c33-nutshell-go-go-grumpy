import { postEventsData, getEventsData, deleteEvent, putEvent} from "../api-handler/event-handler.js";

let eventDisplay = document.querySelector("#displayEvents")

function addEditFormDOM (editContainer, editForm){
    document.querySelector(`#${editContainer}`).innerHTML = editForm;
    document.querySelector("#editSaveBtn").addEventListener("click", () => {
    let eventName = document.querySelector("#editNameOfEvent").value
    let eventDate = document.querySelector("#editEventDate").value
    let eventLocation = document.querySelector("#editLocationOfEvent").value
    let eventID = document.querySelector("#event-id").value
    let updateEvent = eventFactory(eventName, eventLocation, eventDate)
        updateEvent.id = eventID
    putEvent(updateEvent)
    .then(() => {
        eventDisplay.innerHTML = ""
        getEventsData()
        .then (taco => listEvents(taco))
    })
})
}

// Updates the display so that the current data from json
function createEventFrom() {
    getEventsData()
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
function eventFactory(name, location, date) {
    return {
        name: name,
        date: date,
        location: location
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
        let newEvent = eventFactory(nameEventValue, locationEventValue, dateEventValue)
        postEventsData(newEvent)
        .then((event)=>{
        getEventsData(event)
            .then(events =>
                listEvents(events)
            )
        })
    })
}

//  creates the event items that are posted under the form
function createEvent(events) {
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

function createEventEditForm (events){
    return `

    <fieldset >
    <label for="NameOfEvent">Event Name</label>
    <input type="text" name="NameOfEvent" id="editNameOfEvent" value=${events.name}>
    <input type="hidden" id="event-id" value=${events.id}>
</fieldset>
<fieldset>
    <label for="eventDate">Event Date</label>
    <input type="date" name="EventDate" id="editEventDate" value=${events.eventDate}>
</fieldset>
<fieldset>
    <label for="locationOfEvent">Location of Event:</label>
    <input type="text" name="locationOfEvent" id="editLocationOfEvent" value= ${events.location}>
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




export { createEventFrom, eventListener }