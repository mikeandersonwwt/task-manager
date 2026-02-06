# Task Manager - Session Notes

### ✅ Completed: Phase 1 - Initialize

**What we built:**
- Full project structure for a task manager application
- Backend API with Express.js (Node.js)
- Frontend UI with React
- Both servers tested and running successfully

**Project location:** `/Users/andersmi/CascadeProjects/task-manager/`

**Current status:**
- Backend running on: http://localhost:5000
- Frontend running on: http://localhost:3000
- Application is fully functional with all CRUD operations working

### Project Decisions Made

1. **Features**: Basic CRUD - tasks with title, description, and done/not done status
2. **Tech Stack**: JavaScript/Node.js + Express (backend), React (frontend)
3. **Learning Approach**: Hybrid - build each component, explain it, test it, then move to next
4. **Database**: JSON file storage (simple for learning)

### Files Created

**Backend:**
- `server.js` - Express server entry point
- `routes/tasks.js` - CRUD API endpoints
- `middleware/errorHandler.js` - Error handling
- `data/tasks.json` - Task storage (empty array)
- `package.json` - Dependencies (express, cors)

**Frontend:**
- `src/App.js` - Main React component
- `src/components/TaskForm.js` - Create/edit form
- `src/components/TaskList.js` - Task list container
- `src/components/TaskItem.js` - Individual task display
- `src/services/api.js` - API communication layer
- `public/index.html` - HTML template
- All corresponding CSS files
- `package.json` - Dependencies (react, react-dom, react-scripts)

1. **Start both servers:**
   ```bash
   # Terminal 1 - Backend
   cd /Users/andersmi/CascadeProjects/task-manager/backend
   npm start
   
   # Terminal 2 - Frontend
   cd /Users/andersmi/CascadeProjects/task-manager/frontend
   npm start
   ```

2. **Open in browser:** http://localhost:3000

### Notes
- You're connected to VPN (needed for npm packages)
- Node.js version: v23.6.1
- You have basic JavaScript knowledge, new to React
- Learning from a QA perspective to understand development

### ✅ Completed: Phase 2 - Backend Deep Dive

**What we learned:**

1. **Express Server Setup** (`server.js`)
   - How Express creates a web server
   - Middleware pipeline (CORS, JSON parsing)
   - Route mounting with `/api/tasks`
   - Error handling middleware

2. **REST API & CRUD Operations** (`routes/tasks.js`)
   - `GET /api/tasks` - Get all tasks
   - `GET /api/tasks/:id` - Get single task by ID
   - `POST /api/tasks` - Create new task (returns 201)
   - `PUT /api/tasks/:id` - Update task (partial updates supported)
   - `DELETE /api/tasks/:id` - Delete task (returns 204)

3. **Data Storage**
   - JSON file persistence in `data/tasks.json`
   - `readTasks()` and `writeTasks()` helper functions
   - Async file operations with `fs.promises`

4. **API Testing with curl**
   - Successfully tested all CRUD endpoints
   - Created, updated, and deleted tasks
   - Verified error handling (404 for non-existent tasks)

5. **Port Configuration Change**
   - Changed backend from port 5000 → 5001 (macOS AirPlay conflict)
   - Updated frontend API URL to match

**Current status:**
- Backend running on: http://localhost:5001 ✓
- Frontend running on: http://localhost:3000 ✓
- All API endpoints tested and working

### ✅ Completed: Phase 3 - Frontend Deep Dive

**What we learned:**

1. **React Fundamentals**
   - Components as reusable UI pieces
   - Props (data passed from parent to child)
   - State (data that changes over time)
   - JSX (HTML-like syntax in JavaScript)
   - `useState` and `useEffect` hooks

2. **App.js - Main Component** (`src/App.js`)
   - State management: tasks, loading, error, editingTask
   - `useEffect` to load tasks on mount
   - Event handlers: handleCreate, handleUpdate, handleDelete, handleToggleComplete
   - Passing props down to child components
   - Conditional rendering (loading state, error messages)

3. **TaskForm Component** (`src/components/TaskForm.js`)
   - Controlled inputs (React controls form values)
   - Local state for title and description
   - Create vs Edit mode (adapts based on editingTask prop)
   - Form validation (title required)
   - Calling parent functions via onSubmit prop

4. **TaskList & TaskItem Components**
   - TaskList: Container that maps tasks array to TaskItem components
   - TaskItem: Individual task display with checkbox, edit, delete buttons
   - Conditional rendering (empty state, description)
   - Dynamic CSS classes (completed state)
   - Event handling (checkbox onChange, button onClick)

5. **Data Flow Pattern**
   - Props flow DOWN: parent → child
   - Events flow UP: child → parent via callback functions
   - State changes trigger re-renders
   - Example flow: User clicks → Event handler → State update → Re-render → UI updates

**Key React Concepts:**
- Controlled inputs: `value={state}` + `onChange={setState}`
- Array mapping: `tasks.map(task => <TaskItem key={task.id} ... />)`
- Conditional rendering: `{condition && <Component />}` or `{condition ? <A /> : <B />}`
- Props: Data passed to components as attributes

### ✅ Completed: Phase 4 - Integration

**What we learned:**

1. **API Service Layer** (`src/services/api.js`)
   - Bridge between React frontend and Express backend
   - Fetch API for making HTTP requests
   - Functions for each CRUD operation (getTasks, createTask, updateTask, deleteTask)
   - JSON.stringify() to send data, response.json() to receive data
   - Error handling with response.ok check

2. **Complete Request Flow** (Example: Creating a task)
   - User fills form → TaskForm.handleSubmit()
   - Calls App.handleCreateTask() via onSubmit prop
   - Calls api.createTask() which makes HTTP POST request
   - Express server receives request → CORS → JSON parser → Route handler
   - Backend validates, creates task object, writes to tasks.json
   - Returns HTTP 201 with new task object
   - Frontend receives response, updates state with setTasks()
   - React re-renders, TaskList displays new task

3. **Async/Await Explained**
   - Network requests take time (not instant)
   - `async` function returns a Promise
   - `await` pauses execution until Promise resolves
   - Makes async code look synchronous (easier to read than callbacks)
   - Used with try/catch for error handling

4. **Error Handling Across the Stack**
   - **Layer 1**: Backend validation (400 Bad Request for invalid data)
   - **Layer 2**: Backend error handler (500 for unexpected errors)
   - **Layer 3**: API service checks response.ok, throws error
   - **Layer 4**: React component catch block, sets error state
   - **Layer 5**: UI displays error message to user
   - Defense in depth: client validation (UX) + server validation (security)

5. **Full Stack Architecture**
   - Frontend: UI state management, user interactions
   - Backend: Business logic, data persistence
   - HTTP: Communication protocol (JSON format)
   - Stateless: Each request is independent
   - Data flows: User → Event → API → HTTP → Backend → Storage → Response → State → UI

**Key Concepts:**
- Separation of concerns (frontend vs backend responsibilities)
- RESTful communication (HTTP methods, status codes)
- Asynchronous JavaScript (Promises, async/await)
- Error propagation (throw → catch → display)

### ✅ Completed: Phase 5 - Testing

**What we learned:**

1. **Testing Importance**
   - Catch bugs early before users find them
   - Prevent regressions when adding new features
   - Tests serve as documentation for how code should behave
   - Confidence in deployments and changes
   - Faster feedback than manual testing

2. **Backend Tests** (`backend/routes/tasks.test.js`)
   - Jest as test framework
   - Supertest for HTTP request testing
   - Test setup/teardown with beforeEach/afterAll
   - 13 tests covering all CRUD operations
   - Tests for validation (required title, empty title rejection)
   - Tests for error handling (404 for non-existent tasks)
   - Run with: `npm test` in backend directory

3. **Frontend Tests** (`frontend/src/components/*.test.js`)
   - React Testing Library for component testing
   - Jest for test framework and mocking
   - 14 tests for TaskForm and TaskItem components
   - Mock functions (jest.fn()) to test callbacks
   - User interaction simulation with fireEvent
   - DOM queries (getByText, getByRole, getByLabelText)
   - Testing conditional rendering and CSS classes
   - Run with: `npm test` in frontend directory

4. **Manual Testing Checklist** (`TESTING_CHECKLIST.md`)
   - 15 detailed test cases covering all functionality
   - Happy path and edge case scenarios
   - Validation testing (empty fields, special characters)
   - Error handling testing (network failures)
   - Browser compatibility checklist
   - Performance and accessibility testing
   - Console error monitoring
   - Bug reporting template

**Test Results:**
- ✅ Backend: 13/13 tests passing
- ✅ Frontend: 14/14 tests passing
- ✅ Total: 27/27 automated tests passing

**Key Testing Concepts:**
- Unit tests: Test individual functions/components in isolation
- Integration tests: Test how parts work together (API endpoints)
- Manual tests: Verify user experience and visual aspects
- Test coverage: Automated tests verify logic, manual tests verify UX
- Mocking: Replace real dependencies with fake ones for testing
- Assertions: Verify expected behavior (expect().toBe(), toHaveBeenCalled())

---

## 🎉 Project Complete - All 5 Phases Done!

### Summary of What We Built

**Full-Stack Task Manager Application**
- Backend: Express REST API with 5 endpoints, JSON file storage
- Frontend: React UI with 4 components, state management
- Integration: HTTP communication via Fetch API
- Testing: 27 automated tests + comprehensive manual testing checklist

**Project Statistics:**
- 20+ files created
- ~1,500+ lines of code
- 5 API endpoints (GET, POST, PUT, DELETE)
- 4 React components (App, TaskForm, TaskList, TaskItem)
- 27 automated tests (13 backend + 14 frontend)

### Learning Outcomes

**Development Skills:**
- Full-stack application architecture
- REST API design and implementation
- React component patterns and state management
- Async JavaScript (Promises, async/await)
- Error handling across the stack
- Testing strategies (unit, integration, manual)

**QA Perspective:**
- How developers structure code
- Where bugs commonly hide (validation, edge cases, error handling)
- Automated testing approaches and tools
- Test coverage and quality metrics
- Manual testing best practices
- How to create comprehensive test plans

### How to Use This Project

**Start the application:**
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm start
```

**Run automated tests:**
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

**Manual testing:**
- Follow the checklist in `TESTING_CHECKLIST.md`
- Open http://localhost:3000 in browser
- Test all CRUD operations

---

**Notes:**
- Session notes cleaned up and consolidated
- All phases completed successfully
- Application is fully functional and tested
- Ready for further experimentation or enhancement
