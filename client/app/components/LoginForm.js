"use client";

import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: ارسال به API
    alert(`Logged in as ${email}`);
  };

  return (
    <div className="card" style={{ width: "100%", maxWidth: "420px" }}>
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="login-email" className="form-label">Email</label>
          <input
            type="email" id="login-email" className="form-control"
            placeholder="example@email.com" required
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="login-password" className="form-label">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="login-password" className="form-control"
              placeholder="Enter your password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-3">Log In</button>
      </form>
    </div>
  );
}