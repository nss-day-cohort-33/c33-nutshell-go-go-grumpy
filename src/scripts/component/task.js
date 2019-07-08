import {
  getTaskData,
  putTaskData,
  postTaskData,
  deleteTaskData
} from "../api-handler/task-handler";

function createTaskList() {
  let formTaskList = document.querySelector("#container");
  formTaskList.innerHTML = `
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
    <button id= "editBtn" type="button">Edit</button>
    <div id="displayTaskIncomplete"><h3>Incomplete</h3>
    <ul id="incomplete-tasks-list">
      <li class= "task-checkbox></li>
    </ul>
    </div>
    <div id ="displayTaskComplete"><h3 id="completed-tasks">Complete</h3>
    <ul id="completed-tasks-list">
      <li id="completed-item"></li>
    </ul>
    <button id= "deleteBtn" type="button">Delete</button>
    </div> `;
  // RADIO BUTTON EVENT
  document
    .querySelector("#displayTaskIncomplete")
    .addEventListener("click", () => {
      if (event.target.id.startsWith("#radio")) {
        console.log(event.target.id);
        let completeTaskId = event.target.id;
        if (event.target.checked === true) {
          getTaskData();
          completeTaskId.then(task => {
            completeTaskId;
          });
        }
      }
    });
}

// template for database json
function buildTaskObj(todo, date, complete) {
  return {
    newTaskEntry: todo,
    date: date,
    completedTask: complete
  };
}
// Attach event listener to the form element
function taskListener() {
  let taskContainer = document.querySelector("#container");
  document.querySelector("#saveBtn").addEventListener("click", () => {
    console.log("save clicked");
    let nameTaskValue = document.querySelector("#nameOfTask").value;
    let dateTaskValue = document.querySelector("#taskDate").value;
    let newTask = buildTaskObj(nameTaskValue, dateTaskValue);
    postTaskData(newTask).then(() => {
      getTaskData()
        // console.log("new task")
        .then(todo => listTasks(todo));
    });
  });
}
//Create the Task Items that are Posted Under The Form

function createTasks(tasks) {
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
  // const checkBox=taskListItem.querySelector("input[type=checkbox]")
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
      getTaskData().then(tasks => listTasks(tasks));
    });
  });
  el.appendChild(div);
  el.appendChild(deleteBtn);
  return el;
}

// MOVING COMPLETED TASKS
// function markTaskComplete() {
//   console.log("move");
//   let completeTask = document.querySelectorAll(".task-checkbox");
//   completeTask[i].addEventListener("click", () => {
//     let completeTaskid
//   }
// }

// gets and displays from json

const listTasks = taskArr => {
  let taskDisplay = document.querySelector("#incomplete-tasks-list");
  document.querySelector("#incomplete-tasks-list").innerHTML = " ";
  taskArr.forEach(task => taskDisplay.appendChild(createTasks(task)));
};

export { createTaskList, taskListener };
