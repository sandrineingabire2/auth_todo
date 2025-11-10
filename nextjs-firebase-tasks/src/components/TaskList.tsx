import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Task } from '../types';
import TaskItem from './TaskItem';
import { getTasks } from '../services/tasks';

const TaskList: React.FC = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = React.useState<Task[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const fetchTasks = async () => {
            if (user) {
                const userTasks = await getTasks(user.email);
                setTasks(userTasks);
            }
            setLoading(false);
        };

        fetchTasks();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Your Tasks</h2>
            {tasks.length === 0 ? (
                <p>No tasks available. Please add some tasks.</p>
            ) : (
                <ul>
                    {tasks.map(task => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;