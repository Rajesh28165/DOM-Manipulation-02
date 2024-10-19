let tasks = [];
let isEditing = false;
let currentTaskIndex = null;

const taskForm = document.getElementById('taskForm');
const taskContainer = document.getElementById('taskContainer');
const filterButtons = document.querySelectorAll('.filter-container button');

function renderTasks(filter = 'All') {
    taskContainer.innerHTML = '';
    tasks
        .filter(task => (filter === 'All' || task.status === filter))
        .forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');
            taskItem.innerHTML = `
                <span class="${task.status === 'Completed' ? 'completed' : ''}">
                    ${task.title} - ${task.description} (${task.status})
                </span>
                <div class="task-actions">
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                    <button onclick="toggleStatus(${index})">${task.status === 'Completed' ? 'Undo' : 'Complete'}</button>
                </div>
            `;
            taskContainer.appendChild(taskItem);
        });
}

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;

    if (isEditing) {
        tasks[currentTaskIndex] = { title, description, status };
        isEditing = false;
        currentTaskIndex = null;
    } else {
        tasks.push({ title, description, status });
    }

    taskForm.reset();
    renderTasks();
});

function editTask(index) {
    const task = tasks[index];
    document.getElementById('title').value = task.title;
    document.getElementById('description').value = task.description;
    document.getElementById('status').value = task.status;
    
    isEditing = true;
    currentTaskIndex = index;
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function toggleStatus(index) {
    tasks[index].status = tasks[index].status === 'Completed' ? 'Pending' : 'Completed';
    renderTasks();
}

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        renderTasks(this.textContent);
    });
});

renderTasks();
