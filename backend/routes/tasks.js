const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/tasks.json');

const readTasks = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeTasks = async (tasks) => {
  await fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2));
};

router.get('/', async (req, res, next) => {
  try {
    const tasks = await readTasks();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, description } = req.body;
    
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const tasks = await readTasks();
    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description ? description.trim() : '',
      completed: false,
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    await writeTasks(tasks);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const { title, description, completed } = req.body;
    
    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({ message: 'Title cannot be empty' });
      }
      tasks[taskIndex].title = title.trim();
    }
    
    if (description !== undefined) {
      tasks[taskIndex].description = description.trim();
    }
    
    if (completed !== undefined) {
      tasks[taskIndex].completed = completed;
    }

    await writeTasks(tasks);
    res.json(tasks[taskIndex]);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);
    await writeTasks(tasks);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
