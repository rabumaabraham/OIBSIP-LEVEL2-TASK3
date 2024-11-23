const taskTitle = document.getElementById('task-title');
const taskDescription = document.getElementById('task-description');
const addTaskBtn = document.getElementById('add-task-btn');
const pendingTasksList = document.getElementById('pending-tasks-list');
const completedTasksList = document.getElementById('completed-tasks-list');

// Show the active section based on the nav menu
const navLinks = document.querySelectorAll('nav ul li a');
const contentSections = document.querySelectorAll('.content-section');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(link => link.classList.remove('active'));
        link.classList.add('active');
        
        const targetSection = link.getAttribute('href').substring(1);
        contentSections.forEach(section => section.classList.remove('active'));
        document.getElementById(targetSection).classList.add('active');
    });
});

// Function to create task elements
function createTaskElement(title, description, taskType = 'pending', taskId) {
    const taskItem = document.createElement('li');
    taskItem.classList.add(taskType);
    taskItem.setAttribute('data-id', taskId);

    const taskTitleElement = document.createElement('div');
    taskTitleElement.classList.add('task-title');
    taskTitleElement.innerHTML = `<strong>${title}</strong>`;

    const taskDescriptionElement = document.createElement('div');
    taskDescriptionElement.classList.add('task-description');
    taskDescriptionElement.innerHTML = `<p>${description}</p>`;

    const completeBtn = document.createElement('button');
    completeBtn.innerText = 'Complete';
    completeBtn.classList.add('complete-btn');
    completeBtn.addEventListener('click', () => markAsComplete(taskId));

    const editBtn = document.createElement('button');
    editBtn.innerText = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', () => editTask(taskId));

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(taskId));

    taskItem.appendChild(taskTitleElement);
    taskItem.appendChild(taskDescriptionElement);
    taskItem.appendChild(completeBtn);
    taskItem.appendChild(editBtn);
    taskItem.appendChild(deleteBtn);

    if (taskType === 'pending') {
        pendingTasksList.appendChild(taskItem);
    } else {
        completedTasksList.appendChild(taskItem);
    }
}

// Function to add a new task
function addTask() {
    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    if (title === '' || description === '') {
        alert('Please enter both a title and description!');
        return;
    }

    const taskId = Date.now();
    createTaskElement(title, description, 'pending', taskId);

    taskTitle.value = '';
    taskDescription.value = '';
}

// Function to mark a task as completed
function markAsComplete(taskId) {
    const taskItem = document.querySelector(`li[data-id="${taskId}"]`);
    taskItem.classList.remove('pending');
    taskItem.classList.add('completed');

    const completeBtn = taskItem.querySelector('.complete-btn');
    completeBtn.style.display = 'none';

    const completedTasks = document.getElementById('completed-tasks-list');
    completedTasks.appendChild(taskItem);
}

// Function to edit a task
function editTask(taskId) {
    const taskItem = document.querySelector(`li[data-id="${taskId}"]`);
    const taskTitle = taskItem.querySelector('.task-title').innerText;
    const taskDescription = taskItem.querySelector('.task-description').innerText;

    taskTitle.value = taskTitle;
    taskDescription.value = taskDescription;

    taskItem.remove();
}

// Function to delete a task
function deleteTask(taskId) {
    const taskItem = document.querySelector(`li[data-id="${taskId}"]`);
    taskItem.remove();
}

// Event listener for adding new task
addTaskBtn.addEventListener('click', addTask);
