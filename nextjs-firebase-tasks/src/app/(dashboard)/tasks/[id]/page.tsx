import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getTask, updateTask } from '@/services/tasks';
import TaskForm from '@/components/TaskForm';
import { Task } from '@/types';

const TaskEditPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        const fetchedTask = await getTask(id as string);
        setTask(fetchedTask);
        setLoading(false);
      };
      fetchTask();
    }
  }, [id]);

  const handleUpdate = async (updatedTask: Task) => {
    await updateTask(id as string, updatedTask);
    router.push('/dashboard/tasks');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div>
      <h1>Edit Task</h1>
      <TaskForm task={task} onSubmit={handleUpdate} />
    </div>
  );
};

export default TaskEditPage;