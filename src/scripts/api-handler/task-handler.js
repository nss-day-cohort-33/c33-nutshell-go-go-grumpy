//Curt Cato. Handler functions

import { postData, putData, getData, deleteData } from "./api-handler.js";

function getTaskData() {
  return getData("tasks");
}
function putTaskData(placeholder) {
  return putData("tasks", placeholder)
}

function postTaskData(placeholder) {
  return postData("tasks", placeholder)
}

function deleteTaskData(placeholder) {
  return deleteData("tasks", placeholder)
}


export { getTaskData , putTaskData, postTaskData, deleteTaskData };