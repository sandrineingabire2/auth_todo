"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register as registerUser } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await registerUser(email, password);
      router.replace("/login");
    } catch (err: any) {
      const code = err?.code as string | undefined;
      const friendly =
        code === "auth/email-already-in-use"
          ? "Email already in use."
          : code === "auth/invalid-email"
          ? "Invalid email format."
          : "Registration failed. Please try again.";
      setError(friendly);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Register</h2>
      {/* Demo mode: local auth is enabled, Firebase removed */}
      <form onSubmit={onSubmit} className="space-y-4 rounded-xl bg-white/5 p-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-300">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-300">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
          >
            Register
          </button>
          <button
            type="button"
            className="text-sm text-gray-300 underline"
            onClick={() => router.push("/login")}
          >
            Back to login
          </button>
        </div>
      </form>
    </div>
  );
}