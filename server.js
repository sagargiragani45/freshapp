const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let todos = [];

// Create a new to-do
app.post('/todos', (req, res) => {
    const { task } = req.body;
    if (!task) return res.status(400).send('Task is required');
    const newTodo = { id: todos.length + 1, task };
    todos.push(newTodo);
    res.status(201).send(newTodo);
});

// Get all to-dos
app.get('/todos', (req, res) => {
    res.send(todos);
});

// Update a to-do
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { task } = req.body;
    const todo = todos.find(t => t.id === id);
    if (!todo) return res.status(404).send('To-do not found');
    todo.task = task || todo.task;
    res.send(todo);
});

// Delete a to-do
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(t => t.id !== id);
    res.status(204).send();
});

// Health check
app.get('/', (req, res) => {
    res.send('To-Do List App is running!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

