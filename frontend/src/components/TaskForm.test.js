import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm';

describe('TaskForm Component', () => {
  test('renders add task form by default', () => {
    const mockSubmit = jest.fn();
    const mockCancel = jest.fn();
    
    render(<TaskForm onSubmit={mockSubmit} editingTask={null} onCancel={mockCancel} />);
    
    expect(screen.getByText('Add New Task')).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByText('Add Task')).toBeInTheDocument();
  });

  test('renders edit task form when editingTask is provided', () => {
    const mockSubmit = jest.fn();
    const mockCancel = jest.fn();
    const editingTask = {
      id: '123',
      title: 'Test Task',
      description: 'Test Description',
      completed: false
    };
    
    render(<TaskForm onSubmit={mockSubmit} editingTask={editingTask} onCancel={mockCancel} />);
    
    expect(screen.getByText('Edit Task')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Update Task')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('calls onSubmit with form data when submitted', () => {
    const mockSubmit = jest.fn();
    const mockCancel = jest.fn();
    
    render(<TaskForm onSubmit={mockSubmit} editingTask={null} onCancel={mockCancel} />);
    
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByText('Add Task');
    
    fireEvent.change(titleInput, { target: { value: 'New Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Description' } });
    fireEvent.click(submitButton);
    
    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'New Task',
      description: 'New Description'
    });
  });

  test('clears form after submission', () => {
    const mockSubmit = jest.fn();
    const mockCancel = jest.fn();
    
    render(<TaskForm onSubmit={mockSubmit} editingTask={null} onCancel={mockCancel} />);
    
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByText('Add Task');
    
    fireEvent.change(titleInput, { target: { value: 'New Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Description' } });
    fireEvent.click(submitButton);
    
    expect(titleInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
  });

  test('calls onCancel when cancel button is clicked', () => {
    const mockSubmit = jest.fn();
    const mockCancel = jest.fn();
    const editingTask = {
      id: '123',
      title: 'Test Task',
      description: 'Test Description',
      completed: false
    };
    
    render(<TaskForm onSubmit={mockSubmit} editingTask={editingTask} onCancel={mockCancel} />);
    
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    expect(mockCancel).toHaveBeenCalled();
  });
});
