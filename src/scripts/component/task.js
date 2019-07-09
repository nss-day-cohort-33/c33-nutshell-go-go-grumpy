// Mark Price
import {
  getTaskData,
  putTaskData,
  postTaskData,
  deleteTaskData
} from "../api-handler/task-handler";

function createTaskList() {

  let formTaskList = document.querySelector("#container");
  let currentUserId = sessionStorage.getItem("userId")
  getTaskData(currentUserId)
  .then (task =>
    listTasks(task)
    )
  formTaskList.innerHTML = `
  <h2>Tasks ToDo</h2>
    <fieldset >
        <label for="nameOfTask">Task Name</label>
        <input type="text" name="nameOfTask" id="nameOfTask" required>
    </fieldset>
    <fieldset>
        <label for="taskDate">Task Date</label>
        <input type="date" name="taskDate" id="taskDate" required>
    </fieldset>
    <button id= "saveBtn" type="button">Save</button>
    <div id="displayTaskIncomplete"><h3>Task List</h3>
    <ul id="incomplete-tasks-list">
    </ul>
    </div>
    <div id ="displayTaskComplete"><h3 id="completed-tasks"></h3>
    <ul id="completed-tasks-list">
    </ul>
    </div> `;

  // RADIO BUTTON EVENT
  document
    .querySelector("#displayTaskIncomplete")
    .addEventListener("click", () => {
      if (event.target.id.startsWith("#radio")) {
        console.log(event.target.id);
        // let completeTaskId = event.target.id;
        // if (event.target.checked === true) {
        //   getTaskData();
        //   completeTaskId.then(task => {
        //     completeTaskId;
        //   });
        // }
      }
    });

}

// template for database json
function buildTaskObj(todo, date, currentUserId) {
  return {
    newTaskEntry: todo,
    date: date,
    currentUser: currentUserId
  };
}
// ATTACH EVENT LISTENER TO FORM
function taskListener() {

  let taskContainer = document.querySelector("#container");
  document.querySelector("#saveBtn").addEventListener("click", () => {
    let currentUserId = sessionStorage.getItem("userId")
    console.log("save clicked");
    let nameTaskValue = document.querySelector("#nameOfTask").value;
    let dateTaskValue = document.querySelector("#taskDate").value;
    let newTask = buildTaskObj(nameTaskValue, dateTaskValue, currentUserId);
    postTaskData(newTask)
    .then(() => {
      getTaskData(currentUserId)
        // console.log("new task")
        .then(todo => listTasks(todo));
    });
  });
}
// CREATES THE TASK ITEMS
function createTasks(tasks) {
  let currentUserId = sessionStorage.getItem("userId")
  let el = document.createElement("div");
  let div = document.createElement("div");
  let section = document.createElement("section");
  let deleteBtn = document.createElement("button");
  let editBtn = document.createElement("button");
  let completedTasksContainer = document.querySelector("#complete-tasks-list");
  let incompleteTasksContainer = document.querySelector(
    "#incomplete-tasks-list"
  );
  section.innerHTML = `<div>
  <section id = "${tasks.id}">
  <h2>${tasks.newTaskEntry}</h2>
    <article>
      <p>${tasks.date}</p>
    </article>
  </section>
  <input id="#radio-${tasks.id}" type="radio"></button>
  <button id= "editBtn" type="button">Edit</button>
    </div>
    `;
  el.appendChild(section);
  div.setAttribute("id", `taskContainer-${tasks.id}`);

  // DELETE BUTTON CONTROL
  deleteBtn.setAttribute("id", `${tasks.id}`);
  deleteBtn.textContent = "delete";
  deleteBtn.addEventListener("click", () => {
    console.log("delete");
    let id = event.target.id;
    deleteTaskData(id).then(data => {
      console.log(data);
      incompleteTasksContainer.innerHTML = " ";
      getTaskData(currentUserId).then(tasks => listTasks(tasks));
    });
  });
  el.appendChild(div);
  el.appendChild(deleteBtn);
  return el;

}

function createTaskEditForm(task) {
  let taskContainer = document.querySelector(`#editField-${task.id}`);
  taskContainer.innerHTML = `
  <h2>Task List</h2>
    <fieldset >
        <label for="nameOfTask">Task Name</label>
        <input type="text" name="nameOfTask" id="nameOfTask" required>
    </fieldset>
    <fieldset>
        <label for="taskDate">Task Date</label>
        <input type="date" name="taskDate" id="taskDate" required>
    </fieldset>
    <button id= "saveBtn" type="button">Save</button>
    <div id="displayTaskIncomplete"><h3>Incomplete</h3>
    <ul id="incomplete-tasks-list">
      <li class= "task-checkbox></li>
    </ul>
    </div>
    <div id ="displayTaskComplete"><h3 id="completed-tasks"></h3>
    <ul id="completed-tasks-list">
    <button id= "editBtn" type="button">Edit</button>
      <li id="completed-item"></li>
    </ul>
    </div> `;
}

function createTaskEditButton() {
  // EDIT BTN FOR INCOMPLETE TASKS

  let editBtn = document.createElement("editBtn");
  editBtn.setAttribute("id", `editBtn-${task.id}`);
  editBtn.textContent = "edit";
  editBtn.addEventListener("click", () => {
    console.log("edit");
    // let editForm = createTaskEditForm(task);
    addEditFormDOM(div.id.editForm);
  });
  el.appendChild(editBtn);

}
// createTaskEditButton()

// GETS and DISPLAYS from json
const listTasks = taskArr => {
  let taskDisplay = document.querySelector("#incomplete-tasks-list");
  document.querySelector("#incomplete-tasks-list").innerHTML = " ";
  taskArr.forEach(task => taskDisplay.appendChild(createTasks(task)));
};

export { createTaskList, taskListener};
