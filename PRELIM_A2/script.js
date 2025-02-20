document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => createTaskElement(task));
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#taskList li span').forEach(taskSpan => {
            tasks.push(taskSpan.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function createTaskElement(task) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
            <span>${task}</span>
            <div>
                <button class="btn btn-sm btn-warning edit-button">Edit</button>
                <button class="btn btn-sm btn-success done-button">Done</button>
                <button class="btn btn-sm btn-danger delete-button">Delete</button>
            </div>
        `;
        taskList.appendChild(listItem);
    }

    function addTask() {
        const task = taskInput.value.trim();
        if (!task) {
            alert('Task cannot be empty!');
            return;
        }
        createTaskElement(task);
        saveTasks();
        taskInput.value = '';
    }

    taskList.addEventListener('click', (e) => {
        const listItem = e.target.parentElement.parentElement;
        if (e.target.classList.contains('delete-button')) {
            taskList.removeChild(listItem);
            saveTasks();
        }
        if (e.target.classList.contains('done-button')) {
            listItem.classList.toggle('list-group-item-success');
            listItem.style.textDecoration = listItem.style.textDecoration === 'line-through' ? 'none' : 'line-through';
        }
        if (e.target.classList.contains('edit-button')) {
            const taskSpan = listItem.querySelector('span');
            const newTask = prompt('Edit task:', taskSpan.textContent);
            if (newTask !== null && newTask.trim() !== '') {
                taskSpan.textContent = newTask.trim();
                saveTasks();
            } else {
                alert('Task cannot be empty!');
            }
        }
    });
    loadTasks();
});