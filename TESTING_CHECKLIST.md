# Task Manager - Manual Testing Checklist

## Automated Tests Summary

✅ **Backend Tests**: 13/13 passing
- GET endpoints (all tasks, single task, 404 handling)
- POST endpoint (create task, validation)
- PUT endpoint (update task, toggle completion, validation)
- DELETE endpoint (delete task, 404 handling)

✅ **Frontend Tests**: 14/14 passing
- TaskForm component (render, edit mode, form submission, validation)
- TaskItem component (render, checkbox, edit/delete buttons, confirmation)

---

## Manual Testing Checklist

### Setup
- [ ] Backend server running on http://localhost:5001
- [ ] Frontend server running on http://localhost:3000
- [ ] Browser opened to http://localhost:3000

---

### Test Case 1: Create Task (Happy Path)
**Steps:**
1. Enter "Buy groceries" in title field
2. Enter "Milk, eggs, bread" in description field
3. Click "Add Task" button

**Expected Results:**
- [ ] Task appears in the list below
- [ ] Task shows title "Buy groceries"
- [ ] Task shows description "Milk, eggs, bread"
- [ ] Checkbox is unchecked
- [ ] Form fields are cleared
- [ ] No error messages displayed

---

### Test Case 2: Create Task Without Description
**Steps:**
1. Enter "Call dentist" in title field
2. Leave description field empty
3. Click "Add Task" button

**Expected Results:**
- [ ] Task appears in the list
- [ ] Task shows only title, no description paragraph
- [ ] Task is added successfully

---

### Test Case 3: Validation - Empty Title
**Steps:**
1. Leave title field empty
2. Enter description (optional)
3. Click "Add Task" button

**Expected Results:**
- [ ] Browser shows validation message "Please enter a task title"
- [ ] Task is NOT added to the list
- [ ] Form remains populated

---

### Test Case 4: Mark Task as Complete
**Steps:**
1. Create a task (if none exist)
2. Click the checkbox next to the task

**Expected Results:**
- [ ] Checkbox becomes checked
- [ ] Task title gets strikethrough styling
- [ ] Task appears slightly faded (opacity reduced)
- [ ] Task remains in the list

---

### Test Case 5: Mark Task as Incomplete
**Steps:**
1. Click checkbox on a completed task

**Expected Results:**
- [ ] Checkbox becomes unchecked
- [ ] Strikethrough styling is removed
- [ ] Task returns to normal opacity
- [ ] Task remains in the list

---

### Test Case 6: Edit Task
**Steps:**
1. Create a task
2. Click the edit button (✏️) on the task
3. Modify the title to "Updated Task Title"
4. Modify the description to "Updated description"
5. Click "Update Task" button

**Expected Results:**
- [ ] Form populates with existing task data
- [ ] Form header changes to "Edit Task"
- [ ] "Update Task" button appears
- [ ] "Cancel" button appears
- [ ] After update, task shows new title and description
- [ ] Form returns to "Add New Task" mode
- [ ] Form fields are cleared

---

### Test Case 7: Cancel Edit
**Steps:**
1. Click edit button on a task
2. Make changes to the form
3. Click "Cancel" button

**Expected Results:**
- [ ] Form returns to "Add New Task" mode
- [ ] Form fields are cleared
- [ ] Original task remains unchanged
- [ ] No error messages

---

### Test Case 8: Delete Task
**Steps:**
1. Create a task
2. Click the delete button (🗑️) on the task
3. Click "OK" in the confirmation dialog

**Expected Results:**
- [ ] Confirmation dialog appears with message "Are you sure you want to delete this task?"
- [ ] After confirming, task is removed from the list
- [ ] No error messages

---

### Test Case 9: Cancel Delete
**Steps:**
1. Click delete button on a task
2. Click "Cancel" in the confirmation dialog

**Expected Results:**
- [ ] Confirmation dialog closes
- [ ] Task remains in the list
- [ ] No changes made

---

### Test Case 10: Multiple Tasks
**Steps:**
1. Create 3-5 different tasks
2. Mark some as complete, leave others incomplete
3. Edit one task
4. Delete one task

**Expected Results:**
- [ ] All tasks display correctly
- [ ] Task count in header is accurate
- [ ] Completed and incomplete tasks are distinguishable
- [ ] All operations work correctly
- [ ] List updates immediately after each action

---

### Test Case 11: Empty State
**Steps:**
1. Delete all tasks (or start with empty list)

**Expected Results:**
- [ ] Message displays: "No tasks yet. Add your first task above!"
- [ ] No task list is shown
- [ ] Form is still functional

---

### Test Case 12: Page Refresh (Data Persistence)
**Steps:**
1. Create 2-3 tasks
2. Mark one as complete
3. Refresh the browser page (F5 or Cmd+R)

**Expected Results:**
- [ ] All tasks remain after refresh
- [ ] Completed status is preserved
- [ ] Task order is maintained
- [ ] No data loss

---

### Test Case 13: Long Text Handling
**Steps:**
1. Create a task with very long title (100+ characters)
2. Create a task with very long description (500+ characters)

**Expected Results:**
- [ ] Long text wraps properly
- [ ] UI doesn't break or overflow
- [ ] Text remains readable
- [ ] All buttons remain accessible

---

### Test Case 14: Special Characters
**Steps:**
1. Create task with title: "Test & <Special> Characters! @#$%"
2. Create task with description containing quotes, apostrophes, emojis

**Expected Results:**
- [ ] Special characters display correctly
- [ ] No JavaScript errors in console
- [ ] Task can be edited and deleted normally

---

### Test Case 15: Network Error Handling
**Steps:**
1. Stop the backend server
2. Try to create a task
3. Try to edit a task
4. Try to delete a task

**Expected Results:**
- [ ] Error message appears: "Failed to create task" (or similar)
- [ ] Error message is displayed in red box
- [ ] Application doesn't crash
- [ ] After restarting backend, operations work again

---

## Browser Compatibility Testing

Test the above scenarios in:
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (if on macOS)
- [ ] Edge

---

## Performance Testing

- [ ] Application loads within 2 seconds
- [ ] Task operations complete within 1 second
- [ ] No noticeable lag with 20+ tasks
- [ ] Smooth animations and transitions

---

## Accessibility Testing

- [ ] Can navigate form with Tab key
- [ ] Can submit form with Enter key
- [ ] Checkbox can be toggled with Space key
- [ ] All interactive elements have visible focus states
- [ ] Color contrast is sufficient for text readability

---

## Console Checks

Open browser DevTools (F12) and check:
- [ ] No JavaScript errors in Console tab
- [ ] No 404 errors in Network tab
- [ ] API requests show correct status codes (200, 201, 204)
- [ ] No CORS errors

---

## Test Data Cleanup

After testing:
- [ ] Delete all test tasks
- [ ] Verify `backend/data/tasks.json` contains empty array `[]`
- [ ] Stop both servers

---

## Bug Reporting Template

If you find a bug, document it with:
- **Title**: Brief description
- **Steps to Reproduce**: Numbered steps
- **Expected Result**: What should happen
- **Actual Result**: What actually happened
- **Environment**: Browser, OS, server versions
- **Screenshots**: If applicable
- **Console Errors**: Any error messages

---

## Notes for QA Engineers

**Automated vs Manual Testing:**
- Automated tests verify code logic and component behavior
- Manual tests verify user experience and visual aspects
- Both are necessary for complete coverage

**Regression Testing:**
- Run automated tests after any code changes: `npm test`
- Re-run critical manual test cases before releases
- Keep this checklist updated as features are added

**Test Data Management:**
- Use consistent test data for reproducibility
- Clean up test data between test runs
- Don't use production data for testing
