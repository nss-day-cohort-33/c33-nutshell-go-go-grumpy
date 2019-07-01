

// To handle the different fetch calls
// Matthew McDevitt and Curt Cato
function getData(inputData){
 return fetch(`http://localhost:8088/${inputData}`)
 .then( data => data.json())
}

function  postData(selectData, id){
    return fetch(`http://localhost:8088/${selectData}/${id}`, {
    method:"POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(selectData)
    })
}

function putData(newData, id){
    return fetch(`http://localhost:8088/${newData}/${id}`, {
    method:"PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(newData)
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