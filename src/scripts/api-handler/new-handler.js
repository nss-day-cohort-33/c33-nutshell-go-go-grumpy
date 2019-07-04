import { getData, postData, deleteData, putData } from "./api-handler";

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

function putNewsData(placeholder) {
    return putData("articles", placeholder)
}

   export{ getNewsData, postNewsData, deleteNews, putNewsData }