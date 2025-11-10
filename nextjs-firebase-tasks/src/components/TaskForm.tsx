import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Task } from '../types';
import { createTask, updateTask } from '../services/tasks';

interface TaskFormProps {
  existingTask?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ existingTask }) => {
  const [title, setTitle] = useState<string>(existingTask ? existingTask.title : '');
  const [description, setDescription] = useState<string>(existingTask ? existingTask.description : '');
  const [priority, setPriority] = useState<string>(existingTask ? existingTask.priority : 'normal');
  const router = useRouter();

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
      setPriority(existingTask.priority);
    }
  }, [existingTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const taskData = { title, description, priority };

    if (existingTask) {
      await updateTask(existingTask.id, taskData);
    } else {
      await createTask(taskData);
    }

    router.push('/dashboard/tasks');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
      </div>
      <button type="submit">{existingTask ? 'Update Task' : 'Create Task'}</button>
    </form>
  );
};

export default TaskForm;