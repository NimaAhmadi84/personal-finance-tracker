"use client";

import { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("register");

  return (
    <>
      <header className="text-center my-3 my-md-5">
        <h1 className="display-4 fw-bold text-uppercase text-white">Welcome</h1>
        <div className="d-flex justify-content-center gap-2 gap-md-3 mt-3 mt-md-4">
          <button
            type="button"
            className={`btn btn-outline-danger rounded-pill px-3 px-md-4 py-1 py-md-2 fw-bold ${
              activeTab === "register" ? "active" : ""
            }`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
          <button
            type="button"
            className={`btn btn-outline-danger rounded-pill px-3 px-md-4 py-1 py-md-2 fw-bold ${
              activeTab === "login" ? "active" : ""
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
        </div>
      </header>

      <main className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            {activeTab === "register" ? <RegisterForm /> : <LoginForm />}
          </div>
        </div>
      </main>
    </>
  );
}