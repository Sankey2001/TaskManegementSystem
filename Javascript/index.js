

const form = document.getElementById('form');
const datatable = document.getElementsByClassName('table_body');
const dublicated_text = document.getElementById('task_text');
const edit_parent_form = document.getElementById('edit_parent_form')
const task_id = document.getElementById('Task_id')
const task_title = document.getElementById('Task_title');
const date_start = document.getElementById('Task_startdate');
const date_end = document.getElementById('Task_enddate');
const status_value = document.getElementById('task_status')
let changestatus = 0;
let TaskArray = [];
let IdArray = [];
let matchingItems = [];

let Parent_edit_id = 0;
let Child_edit_id = 0;
let check = true
let subtaskadd = false;
let parentid = 0;
let parenttaskid = 0;
date_start.addEventListener('input', updatedate);
function updatedate() {
    const currentDate = new Date(date_start.value);
    date_start.min="";
    // date_start.value=""
    const formatteddate = currentDate.toISOString().split('T')[0];
    date_end.min = formatteddate;
    date_start.max="";
}
date_end.addEventListener('input', up);
function up() {
    const currentDate = new Date(date_end.value);
    const formatteddate = currentDate.toISOString().split('T')[0];
    date_start.max = formatteddate;
    date_end.min="";
    date_end.max="";
    date_start.max="";

}
// date_end.min=formatteddate;
form.addEventListener('submit', function (event) {
    event.preventDefault();


    if (!subtaskadd) {
        const data = {
            id: task_id.value,
            title: task_title.value,
            start: date_start.value,
            end: date_end.value,
            status: "In-Progress",
            subtaskdata: []
        }
        task_title.value = " ",
            date_start.value = '',
            date_end.value = ''

        if (TaskArray.length != 0) {

            let idval = IdArray.filter(taskid => taskid == task_id.value);
            console.log("total value", idval)

            if (idval.length == 0) {
                TaskArray.push(data);
                IdArray.push(task_id.value)
                parenttaskid = data.id;
                console.log("my parent task is", parenttaskid)
                console.log(TaskArray)
                dublicated_text.style.display = "none";

                displayTasks();

            }
            else {
                dublicated_text.style.display = "flex";
            }
        }
        else {

            IdArray.push(task_id.value)
            TaskArray.push(data);
            parenttaskid = data.id;
            console.log(TaskArray)
            displayTasks();


        }



        // showdata();
    }
    else {
        const data = {
            id: `${TaskArray[parenttaskid].id}` + "." + (TaskArray[parenttaskid].subtaskdata.length + 1),
            title: task_title.value,
            start: date_start.value,
            end: date_end.value,
            status: "In-Progress",
            // subtaskdata: []
        }
        TaskArray[parenttaskid].subtaskdata.push(data);
        console.log(TaskArray)
        subtaskadd = false;

        displayTasks();
        calculatestatus();
    }
})



function calculatestatus() {
    let Progress = 0;
    let completed = 0;
    let duepassed = 0;
    let cancal = 0;
    TaskArray.map((tasks, index) => {

        tasks.subtaskdata.forEach((task, index) => {
            if (task.status == "In-Progress") {
                Progress += 1;
            }
            if (task.status == "completed") {
                completed += 1;
            }
            if (task.status == "duepassed") {
                duepassed += 1;
            }
            if (task.status == "cancal") {
                cancal += 1;
            }
        })
    })
    console.log("Progress", Progress)
    console.log("completed", completed)
    console.log("overdate", duepassed)
    console.log("cancal", cancal)
    if (cancal > 0) {
        TaskArray[parenttaskid].status = "cancal";
        console.log(TaskArray[parenttaskid])
        displayTasks();
    }
    if (duepassed > 0) {
        TaskArray[parenttaskid].status = "duepassed";
        console.log(TaskArray[parenttaskid])
        displayTasks();
    }
    else if (completed > 0 && Progress == 0 && duepassed == 0 && cancal == 0) {
        TaskArray[parenttaskid].status = "completed";
        console.log(TaskArray[parenttaskid])
        displayTasks();
    }
    else if (Progress > 0) {
        TaskArray[parenttaskid].status = "In-Progress";
        console.log(TaskArray[parenttaskid])
        displayTasks();
    }
}

function addSubtask(index) {
    Parent_edit_id = index;
    console.log("button " + index)
    task_id.style.display = "none";
    document.getElementById("task_lable").style.display = "none";
    if (index != null) {
        subtaskadd = true;
        parenttaskid = index;
    }
}
function displayTasks() {

    //const table = document.createElement('table');

    innerHTML = `

    <tr>

      <th>Task ID</th>

      <th>Task Name</th>

      <th>Start Date</th>

      <th>End Date</th>

      <th>Status</th>

      <th>action</th>

    </tr>

  `;



    TaskArray.forEach((task, index) => {

        // const row = document.createElement('tr');

        innerHTML += `<tr id=tablerow>

      <td >${task.id}</td>

      <td id='text_margin'>${task.title}</td>

      <td id='start_margin'>${task.start}</td>

      <td id='end_margin'>${task.end}</td>

      <td id=${task.status}>${task.status}</td>

      <td id="buttons_crud"><button onclick="addSubtask(${index}) " id="add_taskbutton"> Add subtask </button>  
            <button onclick="Edit_task(${index})" id="edit_taskbutton">  Edit </button>
           <button onclick="Delete_task(${index})" id="delete_taskbutton"> Delete </button> </td>
           </tr>

    `;
        if (task.subtaskdata.length > 0) {

            innerHTML += `<tr>

      <th id='subtasklist'> Sub Task List </th>

    </tr>

    `;

        }
        task.subtaskdata.forEach((subtask, i) => {
            innerHTML += `<tr>

        <td>${subtask.id}</td>

        <td id='text_margin'>${subtask.title}</td>

        <td id='start_margin'>${subtask.start}</td>

        <td id='end_margin'>${subtask.end}</td>

        <td id=${subtask.status}>${subtask.status}</td>

        <td id="buttons_crud"><button onclick="addSubtask(${i})" id="add_taskbutton"> Add subtask </button>  
           <button onclick="Sub_Delete_task(${i})" id="edit_taskbutton"> Delete </button>
           <button onclick="Edit_sub_task(${i})" id="delete_taskbutton"> Edit </button></td>
      `;

            changestatus = i;
        });
        console.log(changestatus)

    });



    let tableBody = document.getElementById('tbody');
    tableBody.innerHTML = innerHTML;
    task_id.style.display = "flex";
    document.getElementById("task_lable").style.display = "flex";
}
function searchTasks() {

    //const table = document.createElement('table');

    innerHTML = `

    <tr>

      <th>Task ID</th>

      <th>Task Name</th>

      <th>Start Date</th>

      <th>End Date</th>

      <th>Status</th>

      <th>action</th>

    </tr>

  `;



    matchingItems.forEach((task, index) => {

        // const row = document.createElement('tr');
        console.log("id is ", task);

        innerHTML += `<tr>

      <td >${task.id}</td>

      <td id='text_margin'>${task.title}</td>

      <td id='start_margin'>${task.start}</td>

      <td id='end_margin'>${task.end}</td>

      <td>${task.status}</td>

      <td id="add_taskbutton"><button onclick="addSubtask(${index})" id="add_taskbutton"> Add subtask </button>  
            <button onclick="Edit_task(${index})" id="edit_taskbutton"> Edit </button>
           <button onclick="Delete_task(${index})" id="delete_taskbutton"> Delete </button> </td>
           </tr>

    `;


        //   table.appendChild(row);
    });



    let tableBody = document.getElementById('search_body');
    tableBody.innerHTML = innerHTML;
    task_id.style.display = "flex";
    document.getElementById("task_lable").style.display = "flex";
    // document.getElementsByClassName("serach_table_boday").style.display="flex"
}

function Sub_Delete_task(index) {
    //  TaskArray[parenttaskid].subtaskdata.splice(index,1)
    TaskArray[parenttaskid].subtaskdata.splice(index, 1);
    displayTasks();


}
function Edit_task(index) {
    // console.log(index)
    let edit_parent_form = document.getElementById('edit_parent_form');
    edit_parent_form.style.display = "flex";
    form.style.display = "none"
    Parent_edit_id = index;
}

function Delete_task(index) {
    console.log("delete", index)
    TaskArray.splice(index, 1);
    displayTasks();
}
edit_parent_form.addEventListener('submit', function (event) {
    event.preventDefault();
    const Parent_id = document.getElementById('Parent_id');
    const Parent_Task_title = document.getElementById('Parent_Task_title')
    const Parent_Task_startdate = document.getElementById('Parent_Task_startdate')
    const Parent_Task_enddate = document.getElementById('Parent_Task_enddate')
    console.log(Parent_id.value);
    let idval = IdArray.filter(taskid => taskid == Parent_id.value);
    console.log("edit value", idval)

    if (idval.length == 0) {
        IdArray.push(Parent_id.value)
        dublicated_text.style.display = "none";

        // parenttaskid = data.id;

        TaskArray.forEach((Task, index) => {
            if (Parent_edit_id == index) {
                Task.id = Parent_id.value;
                Task.title = Parent_Task_title.value;
                Task.start = Parent_Task_startdate.value;
                Task.end = Parent_Task_enddate.value
                // console.log(TaskArray)
                Parent_Task_title.value = " ",
                    Parent_Task_startdate.value = '',
                    Parent_Task_enddate.value = ''
                displayTasks();
                calculatestatus();
            }
        })
        form.style.display = "flex"
        let edit_parent_form = document.getElementById('edit_parent_form');
        edit_parent_form.style.display = "none";

    }
    else {
        dublicated_text.style.display = "flex";

    }
    // console.log("edit")
})
edit_child_form.addEventListener('submit', function (event) {
    event.preventDefault();
    const status_value = document.getElementById('task_status')
    const Child_Task_title = document.getElementById('Child_Task_title')
    const Child_Task_startdate = document.getElementById('Child_Task_startdate')
    const Child_Task_enddate = document.getElementById('Child_Task_enddate')
    // console.log(Child_id.value)
    TaskArray.forEach((Task, index) => {

        if (Parent_edit_id == index) {
            Task.subtaskdata[Child_edit_id].title = Child_Task_title.value
            Task.subtaskdata[Child_edit_id].start = Child_Task_startdate.value
            Task.subtaskdata[Child_edit_id].end = Child_Task_enddate.value
            Task.subtaskdata[Child_edit_id].status = status_value.value


            console.log(TaskArray)
            displayTasks();
            calculatestatus();
        }
        form.style.display = "flex"
        let edit_parent_form = document.getElementById('edit_child_form');
        edit_parent_form.style.display = "none";

    })
    // console.log("hello ji")

})
function Edit_sub_task(index) {
    // event.preventDefault();
    console.log("Parent edit id", Parent_edit_id)
    let edit_parent_form = document.getElementById('edit_child_form');
    edit_parent_form.style.display = "flex";
    form.style.display = "none"
    // console.log("subtask edit id",index)
    edit_child_form
    Child_edit_id = index;
    console.log(index)
}
function searchfun(event) {


    const searchBar = document.getElementById('search_ele');
    // datatable.style.display="none"
    document.getElementById('d_table').style.display = "none"
    // document.getElementsByClassName("serach_table_boday").style.display="flex"


    const searchTerm = searchBar.value.toLowerCase();

    console.log(searchBar.value)

    matchingItems = [];
    TaskArray.forEach(task => {
        // console.log(task.title.toLowerCase(),"data value");
        const title_match = task.title.toLowerCase().includes(searchTerm);
        const status_match = task.status.toLowerCase().includes(searchTerm);
        const start_date = task.start.toLowerCase().includes(searchTerm);
        const end_date = task.end.toLowerCase().includes(searchTerm);


        const matchingSubtasks = task.subtaskdata.filter(subtask =>
            subtask.title.toLowerCase().includes(searchTerm) ||
            subtask.status.toLowerCase().includes(searchTerm) ||
            subtask.start.toLowerCase().includes(searchTerm) ||
            subtask.end.toLowerCase().includes(searchTerm)
        );

        if (title_match) {
            matchingItems.push(task);
        }
        else if (status_match) {
            matchingItems.push(task)
        }
        else if (start_date) {
            matchingItems.push(task)
        }
        else if (end_date) {
            matchingItems.push(task)
        }

        if (matchingSubtasks.length > 0) {
            matchingItems.push(...matchingSubtasks);
        }
    });
    if (matchingItems.length > 0) {
        searchTasks();
    }


    console.log("Matching items:", matchingItems);
    // You can update your UI to display the matching items here
}

function Cleanfun() {
    console.log("console.log");
    let tableBody = document.getElementById('search_body');
    tableBody.style.display = "none";
    document.getElementById('d_table').style.display = "flex"
    matchingItems = [];


}