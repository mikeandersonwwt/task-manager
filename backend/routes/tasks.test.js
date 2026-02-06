const request = require('supertest');
const express = require('express');
const taskRoutes = require('./tasks');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);

const DATA_FILE = path.join(__dirname, '../data/tasks.json');

beforeEach(async () => {
  await fs.writeFile(DATA_FILE, JSON.stringify([]));
});

afterAll(async () => {
  await fs.writeFile(DATA_FILE, JSON.stringify([]));
});

describe('GET /api/tasks', () => {
  test('should return empty array initially', async () => {
    const response = await request(app).get('/api/tasks');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('should return all tasks', async () => {
    const testTasks = [
      { id: '1', title: 'Test Task 1', description: 'Description 1', completed: false, createdAt: new Date().toISOString() },
      { id: '2', title: 'Test Task 2', description: 'Description 2', completed: true, createdAt: new Date().toISOString() }
    ];
    await fs.writeFile(DATA_FILE, JSON.stringify(testTasks));

    const response = await request(app).get('/api/tasks');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].title).toBe('Test Task 1');
  });
});

describe('GET /api/tasks/:id', () => {
  test('should return a single task by id', async () => {
    const testTasks = [
      { id: '123', title: 'Test Task', description: 'Test Description', completed: false, createdAt: new Date().toISOString() }
    ];
    await fs.writeFile(DATA_FILE, JSON.stringify(testTasks));

    const response = await request(app).get('/api/tasks/123');
    
    expect(response.status).toBe(200);
    expect(response.body.id).toBe('123');
    expect(response.body.title).toBe('Test Task');
  });

  test('should return 404 for non-existent task', async () => {
    const response = await request(app).get('/api/tasks/999');
    
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Task not found');
  });
});

describe('POST /api/tasks', () => {
  test('should create a new task', async () => {
    const newTask = {
      title: 'New Task',
      description: 'New Description'
    };

    const response = await request(app)
      .post('/api/tasks')
      .send(newTask);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('New Task');
    expect(response.body.description).toBe('New Description');
    expect(response.body.completed).toBe(false);
    expect(response.body).toHaveProperty('createdAt');
  });

  test('should reject task without title', async () => {
    const invalidTask = {
      description: 'No title'
    };

    const response = await request(app)
      .post('/api/tasks')
      .send(invalidTask);
    
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Title is required');
  });

  test('should reject task with empty title', async () => {
    const invalidTask = {
      title: '   ',
      description: 'Empty title'
    };

    const response = await request(app)
      .post('/api/tasks')
      .send(invalidTask);
    
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Title is required');
  });
});

describe('PUT /api/tasks/:id', () => {
  test('should update a task', async () => {
    const testTasks = [
      { id: '123', title: 'Original Title', description: 'Original Description', completed: false, createdAt: new Date().toISOString() }
    ];
    await fs.writeFile(DATA_FILE, JSON.stringify(testTasks));

    const updates = {
      title: 'Updated Title',
      description: 'Updated Description'
    };

    const response = await request(app)
      .put('/api/tasks/123')
      .send(updates);
    
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Title');
    expect(response.body.description).toBe('Updated Description');
  });

  test('should toggle completed status', async () => {
    const testTasks = [
      { id: '123', title: 'Test Task', description: 'Test', completed: false, createdAt: new Date().toISOString() }
    ];
    await fs.writeFile(DATA_FILE, JSON.stringify(testTasks));

    const response = await request(app)
      .put('/api/tasks/123')
      .send({ completed: true });
    
    expect(response.status).toBe(200);
    expect(response.body.completed).toBe(true);
  });

  test('should return 404 for non-existent task', async () => {
    const response = await request(app)
      .put('/api/tasks/999')
      .send({ title: 'Updated' });
    
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Task not found');
  });

  test('should reject empty title', async () => {
    const testTasks = [
      { id: '123', title: 'Test Task', description: 'Test', completed: false, createdAt: new Date().toISOString() }
    ];
    await fs.writeFile(DATA_FILE, JSON.stringify(testTasks));

    const response = await request(app)
      .put('/api/tasks/123')
      .send({ title: '   ' });
    
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Title cannot be empty');
  });
});

describe('DELETE /api/tasks/:id', () => {
  test('should delete a task', async () => {
    const testTasks = [
      { id: '123', title: 'Task to Delete', description: 'Test', completed: false, createdAt: new Date().toISOString() }
    ];
    await fs.writeFile(DATA_FILE, JSON.stringify(testTasks));

    const response = await request(app).delete('/api/tasks/123');
    
    expect(response.status).toBe(204);

    const tasksAfter = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
    expect(tasksAfter).toHaveLength(0);
  });

  test('should return 404 for non-existent task', async () => {
    const response = await request(app).delete('/api/tasks/999');
    
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Task not found');
  });
});
