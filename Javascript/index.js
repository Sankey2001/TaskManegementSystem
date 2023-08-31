

const form = document.getElementById('form');
const edit_parent_form=document.getElementById('edit_parent_form')
const task_id = document.getElementById('Task_id')
const task_title = document.getElementById('Task_title');
const date_start = document.getElementById('Task_startdate');
const date_end = document.getElementById('Task_enddate');
const status_value = document.getElementById('task_status')
let TaskArray = [];
let Parent_edit_id=0;
let Child_edit_id=0;
let check = true
let subtaskadd = false;
let parentid = 0;
let parenttaskid = 0;

// const parts=date_start.value.split('-');
// const currentDate=new Date();
// const formatteddate=`${parts[2]}-${parts[1]}-${parts[0]}`;
// const formatteddate=currentDate.toISOString().split('T')[0];

date_start.addEventListener('input',updatedate);
function updatedate(){
    const currentDate=new Date(date_start.value);
    const formatteddate=currentDate.toISOString().split('T')[0];
    date_end.min=formatteddate;

}
date_end.addEventListener('input',up);
function up(){
    const currentDate=new Date(date_end.value);
    const formatteddate=currentDate.toISOString().split('T')[0];
    date_start.max=formatteddate;

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
            //  task_id.value=" ",
             task_title.value=" ",
             date_start.value='',
             date_end.value='',

        // console.log(data.id)
        parenttaskid = data.id;

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
        displayTasks();
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

        //showsubtask();
        // showdata();
    }
})

function showdata() {
    const tableBody = document.querySelector(".table_body");
    // const newDiv = `<tr></tr>`;

    const tableRows = TaskArray.map((item, index) => {
        parentid = item.id;
        return `
        <tr id=${"tp"} class=${item.id} >
          <td>${item.id}</td>
          <td>${item.title}</td>
          <td>${item.start}</td>
          <td>${item.end}</td>
          <td>${item.status}</td>
          <td><button class=${"edit "} id=${"butstyle"} button_index=${index}>Edit</button></td>
          <td><button class=${"delete "} id=${"butstyle"} button_index=${index}>Delete</button></td>
          <td><button class=${"add "} id=${"butstyle"} button_index=${index}>Add</button></td>

          
        </tr>
      `;
    });
    // let tpm=newDiv.innerHTML(tableRows);
    tableBody.innerHTML = tableRows;
    const editbutton = document.querySelectorAll('.edit')
    editbutton.forEach((button) => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("button_index")
            const edittask = prompt("edit task:", TaskArray[index].id)

            if (edittask != null) {
                TaskArray[index].id = edittask;
                showdata();
            }
        })
    })

    const deletebutton = document.querySelectorAll('.delete')

    deletebutton.forEach((button) => {
        button.addEventListener("click", (event) => {

            const index = event.target.getAttribute("button_index")

            console.log(index)

            if (index != null) {
                TaskArray.splice(index, 1);
                showdata();
            }
        })
    })

    const addbutton = document.querySelectorAll('.add')
    addbutton.forEach((button) => {
        button.addEventListener("click", subtask)
    })

}


function showsubtask(event) {
    const tableBody = document.querySelector(".table_body");

    // const row = document.getElementsByClassName(`${parentid}`)
    tableheading = `
        <tr >
          <td> SubTask List</td>
          
        </tr>
      `;

    // let tpm=newDiv.innerHTML(tableRows);
    tableBody.innerHTML = tableheading;

    let newrow = TaskArray.map((item, index) => (
        item.subtaskdata.map((items, index) => {

            return `
        <tr id=${"tp"} class=${items.id} >
          <td>${items.id}</td>
          <td>${items.title}</td>
          <td>${items.start}</td>
          <td>${items.end}</td>
          <td>${items.status}</td>
        </tr>
      `;
        })
    ))

    tableBody.innerHTML = newrow;
    // const row = document.getElementsByClassName("1")
    // const newr = row[0];
    // console.log(newr)
    // newr.appendChild(newrow);
}

function calculatestatus(){
    let Progress=0;
    let completed=0;
    let duepassed=0;
    let cancal=0;
    TaskArray.map((tasks,index)=>{
        
        tasks.subtaskdata.forEach((task,index)=>{
            if(task.status=="In-Progress"){
                Progress+=1;
            }
            if(task.status=="completed"){
                completed+=1;
            }
            if(task.status=="duepassed"){
                duepassed+=1;
            }
            if(task.status=="cancal"){
                cancal+=1;
            }
        })
    })
    console.log("Progress",Progress)
    console.log("completed",completed)
    console.log("overdate",duepassed)
    console.log("cancal",cancal)
     if(cancal>0){
        TaskArray[parenttaskid].status="cancal";
        console.log(TaskArray[parenttaskid])
        displayTasks();
    }
    if(duepassed>0){
        TaskArray[parenttaskid].status="duepassed";
        console.log(TaskArray[parenttaskid])
        displayTasks();
    }
    else if(completed>0&&Progress==0&&overdate==0&&cancal==0){
        TaskArray[parenttaskid].status="completed";
        console.log(TaskArray[parenttaskid])
        displayTasks();
    }
    else if(Progress>0){
        TaskArray[parenttaskid].status="Progress";
        console.log(TaskArray[parenttaskid])
        displayTasks();
    }
} 

function addSubtask(index) {
    Parent_edit_id=index;
    console.log("button " + index)
    task_id.style.display = "none";
    document.getElementById("task_lable").style.display = "none";
    if (index != null) {
        subtaskadd = true;
        parenttaskid = index;
    }

    // calculatestatus();
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

        innerHTML += `<tr>

      <td>${task.id}</td>

      <td>${task.title}</td>

      <td>${task.start}</td>

      <td>${task.end}</td>

      <td>${task.status}</td>

      <td><button onclick="addSubtask(${index})"> Add subtask </button>  
            <button onclick="Edit_task(${index})"> Edit </button>
           <button onclick="Delete_task(${index})"> Delete </button> </td>
           </tr>

    `;
        if (task.subtaskdata.length > 0) {

            innerHTML += `<tr>

      <th> Sub Task List </th>

    </tr>

    `;

        }



        //   table.appendChild(row);



        task.subtaskdata.forEach((subtask,i) => {

            //  const subtaskRow = document.createElement('tr');
            // <td>${new Date(subtask.start).toDateString()}</td>


            innerHTML += `<tr>

        <td>${subtask.id}</td>

        <td>${subtask.title}</td>

        <td>${subtask.start}</td>

        <td>${subtask.end}</td>

        <td>${subtask.status}</td>

        <td><button onclick="addSubtask(${i})"> Add subtask </button>  

           <button onclick="Sub_Delete_task(${i})"> Delete </button>
           <button onclick="Edit_sub_task(${i})"> Edit </button>
      `;

            // table.appendChild(subtaskRow);

        });

    });



    let tableBody = document.getElementById('tbody');
    tableBody.innerHTML = innerHTML;
    task_id.style.display = "flex";
    document.getElementById("task_lable").style.display = "flex";
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
    form.style.display="none"
    Parent_edit_id=index;
}

function Delete_task(index) {
    console.log("delete",index)
    TaskArray.splice(index, 1);
    displayTasks();
}
edit_parent_form.addEventListener('submit',function(event){
    event.preventDefault();
    const Parent_id=document.getElementById('Parent_id');
    const Parent_Task_title=document.getElementById('Parent_Task_title')
    const Parent_Task_startdate=document.getElementById('Parent_Task_startdate')
    const Parent_Task_enddate=document.getElementById('Parent_Task_enddate')
    console.log(Parent_id.value)
    TaskArray.forEach((Task,index)=>{
    if(Parent_edit_id==index){
        Task.id=Parent_id.value;
        Task.title=Parent_Task_title.value;
        Task.start=Parent_Task_startdate.value;
        Task.end=Parent_Task_enddate.value
        // console.log(TaskArray)
        displayTasks();
        calculatestatus();
    }
    })
    // console.log("edit")
})
edit_child_form.addEventListener('submit',function(event){
    event.preventDefault();
    const status_value = document.getElementById('task_status')
    const Child_Task_title=document.getElementById('Child_Task_title')
    const Child_Task_startdate=document.getElementById('Child_Task_startdate')
    const Child_Task_enddate=document.getElementById('Child_Task_enddate')
    // console.log(Child_id.value)
    TaskArray.forEach((Task,index)=>{
    
    if(Parent_edit_id==index){
       Task.subtaskdata[Child_edit_id].title=Child_Task_title.value
       Task.subtaskdata[Child_edit_id].start=Child_Task_startdate.value
       Task.subtaskdata[Child_edit_id].end=Child_Task_enddate.value
       Task.subtaskdata[Child_edit_id].status=status_value.value


       console.log(TaskArray)
        displayTasks();
        calculatestatus();
    }

    })
    // console.log("hello ji")
  
})
function Edit_sub_task(index){
    // event.preventDefault();
    console.log("Parent edit id",Parent_edit_id)
    let edit_parent_form = document.getElementById('edit_child_form');
    edit_parent_form.style.display = "flex";
    form.style.display="none"
    // console.log("subtask edit id",index)
    edit_child_form
    Child_edit_id=index;
    console.log(index)
}
function searchfun(event){

  
      const searchBar = document.getElementById('search_ele');
      
      
        const searchTerm = searchBar.value.toLowerCase();
      
        const matchingItems = [];
      
        TaskArray.forEach(task => {
          const taskMatches = task.title.toLowerCase().includes(searchTerm);
          const matchingSubtasks = task.subtaskdata.filter(subtask =>
            subtask.title.toLowerCase().includes(searchTerm)
          );
      
          if (taskMatches) {
            matchingItems.push(task);
          }
      
          if (matchingSubtasks.length > 0) {
            matchingItems.push(...matchingSubtasks);
          }
        });
      
        console.log("Matching items:", matchingItems);
        // You can update your UI to display the matching items here
      }