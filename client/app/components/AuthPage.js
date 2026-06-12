"use client";

import { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("register");

  return (
    <>
      <header className="text-center my-5">
        <h1 className="display-4 fw-bold text-uppercase text-white">Welcome</h1>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button
            className={`btn btn-outline-danger rounded-pill px-4 py-2 fw-bold ${
              activeTab === "register" ? "active" : ""
            }`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
          <button
            className={`btn btn-outline-danger rounded-pill px-4 py-2 fw-bold ${
              activeTab === "login" ? "active" : ""
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
        </div>
      </header>

      <main className="d-flex justify-content-center">
        {activeTab === "register" ? <RegisterForm /> : <LoginForm />}
      </main>
    </>
  );
}