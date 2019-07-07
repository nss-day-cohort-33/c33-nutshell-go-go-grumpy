import { getData, postData, deleteData, putData } from "./api-handler";

// Handles the news API
// Matthew McDevitt, Curt

function getNewsData (){
    return getData("articles")
   }

//    getJournalEntry (id) {
//     return fetch(`http://localhost:3000/entries/${id}`)
//     .then(response => response.json()
//     );
//   }

function postNewsData (placeholder){
    return postData("articles", placeholder)
}

function deleteNews (id) {
    return deleteData("articles", id)
}

function putNewsData(editedThing, id) {
    return putData("articles", editedThing, id)
}

   export{ getNewsData, postNewsData, deleteNews, putNewsData }