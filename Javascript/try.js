

const form = document.getElementById('form');
const task_id = document.getElementById('Task_id')
const task_title = document.getElementById('Task_title');
const date_start = document.getElementById('Task_startdate');
const date_end = document.getElementById('Task_enddate');
const status_value = document.getElementById('task_status')
let arr = [];
let check = true
let subtaskadd = false;
let parentid = 0;
let parenttaskid = -1;
form.addEventListener('submit', function (event) {
    event.preventDefault();
        const data = {
            id: task_id.value,
            title: task_title.value,
            start: date_start.value,
            end: date_end.value,
            status: status_value.value,
            subtaskdata: []
        }

        console.log(data.id)

        if (TaskArray.length != 0) {
            TaskArray.map((item) => {
                if (item.id == data.id) {
                    check = false;
                }
            })

            if (check) {
                TaskArray.push(data)
            }
            else {
                console.log("dublicated entry found")
            }
        }
        else {
            TaskArray.push(data)

        }


        console.log(TaskArray)
        showparent();
    }
)

// function showdata() {
//     const tableBody = document.querySelector(".table_body");



//     const tableRows = arr.map((item, index) => {
//         parentid = item.id;
//         return `
//         <tr id=${"tp"} class=${item.id} >
//           <td>${item.id}</td>
//           <td>${item.title}</td>
//           <td>${item.start}</td>
//           <td>${item.end}</td>
//           <td>${item.status}</td>
//           <td><button class=${"edit "} id=${"butstyle"} button_index=${index}>Edit</button></td>
//           <td><button class=${"delete "} id=${"butstyle"} button_index=${index}>Delete</button></td>
//           <td><button class=${"add "} id=${"butstyle"} button_index=${index}>Add</button></td>
//         </tr>
//       `;
//     });
   
//     tableBody.innerHTML = tableRows;
//     const editbutton = document.querySelectorAll('.edit')
//     editbutton.forEach((button) => {
//         button.addEventListener("click", (event) => {
//             const index = event.target.getAttribute("button_index")
//             const edittask = prompt("edit task:", arr[index].id)

//             if (edittask != null) {
//                 arr[index].id = edittask;
//                 showdata();
//             }
//         })
//     })

//     const deletebutton = document.querySelectorAll('.delete')

//     deletebutton.forEach((button) => {
//         button.addEventListener("click", (event) => {

//             const index = event.target.getAttribute("button_index")

//             console.log(index)

//             if (index != null) {
//                 arr.splice(index, 1);
//                 showdata();
//             }
//         })
//     })

//     const addbutton = document.querySelectorAll('.add')
//     addbutton.forEach((button) => {
//         button.addEventListener("click", subtask)
//     })

// }

function showparent() {
    const tableBody = document.querySelector(".table_body");

    let tr = 0;

    tr = tableBody.insertRow(0);
    
    //  const editbutton=document.createElement("")

    const tablerow = TaskArray.map((item, index) => {
        tr.insertCell().textContent = item.id;

        tr.insertCell().textContent = item.title;

        tr.insertCell().textContent = item.start

        tr.insertCell().textContent = item.end;

        tr.insertCell().textContent = item.status;
        tr.insertCell().innerHTML=`<button class=${"edit "} id=${"butstyle"} button_index=${index}>Edit</button>`
        tr.insertCell().innerHTML=`<button class=${"delete "} id=${"butstyle"} button_index=${index}>Edit</button>`
        tr.insertCell().innerHTML=`<button class=${"add "} id=${"butstyle"} button_index=${index}>Edit</button>`

    })
    const editbutton = document.querySelectorAll('.edit')
    editbutton.forEach((button) => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("button_index")
            const edittask = prompt("edit task:", TaskArray[index].id)

            if (edittask != null) {
                TaskArray[index].id = edittask;
                showparent();
                delete1()
            }
        })
    })

    const deletebutton = document.querySelectorAll('.delete')

    deletebutton.forEach((button) => {
        button.addEventListener("click", delete1)
    })
}

// function edit(va){

// }
function delete1(){
    const index = event.target.getAttribute("button_index")

    console.log(index)

    if (index != null) {
        TaskArray.splice(index, 1);
        showparent();
    }
}


// function showsubtask(parent) {
//     let p = parent;
//     const tableBody = document.querySelector(".table_body");


//     let newrow = p?.map((item, index) => (
        
//         `<tr id=${"tp"} class=${item.id} >
//         <td>${item.id}</td>
//         <td>${item.title}</td>
//         <td>${item.start}</td>
//         <td>${item.end}</td>
//         <td>${item.status}</td>
//         <td><button class=${"edit "} id=${"butstyle"} button_index=${index}>Edit</button></td>
//         <td><button class=${"delete "} id=${"butstyle"} button_index=${index}>Delete</button></td>
//         <td><button class=${"add "} id=${"butstyle"} button_index=${index}>Add</button></td>
//       </tr> <br/>
//     <tr id=${"tp"} class=${item.id} >
//       <td>${item.subtaskdata[0].id}</td>
//       <td>${item.subtaskdata[0].title}</td>
//       <td>${item.subtaskdata[0].start}</td>
//       <td>${item.subtaskdata[0].end}</td>
//       <td>${item.subtaskdata[0].status}</td>
//     </tr>
//   `
//     ))
//     const row = document.getElementsByClassName("1")
//     const newr = row[0];
//     newr.innerHTML = newrow
//     task_id.style.display = "flex";
//     document.getElementById("task_lable").style.display = "flex";
// }

// function subtask(event) {
//     const index = event.target.getAttribute("button_index")
//     console.log("button " + index)
//     task_id.style.display = "none";
//     document.getElementById("task_lable").style.display = "none";
//     if (index != null) {
//         subtaskadd = true;
//         parenttaskid = index;
//     }
// }

// function editbuttonfun() {
//     const editbutton = document.querySelectorAll('.edit')

//     console.log(" edit button is " + editbutton)

//     editbutton.forEach((button) => {
//         console.log(button)
//         button.addEventListener("click", (event) => {

//             console.log("Hello ji")
//         })
//     })
// }
