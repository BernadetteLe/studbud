var currentTaskList;
function renderKanban(taskList) {
    currentTaskList = taskList;
    let heading = document.getElementById("kanbanHeading");
    heading.innerHTML = taskList.taskDescription;
    let info = document.getElementById("kanbanInfo");
    info.innerHTML = "Due: <i>" + taskList.dueDate + "</i>" + " " + "Priority :" + "<i>" + taskList.priorityRating + "</i>";
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
function allowDrop(ev) {
    ev.preventDefault();
}
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.currentTarget.appendChild(document.getElementById(data));
}
function createTask() {
    var x = document.getElementById("inprogress");
    var y = document.getElementById("done");
    var z = document.getElementById("create-new-task-block");
    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "block";
        z.style.display = "none";
    } else {
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "flex";
    }
}
function saveTask() {
    // var saveButton = document.getElementById("save-button");
    // var editButton = document.getElementById("edit-button");
    // if (saveButton.style.display === "none") {
    //     saveButton.style.display = "block";
    //     editButton.style.display = "none";
    // } else{
    //     saveButton.style.display = "none";
    //     editButton.style.display = "block";
    // }
    var taskName = document.getElementById("task-name").value;
    var taskStatus = document.getElementById("task-status").value;
    var column = document.getElementById(taskStatus);
    column.innerHTML += `
    <div class="task" id="${taskName.toLowerCase().split(" ").join("")}" draggable="true" ondragstart="drag(event)">
        <span>${taskName}</span>
    </div>
    `;
    if (!currentTaskList.tasks) currentTaskList.tasks = [];
    currentTaskList.tasks.push({
        'todo': todo,
        'taskName': taskName,
        'status': taskStatus
    });
}
function editTask() {
    var saveButton = document.getElementById("save-button");
    var editButton = document.getElementById("edit-button");
    if (saveButton.style.display === "none") {
        saveButton.style.display = "block";
        editButton.style.display = "none";
    } else {
        saveButton.style.display = "none";
        editButton.style.display = "block";
    }
}

//# sourceMappingURL=index.821455a0.js.map
