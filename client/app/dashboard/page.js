"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "../lib/auth";

export default function DashboardPage() {
  const router = useRouter();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <main className="container text-center mt-5">
      <h1 className="text-white">Welcome, {user.username}!</h1>
      <p className="text-muted">Your dashboard is ready.</p>
    </main>
  );
}