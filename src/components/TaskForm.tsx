"use client";
import { useEffect, useState } from "react";
import type { Task, Priority } from "@/types/task";

type Props = {
  userEmail: string;
  editing?: Task | null;
  onCreate: (payload: Omit<Task, "id">) => Promise<void>;
  onUpdate: (id: string, updates: Partial<Omit<Task, "id" | "userEmail">>) => Promise<void>;
  onCancelEdit: () => void;
};

const priorities: Priority[] = ["Low", "Medium", "High"];

export default function TaskForm({ userEmail, editing, onCreate, onUpdate, onCancelEdit }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setDescription(editing.description);
      setPriority(editing.priority);
    } else {
      setTitle("");
      setDescription("");
      setPriority("Medium");
    }
  }, [editing]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await onUpdate(editing.id, { title, description, priority });
    } else {
      await onCreate({ title, description, priority, completed: false, userEmail });
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl bg-white/5 p-4 backdrop-blur">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-300">Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Task title"
            className="rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-300">Priority</span>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="flex flex-col gap-1">
        <span className="text-sm text-gray-300">Description</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task details"
          className="min-h-[100px] rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          {editing ? "Update Task" : "Add Task"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-md bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}