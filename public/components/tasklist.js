// Basic form DOM elements
const form = document.getElementById("taskform");
const button = document.querySelector("#taskform > button")

// Selector for the tasklist output
var tasklist = document.querySelector("#tasklist > ul");

// DOM elements for the task input fields
var taskInput = document.getElementById("taskInput");
var dueDateInput = document.getElementById("dueDateInput");
var completionTimeInput = document.getElementById("completionTimeInput");
var estimatedTimeInput = document.getElementById("estimatedTimeInput");
var priorityInput = document.getElementById("priorityInput");

// Form submission event listener
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let task = taskInput.value;
    let dueDate = dueDateInput.value;
    // let completionTime = completionTimeInput.value;
    // let estimatedTime = estimatedTimeInput.value;
    let priorityRating = priorityInput.options[priorityInput.selectedIndex].value;
    if (task) {
        addTask(task, dueDate, priorityRating, false);
    }
})

// Create global array to track tasks
var taskListArray = [];

// Function to add task with user inputs as parameters
function addTask(taskDescription, dueDate, priorityRating) {
    let d = new Date();
    let dateCreated = d.getFullYear();
    let task = {
        id: Date.now(),
        taskDescription,
        dueDate,
        priorityRating,
    };
    taskListArray.push(task);
    console.log(taskListArray);
    renderTask(task);
}

// Function to display task on screen
function renderTask(task) {

    // Call function - checks if a task has been added
    updateEmpty();

    // Create HTML elements
    let item = document.createElement("li");
    item.style.cssText = 'padding: 0px 5px 0px 5px; text-align:left; border:2px solid #799bf7; border-radius:5px; list-style:none; margin:5px;'
    item.setAttribute('data-id', task.id);
    item.innerHTML = "<p>" + "<b>" + task.taskDescription + "</b>" + "<br/>" +  "DUE: " + task.dueDate + "<br/>" + "PRIORITY: " +  task.priorityRating + "</p>";
    tasklist.appendChild(item);

    // Extra Task DOM elements
    let delButton = document.createElement("button");
    let delButtonText = document.createTextNode("Delete");
    delButton.style.cssText = 'border:none; font-weight:bolder; background-color: #D1D0D6; color:white; cursor:pointer; border-radius: 5px; margin:5px 0px 5px 0px;'
    delButton.appendChild(delButtonText);
    item.appendChild(delButton);

    let expandButton = document.createElement("button");
    expandButton.className = "expand";
    expandButton.style.cssText = 'border: solid 1px #6588E6; border-radius: 5px; background-color: white; color: #6588E6; font-size: 120%; font-weight: bolder; float:right; cursor:pointer;'
    let expandButtonText = document.createTextNode("+");
    expandButton.appendChild(expandButtonText);
    item.appendChild(expandButton);


    // Event Listeners for DOM elements
    delButton.addEventListener("click", function(event) {
        event.preventDefault();
        let id = event.target.parentElement.getAttribute('data-id');
        let index = taskListArray.findIndex(task => task.id === Number(id));
        removeItemFromArray(taskListArray, index)
        console.log(taskListArray);
        updateEmpty();
        item.remove();
    })

    // Clear the input form
    form.reset();
}

// Function to remove item from array
function removeItemFromArray(arr, index) {
    if (index > -1) {
        arr.splice(index, 1)
    }
    return arr;
}


// Function to hide the 'you haven't added any tasks' text
function updateEmpty() {
    if (taskListArray.length > 0) {
        document.getElementById('emptyList').style.display = 'none';
    } else {
        document.getElementById('emptyList').style.display = 'block';
    }
}

// Collapsible lists
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}

var open = document.getElementsByClassName("expand");
var j;

for(j = 0; j < open.length; j++) {
    open[j].addEventListener("click", function() {
        this.classList.toggle("active");
        var kanban = this.nextElementSibling;
        if(kanban.style.maxHeight) {
            kanban.style.maxHeight = null;
        } else {
            kanban.style.maxHeight = kanban.scrollHeight + "px";
        }
    });
}