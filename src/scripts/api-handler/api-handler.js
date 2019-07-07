

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

// function updateLego(updatedLego) {
//     return fetch(`http://localhost:8088/legos/${updatedLego.id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(updatedLego)
//     })
//   }

// putTask (id, object) {
//     return fetch (`${url}/tasks/${id}`, {
//         method: "PUT",
//         headers: {
//             "content-type": "application/json"
//         },
//         body: JSON.stringify(object)
//     }).then(r => r.json())
// },


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

function deleteData(resource, id){
    return fetch(`http://localhost:8088/${resource}/${id}`,{
        method: "DELETE",
        headers:{
            "Content-Type": "application/json"
        }
    })
}

export {getData, postData, putData, deleteData}