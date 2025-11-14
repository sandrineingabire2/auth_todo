"use client";
// Simple local-storage based auth for demo mode (no Firebase)

export type LocalUser = { email: string };

const USERS_KEY = "auth_demo_users";
const SESSION_KEY = "auth_demo_session";

type UserRecord = { password: string };

function loadUsers(): Record<string, UserRecord> {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, UserRecord>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setSession(user: LocalUser | null) {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
  notifyAuthListeners(user);
}

export function getCurrentUser(): LocalUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as LocalUser) : null;
  } catch {
    return null;
  }
}

export async function register(email: string, password: string): Promise<void> {
  const users = loadUsers();
  const key = email.trim().toLowerCase();
  if (users[key]) {
    const err = new Error("Email already in use");
    (err as any).code = "auth/email-already-in-use";
    throw err;
  }
  users[key] = { password };
  saveUsers(users);
}

export async function signIn(email: string, password: string): Promise<void> {
  const users = loadUsers();
  const key = email.trim().toLowerCase();
  const rec = users[key];
  if (!rec || rec.password !== password) {
    const err = new Error("Invalid credential");
    (err as any).code = "auth/invalid-credential";
    throw err;
  }
  setSession({ email });
}

export async function signOut(): Promise<void> {
  setSession(null);
}

type AuthListener = (user: LocalUser | null) => void;
const listeners = new Set<AuthListener>();

function notifyAuthListeners(user: LocalUser | null) {
  listeners.forEach((cb) => {
    try {
      cb(user);
    } catch {}
  });
}

export function onAuthChange(cb: AuthListener) {
  listeners.add(cb);
  try {
    cb(getCurrentUser());
  } catch {}
  return () => {
    // Ensure cleanup returns void, not boolean
    try {
      listeners.delete(cb);
    } catch {}
  };
}