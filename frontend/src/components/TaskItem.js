import React from 'react';
import './TaskItem.css';

function TaskItem({ task, onToggleComplete, onEdit, onDelete }) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task)}
          id={`task-${task.id}`}
        />
        <label htmlFor={`task-${task.id}`}></label>
      </div>
      
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
      </div>

      <div className="task-actions">
        <button 
          className="btn-icon btn-edit" 
          onClick={() => onEdit(task)}
          title="Edit task"
        >
          ✏️
        </button>
        <button 
          className="btn-icon btn-delete" 
          onClick={handleDelete}
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
