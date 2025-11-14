"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Task } from "@/types/task";
import { createTask, deleteTask, subscribeUserTasks, updateTask } from "@/lib/tasks";
import { getCurrentUser, onAuthChange } from "@/lib/auth";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import LogoutButton from "@/components/LogoutButton";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(getCurrentUser());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editing, setEditing] = useState<Task | null>(null);

  const email = useMemo(() => user?.email ?? "", [user]);

  useEffect(() => {
    const unsubAuth = onAuthChange((u) => setUser(u));
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }
    const unsub = subscribeUserTasks(user.email!, setTasks);
    return () => unsub();
  }, [user, router]);

  const onCreate = async (payload: Omit<Task, "id">) => {
    await createTask(payload);
    setEditing(null);
  };

  const onUpdate = async (id: string, updates: Partial<Omit<Task, "id" | "userEmail">>) => {
    await updateTask(id, updates);
    setEditing(null);
  };

  const onToggle = async (id: string, completed: boolean) => {
    await updateTask(id, { completed });
  };

  const onDelete = async (id: string) => {
    await deleteTask(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-300">Welcome</p>
          <h2 className="text-xl font-semibold">{email}</h2>
        </div>
        <LogoutButton />
      </div>

      <TaskForm
        userEmail={email}
        editing={editing}
        onCreate={onCreate}
        onUpdate={onUpdate}
        onCancelEdit={() => setEditing(null)}
      />

      <TaskList tasks={tasks} onToggle={onToggle} onEdit={setEditing} onDelete={onDelete} />
    </div>
  );
}
