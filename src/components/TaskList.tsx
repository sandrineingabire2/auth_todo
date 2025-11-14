"use client";
import type { Task } from "@/types/task";

type Props = {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => Promise<void>;
};

const badge = (p: Task["priority"]) =>
  p === "High"
    ? "bg-pink-600"
    : p === "Medium"
    ? "bg-amber-500"
    : "bg-emerald-600";

export default function TaskList({ tasks, onToggle, onEdit, onDelete }: Props) {
  if (!tasks.length) return <p className="text-gray-400">No tasks yet.</p>;
  return (
    <ul className="space-y-3">
      {tasks.map((t) => (
        <li key={t.id} className="rounded-xl border border-gray-800 bg-white/5 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={(e) => onToggle(t.id, e.target.checked)}
                  className="h-4 w-4 accent-indigo-600"
                />
                <h3 className="text-lg font-semibold text-white">{t.title}</h3>
                <span className={`rounded-full px-2 py-1 text-xs text-white ${badge(t.priority)}`}>
                  {t.priority}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-300">{t.description}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={() => onEdit(t)}
                className="rounded-md bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(t.id)}
                className="rounded-md bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}