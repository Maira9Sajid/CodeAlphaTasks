document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const newTaskButton = document.getElementById('newTask');
    const taskList = document.querySelector('.task-list');
    const numbersDisplay = document.getElementById('numbers');
    const progressBar = document.getElementById('progress');
    const congratsMessage = document.getElementById('congratsMessage');

    let tasks = [];
    let completedTasks = 0;

    // Function to update statistics and show/hide the congratulation message
    function updateStats() {
        numbersDisplay.textContent = `${completedTasks} / ${tasks.length}`;
        const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
        progressBar.style.width = `${progress}%`;

        if (completedTasks === tasks.length && tasks.length > 0) {
            congratsMessage.style.display = 'block';
            blastConfetti(); // Trigger confetti animation
        } else {
            congratsMessage.style.display = 'none';
        }
    }

    // Function to create a new task element
    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.classList.add('task-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox');
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                li.classList.add('completed');
                completedTasks++;
            } else {
                li.classList.remove('completed');
                completedTasks--;
            }
            updateStats();
        });

        const span = document.createElement('span');
        span.classList.add('task-text');
        span.textContent = taskText;

        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.innerHTML = '✏️';
        editButton.addEventListener('click', () => {
            const newTaskText = prompt('Edit your task', span.textContent);
            if (newTaskText !== null) {
                span.textContent = newTaskText;
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = '❌';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(li);
            tasks = tasks.filter(t => t !== li);
            if (checkbox.checked) {
                completedTasks--;
            }
            updateStats();
        });

        const taskButtons = document.createElement('div');
        taskButtons.classList.add('task-buttons');
        taskButtons.appendChild(editButton);
        taskButtons.appendChild(deleteButton);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(taskButtons);

        return li;
    }

    // Function to add a new task
    function addTask(taskText) {
        const taskElement = createTaskElement(taskText);
        taskList.appendChild(taskElement);
        tasks.push(taskElement);
        updateStats();
    }

    // Event listener for the new task button
    newTaskButton.addEventListener('click', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    // Event listener for the Enter key in the task input
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            newTaskButton.click();
        }
    });

    // Function to trigger confetti animation
    const blastConfetti = () => {
        const end = Date.now() + 15 * 1000;

        // Define colors for the confetti
        const colors = ["#bb0000", "#ffffff"];

        (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors,
            });

            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors,
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    }

    updateStats();
});
