// Get references to the Add Task button and task input field
const addTaskBtn = document.getElementById('addtask');
const taskName = document.getElementById('taskinput');
let taskList = JSON.parse(localStorage.getItem('tasks')) || [];

let count = localStorage.getItem('taskCount') ? parseInt(localStorage.getItem('taskCount')) : 1;


// Load tasks from local storage when the window is loaded
window.onload = function() {
    displayTasks();
   
};

// Add event listener for the Add Task button
addTaskBtn.addEventListener('click', () => {

    const taskInput = taskName.value.trim();
    if (taskInput == "") {
        alert('Please enter a task');
        return; 
    }
   
    const currentTime = new Date().toLocaleString();

    // Create a new task object
    const task = {
        id: count, 
        name: taskInput, 
        date: currentTime, 
    };

    taskList.push(task);
    saveToLocalStorage();
    taskName.value = '';
    displayTasks();
    alert("Task Added Successfully"); 
    count++; 
    localStorage.setItem('taskCount', count); 
});


// Function to save the task list to local storage
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(taskList)); 
}




// Function to display tasks in the table
function displayTasks() {
    document.getElementById('Taskdata').innerHTML = ''; 
    // Loop through the task list and create table rows for each task
    taskList.forEach((task, i) => {
        const taskRow = `
            <tr id="task${task.id}">
                <th scope="row">${i + 1}</th> 
                <td class="task-name">${task.name}</td> 
                <td>${task.date}</td> 
                <td>
                    <button class="btn btn-edit btn-sm" onclick="editTask(${task.id})">
                        <i class="fas fa-edit"></i> <!-- Edit button with icon -->
                    </button>
                    <button class="btn btn-delete btn-sm" onclick="deleteTask(${task.id})">
                        <i class="fas fa-trash"></i> <!-- Delete button with icon -->
                    </button>
                </td>
            </tr>
        `;
        
        // Insert the new task row into the table
        document.getElementById('Taskdata').insertAdjacentHTML('beforeend', taskRow);
    });
}

// Function to delete a task by its id
function deleteTask(id) {
    // Filter out the task that needs to be deleted
    taskList = taskList.filter(task => task.id !== id);
    // Save the updated task list to local storage

    // Update taskCount
    if (taskList.length === 0) {
        localStorage.removeItem('taskCount'); 
    }

    saveToLocalStorage();
    alert("Task deleted successfully"); 
    displayTasks(); 
}

// Function to edit a task by its id
function editTask(id) {
    const task = taskList.find(task => task.id === id);
    const newName = prompt('Edit task:', task.name);

    if (newName && newName.trim() !== '') {
        task.name = newName.trim(); 
        saveToLocalStorage(); 
        displayTasks(); 
    }
}
