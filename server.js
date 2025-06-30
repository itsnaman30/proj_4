const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let tasks = []; // In-memory task list

// GET all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST new task
app.post('/tasks', (req, res) => {
  const { text } = req.body;
  const newTask = {
    id: Date.now(),
    text,
    completed: false,
    date: new Date().toLocaleString()
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update task (mark complete/edit)
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  const task = tasks.find(t => t.id == id);
  if (!task) return res.status(404).send('Task not found');

  if (text !== undefined) task.text = text;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

// DELETE task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(t => t.id != id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
