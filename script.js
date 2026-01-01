// Get elements
const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const prioritySelect = document.getElementById('prioritySelect');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const completedCount = document.getElementById('completedCount');
const clearBtn = document.getElementById('clearBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sortSelect');

// State
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';
let currentSort = 'date';

// Initialize
renderTasks();

// Event listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
clearBtn.addEventListener('click', clearCompleted);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

sortSelect.addEventListener('change', () => {
    currentSort = sortSelect.value;
    renderTasks();
});

// Add new task
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        priority: prioritySelect.value,
        dueDate: dateInput.value || null,
        createdAt: new Date().toISOString()
    };
    
    tasks.push(task);
    saveTasks();
    renderTasks();
    
    taskInput.value = '';
    dateInput.value = '';
    prioritySelect.value = 'medium';
    taskInput.focus();
}

// Render all tasks
function renderTasks() {
    taskList.innerHTML = '';
    
    let filteredTasks = filterTasks();
    let sortedTasks = sortTasks(filteredTasks);
    
    sortedTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item priority-${task.priority} ${task.completed ? 'completed' : ''}`;
        
        const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date';
        const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
        
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
            <div class="task-content">
                <div class="task-text">${task.text}</div>
                <div class="task-meta">
                    <span class="priority-badge priority-${task.priority}">${task.priority}</span>
                    <span ${isOverdue ? 'style="color: #dc3545; font-weight: 600;"' : ''}>
                        <i class="fas fa-calendar"></i>${dueDate}
                    </span>
                </div>
            </div>
            <div class="task-actions">
                <button class="edit-btn" onclick="editTask(${task.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" onclick="deleteTask(${task.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        taskList.appendChild(li);
    });
    
    updateTaskCount();
}

// Filter tasks
function filterTasks() {
    if (currentFilter === 'active') {
        return tasks.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        return tasks.filter(t => t.completed);
    }
    return tasks;
}

// Sort tasks
function sortTasks(tasksToSort) {
    const sorted = [...tasksToSort];
    
    if (currentSort === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (currentSort === 'date') {
        sorted.sort((a, b) => {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate) - new Date(b.dueDate);
        });
    } else if (currentSort === 'name') {
        sorted.sort((a, b) => a.text.localeCompare(b.text));
    }
    
    return sorted;
}

// Toggle task completion
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

// Edit task
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    const taskItem = event.target.closest('.task-item');
    const taskContent = taskItem.querySelector('.task-content');
    
    const currentText = task.text;
    taskItem.classList.add('edit-mode');
    
    taskContent.innerHTML = `
        <input type="text" class="edit-input" value="${currentText}" id="edit-${id}">
    `;
    
    const editInput = document.getElementById(`edit-${id}`);
    editInput.focus();
    editInput.select();
    
    const saveEdit = () => {
        const newText = editInput.value.trim();
        if (newText) {
            task.text = newText;
            saveTasks();
            renderTasks();
        } else {
            renderTasks();
        }
    };
    
    editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') saveEdit();
        if (e.key === 'Escape') renderTasks();
    });
    
    editInput.addEventListener('blur', saveEdit);
}

// Delete task
function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    }
}

// Clear completed tasks
function clearCompleted() {
    const completedTasks = tasks.filter(t => t.completed).length;
    if (completedTasks === 0) {
        alert('No completed tasks to clear!');
        return;
    }
    
    if (confirm(`Clear ${completedTasks} completed task${completedTasks !== 1 ? 's' : ''}?`)) {
        tasks = tasks.filter(t => !t.completed);
        saveTasks();
        renderTasks();
    }
}

// Update task count
function updateTaskCount() {
    const activeTasks = tasks.filter(t => !t.completed).length;
    const completedTasks = tasks.filter(t => t.completed).length;
    
    taskCount.innerHTML = `<i class="fas fa-clipboard-list"></i> ${activeTasks} task${activeTasks !== 1 ? 's' : ''}`;
    completedCount.innerHTML = `<i class="fas fa-check-circle"></i> ${completedTasks} completed`;
}

// Save to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
