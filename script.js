let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  let filtered = tasks.filter(task => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'completed') return task.completed;
    if (currentFilter === 'pending') return !task.completed;
  });

  filtered.forEach((task, index) => {
    const li = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    if (task.completed) taskText.classList.add('completed');
    taskText.innerText = `${task.text} (${task.date})`;

    const actions = document.createElement('div');
    actions.className = 'actions';

    const completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? 'Undo' : '✔';
    completeBtn.onclick = () => toggleComplete(index);

    const editBtn = document.createElement('button');
    editBtn.textContent = '✏';
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑';
    deleteBtn.onclick = () => deleteTask(index);

    actions.append(completeBtn, editBtn, deleteBtn);
    li.append(taskText, actions);
    taskList.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) return alert('Please enter a task.');
  const date = new Date().toLocaleString();

  tasks.push({ text, completed: false, date });
  input.value = '';
  saveTasks();
  renderTasks();
  notify(`Task added: "${text}"`);
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
  notify(`Task ${tasks[index].completed ? 'completed' : 'marked pending'}`);
}

function deleteTask(index) {
  const taskText = tasks[index].text;
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
  notify(`Task deleted: "${taskText}"`);
}

function editTask(index) {
  const newText = prompt('Edit task:', tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
    notify('Task edited');
  }
}

function filterTasks(type) {
  currentFilter = type;
  renderTasks();
}

// 🔔 Simple Notification (in-page, replace with browser Notification API if needed)
function notify(msg) {
  console.log(msg);
  // You could show a toast here
}

// 🌙 Dark Mode Toggle
function toggleDarkMode() {
  const isDark = document.getElementById('darkModeToggle').checked;
  document.body.className = isDark ? 'dark' : 'light';
  localStorage.setItem('darkMode', isDark);
}

function loadTheme() {
  const darkMode = JSON.parse(localStorage.getItem('darkMode'));
  document.getElementById('darkModeToggle').checked = darkMode;
  document.body.className = darkMode ? 'dark' : 'light';
}

loadTheme();
renderTasks();
