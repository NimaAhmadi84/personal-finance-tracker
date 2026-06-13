"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "../lib/auth";

export default function DashboardClient() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/");
    } else {
      setUser(currentUser);
    }
    setLoading(false);
  }, [router]);

  if (loading || !user) {
    return null;
  }

  return (
    <main className="container text-center mt-5">
      <h1 className="text-white">Welcome, {user.username}!</h1>
      <p className="text-muted">Your dashboard is ready.</p>
    </main>
  );
}