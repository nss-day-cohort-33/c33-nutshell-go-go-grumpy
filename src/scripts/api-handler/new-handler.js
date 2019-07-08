//Curt

import { getData, postData, deleteData } from "./api-handler";

// Handles the news API
// Matthew McDevitt, Curt

function getNewsData (){
    return getData("articles")
   }

function postNewsData (placeholder){
    return postData("articles", placeholder)
}

function deleteNews (id) {
    return deleteData("articles", id)
}

function putData(resource, editedThing, id){
    return fetch(`http://localhost:8088/${resource}/${id}`, {
    method:"PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(editedThing)
    })
    .then(res => res.json())
}

function putNewsData(editedThing, id) {
    return putData("articles", editedThing, id)
}

   export{ getNewsData, postNewsData, deleteNews, putNewsData }