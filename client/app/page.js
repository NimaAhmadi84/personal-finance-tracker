"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "./lib/auth";
import AuthPage from "./components/AuthPage";

export default function Home() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (isLoggedIn()) {
      router.push("/dashboard");
    } else {
      setChecking(false);
    }
  }, [router]);

  // اگر در حال بررسی هستیم یا کاربر لاگین کرده بود و در حال redirect است، چیزی نمایش نده
  if (checking) {
    return null;
  }

  return <AuthPage />;
}