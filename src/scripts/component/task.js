import { getTaskData, putTaskData, postTaskData } from "../api-handler/task-handler";


function createTaskList() {
 let formTaskList = document.querySelector("#container")
  formTaskList.innerHTML =
        `<fieldset >
        <label for="nameOfTask">Task Name</label>
        <input type="text" name="nameOfTask" id="nameOfTask" required>
    </fieldset>
    <fieldset>
        <label for="taskDate">Task Date</label>
        <input type="date" name="taskDate" id="taskDate" required>
    </fieldset>
    <button id= "saveBtn" type="button">Save Event</button>
    <div id = "displayTask"></div>
    <button id= "editBtn" type="button">Edit Event</button>
    `
}
// template for database json
function buildTaskObj(todo, date) {
  return {
    newTaskEntry: todo,
    date: date
  }
}
// Attach event listener to the form element
function taskListener() {
  let taskContainer = document.querySelector("#container")
  document.querySelector("#saveBtn").addEventListener("click", () => {
  // console.log("save clicked")
  let nameTaskValue = document.querySelector("#nameOfTask").value
  let dateTaskValue = document.querySelector("#taskDate").value
  let newTask = buildTaskObj(nameTaskValue, dateTaskValue)
  postTaskData(newTask)
  getTaskData()
  // console.log(newTask)
  .then (event =>
    listTasks(event)
    )
})
}
//Create the Task Items that are Posted Under The Form

function createTasks(tasks) {
  let el = document.createElement("div");
  let div = document.createElement("div");
  let section = document.createElement("section");
  let deleteBtn = document.createElement("button");
  let editBtn = document.createElement("button");
  section.innerHTML = `
  <section id = "${tasks.id}">
  <h2>${tasks.name}</h2>
    <article>
      <p>${tasks.date}</p>
    </article>
  </section>`;
  el.appendChild(section);
  // deleteBtn.setAttribute("id", `deleteBtn-${event.id}`)
  el.appendChild(div)
  return el
}
// get and displays from json

const listTasks = (taskArr) => {
  let taskDisplay = document.querySelector("#displayTask")
  document.querySelector ("#displayTask").innerHTML= ""
  taskArr.forEach(task =>
  taskDisplay.appendChild(createTasks(task))
  )
}
export { createTaskList, taskListener, putTaskData }
