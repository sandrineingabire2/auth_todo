import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Task } from '../types';

export const createTask = async (task: Task) => {
    try {
        const docRef = await addDoc(collection(db, 'tasks'), task);
        return { id: docRef.id, ...task };
    } catch (error) {
        console.error('Error creating task:', error);
        throw new Error('Could not create task');
    }
};

export const getTasks = async (userEmail: string) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'tasks'));
        const tasks: Task[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data() as Task;
            if (data.userEmail === userEmail) {
                tasks.push({ id: doc.id, ...data });
            }
        });
        return tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw new Error('Could not fetch tasks');
    }
};

export const updateTask = async (id: string, updatedTask: Partial<Task>) => {
    try {
        const taskRef = doc(db, 'tasks', id);
        await updateDoc(taskRef, updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        throw new Error('Could not update task');
    }
};

export const deleteTask = async (id: string) => {
    try {
        const taskRef = doc(db, 'tasks', id);
        await deleteDoc(taskRef);
    } catch (error) {
        console.error('Error deleting task:', error);
        throw new Error('Could not delete task');
    }
};