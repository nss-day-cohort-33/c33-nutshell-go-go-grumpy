//Curt Cato. Handler functions

import { postData, putData, getData, deleteData } from "./api-handler.js";

function getTaskData() {
  return getData("users");
}



export { getTaskData };
