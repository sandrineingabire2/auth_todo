"use client";
import { signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const onClick = async () => {
    await signOut();
    router.replace("/login");
  };
  return (
    <button
      onClick={onClick}
      className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-500"
    >
      Logout
    </button>
  );
}