"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "../lib/auth";

export default function DashboardPage() {
  const router = useRouter();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      router.push("/"); // اگر لاگین نباشد، برگرد به صفحه اصلی
    }
  }, [user, router]);

  if (!user) {
    return null; // در حین redirect چیزی نمایش نده
  }

  return (
    <main className="container text-center mt-5">
      <h1 className="text-white">Welcome, {user.username}!</h1>
      <p className="text-muted">Your dashboard is ready.</p>
      {/* جای کارت بانکی اینجا خواهد آمد */}
    </main>
  );
}