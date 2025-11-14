import type { Task } from "@/types/task";

// Local-storage backed task store per user (no Firebase)
const SUBS: Map<string, Set<(tasks: Task[]) => void>> = new Map();

function keyFor(email: string) {
  return `auth_demo_tasks:${email.toLowerCase()}`;
}

function load(email: string): Task[] {
  try {
    const raw = localStorage.getItem(keyFor(email));
    const arr = raw ? (JSON.parse(raw) as Task[]) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function save(email: string, tasks: Task[]) {
  localStorage.setItem(keyFor(email), JSON.stringify(tasks));
  notify(email);
}

function notify(email: string) {
  const subs = SUBS.get(email.toLowerCase());
  if (!subs) return;
  const tasks = load(email);
  subs.forEach((cb) => {
    try {
      cb(tasks);
    } catch {}
  });
}

function genId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `t_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function createTask(payload: Omit<Task, "id">) {
  const tasks = load(payload.userEmail);
  const id = genId();
  const next = [...tasks, { id, ...payload }];
  save(payload.userEmail, next);
  return id;
}

export async function updateTask(
  id: string,
  updates: Partial<Omit<Task, "id" | "userEmail">> & { userEmail?: string }
) {
  const email = updates.userEmail as string | undefined;
  let owner = email;
  if (!owner) {
    for (const e of SUBS.keys()) {
      const list = load(e);
      if (list.some((t) => t.id === id)) {
        owner = e;
        break;
      }
    }
  }
  if (!owner) return;
  const list = load(owner);
  const next = list.map((t) => (t.id === id ? ({ ...t, ...updates } as Task) : t));
  save(owner, next);
}

export async function deleteTask(id: string, userEmail?: string) {
  let owner = userEmail;
  if (!owner) {
    for (const e of SUBS.keys()) {
      const list = load(e);
      if (list.some((t) => t.id === id)) {
        owner = e;
        break;
      }
    }
  }
  if (!owner) return;
  const list = load(owner);
  const next = list.filter((t) => t.id !== id);
  save(owner, next);
}

export function subscribeUserTasks(email: string, cb: (tasks: Task[]) => void) {
  const k = email.toLowerCase();
  const set = SUBS.get(k) || new Set();
  set.add(cb);
  SUBS.set(k, set);
  cb(load(email));
  return () => {
    const s = SUBS.get(k);
    if (!s) return;
    s.delete(cb);
    if (!s.size) SUBS.delete(k);
  };
}