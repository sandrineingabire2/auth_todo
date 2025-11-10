import { useEffect, useState } from 'react';
import { getTasks } from '@/services/tasks';
import { useAuth } from '@/hooks/useAuth';
import TaskList from '@/components/TaskList';

const TasksPage = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchTasks = async () => {
        const userTasks = await getTasks(user.email);
        setTasks(userTasks);
      };
      fetchTasks();
    }
  }, [user]);

  if (!user) {
    return <div>Please log in to see your tasks.</div>;
  }

  return (
    <div>
      <h1>Your Tasks</h1>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default TasksPage;