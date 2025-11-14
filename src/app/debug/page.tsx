"use client";
import { useEffect, useState } from "react";
import { getCurrentUser, onAuthChange } from "@/lib/auth";

export default function EnvDebugPage() {
  const [userEmail, setUserEmail] = useState<string>(getCurrentUser()?.email ?? "");

  useEffect(() => {
    const unsub = onAuthChange((u) => setUserEmail(u?.email ?? ""));
    return () => unsub();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Demo Mode Status</h2>
      <div className="rounded-xl bg-white/5 p-4">
        <p className="mb-2 text-sm text-gray-300">
          Firebase has been removed. The app now uses local storage for auth and tasks.
          No environment credentials are required.
        </p>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span className="text-gray-400">Auth Backend</span>
            <span className="font-mono">Local Storage</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-400">Tasks Backend</span>
            <span className="font-mono">Local Storage (per-email)</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-400">Signed In</span>
            <span className="font-mono">{userEmail || "No"}</span>
          </li>
        </ul>
      </div>
      <div className="rounded-xl bg-white/5 p-4 text-sm text-gray-300">
        <p>
          Use the Register page to create a local account, then Login. Tasks are persisted
          locally and scoped to your email. This is intended for offline/demo usage.
        </p>
      </div>
    </div>
  );
}