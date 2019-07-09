// To handle the different fetch calls
// Matthew McDevitt and Curt Cato

function getData(inputData, currentUser){
 return fetch(`http://localhost:8088/${inputData}/?currentUser=${currentUser}`)
    .then( data => data.json())
   }

function getAllData(inputData){
 return fetch(`http://localhost:8088/${inputData}`)
 .then( data => data.json())
}



function  postData(selectData, data){
    return fetch(`http://localhost:8088/${selectData}`, {
    method:"POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
    })
}

function putData(resource, data){
    return fetch(`http://localhost:8088/${resource}/${data.id}`, {
    method:"PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
    })

}

function deleteData(resource, id){
    return fetch(`http://localhost:8088/${resource}/${id}`,{
        method: "DELETE",
        headers:{
            "Content-Type": "application/json"
        }
    })
}

export {getData, postData, putData, deleteData, getAllData}
