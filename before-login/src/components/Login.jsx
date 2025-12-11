import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) return alert(data.msg);

      if (data.token) localStorage.setItem("token", data.token);

      alert("Login Successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Login failed — check server");
    }
  };

  return (
    <div className="tm-login-page">
      <div className="tm-login-card">
        <h2 className="tm-login-title">Welcome Back</h2>
        <p className="tm-login-subtitle">
          Login to continue your TeleMed journey
        </p>

        <form className="tm-login-form" onSubmit={handleSubmit}>
          <div className="tm-login-field">
            <label className="tm-login-label">Email</label>
            <input
              className="tm-login-input"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="tm-login-field">
            <label className="tm-login-label">Password</label>
            <input
              className="tm-login-input"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="tm-login-btn" type="submit">
            Login
          </button>
        </form>

        <div className="tm-login-switch">
          Don’t have an account?{" "}
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}
