"use client";

import { useState, useEffect } from "react";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // قدرت رمز
  const [strength, setStrength] = useState({ width: "0%", color: "var(--primary)" });
  const [reqs, setReqs] = useState({
    length: false,
    lower: false,
    upper: false,
    number: false,
    special: false,
    noSpace: false,
  });

  useEffect(() => {
    const pass = password;
    const hasLength = pass.length >= 8;
    const hasLower = /[a-z]/.test(pass);
    const hasUpper = /[A-Z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    const hasNoSpace = !/\s/.test(pass);

    setReqs({
      length: hasLength,
      lower: hasLower,
      upper: hasUpper,
      number: hasNumber,
      special: hasSpecial,
      noSpace: hasNoSpace,
    });

    const passed = [hasLength, hasLower, hasUpper, hasNumber, hasSpecial, hasNoSpace].filter(Boolean).length;

    if (!pass) {
      setStrength({ width: "0%", color: "var(--primary)" });
    } else if (passed <= 2) {
      setStrength({ width: "20%", color: "var(--primary)" });
    } else if (passed <= 4) {
      setStrength({ width: "60%", color: "var(--warning)" });
    } else {
      setStrength({ width: "100%", color: "var(--success)" });
    }
  }, [password]);

  const confirmClass = !confirm
    ? "form-control neutral-input"
    : confirm === password
    ? "form-control valid-input"
    : "form-control invalid-input";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }
    // TODO: ارسال به API
    alert(`Registered as ${username}`);
  };

  return (
    <div className="card" style={{ width: "100%", maxWidth: "420px" }}>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="reg-name" className="form-label">Username</label>
          <input
            type="text" id="reg-name" className="form-control"
            placeholder="Enter your username" required
            value={username} onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="reg-email" className="form-label">Email</label>
          <input
            type="email" id="reg-email" className="form-control"
            placeholder="example@email.com" required
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="reg-password" className="form-label">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="reg-password" className="form-control"
              placeholder="Enter your password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <div className="password-strength-meter mt-2">
            <div className="strength-bar" style={{ width: strength.width, backgroundColor: strength.color }} />
          </div>

          <ul className="password-requirements">
            <li className={reqs.length ? "valid" : "invalid"}>
              {reqs.length ? "✔" : "✘"} At least 8 characters
            </li>
            <li className={reqs.lower ? "valid" : "invalid"}>
              {reqs.lower ? "✔" : "✘"} One lowercase letter
            </li>
            <li className={reqs.upper ? "valid" : "invalid"}>
              {reqs.upper ? "✔" : "✘"} One uppercase letter
            </li>
            <li className={reqs.number ? "valid" : "invalid"}>
              {reqs.number ? "✔" : "✘"} One number
            </li>
            <li className={reqs.special ? "valid" : "invalid"}>
              {reqs.special ? "✔" : "✘"} One special character
            </li>
            <li className={reqs.noSpace ? "valid" : "invalid"}>
              {reqs.noSpace ? "✔" : "✘"} No spaces
            </li>
          </ul>
        </div>

        <div className="mb-3">
          <label htmlFor="reg-confirm" className="form-label">Confirm Password</label>
          <div className="password-wrapper">
            <input
              type={showConfirm ? "text" : "password"}
              id="reg-confirm" className={confirmClass}
              placeholder="Re-enter your password" required
              value={confirm} onChange={(e) => setConfirm(e.target.value)}
            />
            <button type="button" className="toggle-password"
              onClick={() => setShowConfirm(!showConfirm)}
              aria-label={showConfirm ? "Hide password" : "Show password"}>
              {showConfirm ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-3">Register</button>
      </form>
    </div>
  );
}