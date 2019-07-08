

// To handle the different fetch calls
// Matthew McDevitt and Curt Cato
function getData(inputData){
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

function deleteData(removeData, id){
    return fetch(`http://localhost:8088/${removeData}/${id}`,{
        method: "DELETE",
        headers:{
            "Content-Type": "application/json"
        }
    })
}

export {getData, postData, putData, deleteData}