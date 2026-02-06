import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from './TaskItem';

describe('TaskItem Component', () => {
  const mockTask = {
    id: '123',
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    createdAt: '2026-02-05T12:00:00.000Z'
  };

  test('renders task with title and description', () => {
    const mockToggle = jest.fn();
    const mockEdit = jest.fn();
    const mockDelete = jest.fn();
    
    render(
      <TaskItem
        task={mockTask}
        onToggleComplete={mockToggle}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('renders task without description', () => {
    const taskWithoutDesc = { ...mockTask, description: '' };
    const mockToggle = jest.fn();
    const mockEdit = jest.fn();
    const mockDelete = jest.fn();
    
    render(
      <TaskItem
        task={taskWithoutDesc}
        onToggleComplete={mockToggle}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });

  test('checkbox is unchecked for incomplete task', () => {
    const mockToggle = jest.fn();
    const mockEdit = jest.fn();
    const mockDelete = jest.fn();
    
    render(
      <TaskItem
        task={mockTask}
        onToggleComplete={mockToggle}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('checkbox is checked for completed task', () => {
    const completedTask = { ...mockTask, completed: true };
    const mockToggle = jest.fn();
    const mockEdit = jest.fn();
    const mockDelete = jest.fn();
    
    render(
      <TaskItem
        task={completedTask}
        onToggleComplete={mockToggle}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('calls onToggleComplete when checkbox is clicked', () => {
    const mockToggle = jest.fn();
    const mockEdit = jest.fn();
    const mockDelete = jest.fn();
    
    render(
      <TaskItem
        task={mockTask}
        onToggleComplete={mockToggle}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockToggle).toHaveBeenCalledWith(mockTask);
  });

  test('calls onEdit when edit button is clicked', () => {
    const mockToggle = jest.fn();
    const mockEdit = jest.fn();
    const mockDelete = jest.fn();
    
    render(
      <TaskItem
        task={mockTask}
        onToggleComplete={mockToggle}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );
    
    const editButton = screen.getByTitle('Edit task');
    fireEvent.click(editButton);
    
    expect(mockEdit).toHaveBeenCalledWith(mockTask);
  });

  test('shows confirmation dialog when delete button is clicked', () => {
    const mockToggle = jest.fn();
    const mockEdit = jest.fn();
    const mockDelete = jest.fn();
    
    window.confirm = jest.fn(() => true);
    
    render(
      <TaskItem
        task={mockTask}
        onToggleComplete={mockToggle}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );
    
    const deleteButton = screen.getByTitle('Delete task');
    fireEvent.click(deleteButton);
    
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this task?');
    expect(mockDelete).toHaveBeenCalledWith('123');
  });

  test('does not call onDelete if confirmation is cancelled', () => {
    const mockToggle = jest.fn();
    const mockEdit = jest.fn();
    const mockDelete = jest.fn();
    
    window.confirm = jest.fn(() => false);
    
    render(
      <TaskItem
        task={mockTask}
        onToggleComplete={mockToggle}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );
    
    const deleteButton = screen.getByTitle('Delete task');
    fireEvent.click(deleteButton);
    
    expect(window.confirm).toHaveBeenCalled();
    expect(mockDelete).not.toHaveBeenCalled();
  });

  test('applies completed class when task is completed', () => {
    const completedTask = { ...mockTask, completed: true };
    const mockToggle = jest.fn();
    const mockEdit = jest.fn();
    const mockDelete = jest.fn();
    
    const { container } = render(
      <TaskItem
        task={completedTask}
        onToggleComplete={mockToggle}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );
    
    const taskItem = container.querySelector('.task-item');
    expect(taskItem).toHaveClass('completed');
  });
});
