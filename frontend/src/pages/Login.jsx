import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
         "https://harshit-inventory-api-2026.onrender.com/login",
        form
      );

      localStorage.setItem(
        "token",
        res.data.access_token
      );

      localStorage.setItem(
        "firstname",
        res.data.firstname
      );

      navigate("/dashboard");

    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .login-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          position: relative;
          overflow: hidden;

          background:
            radial-gradient(
              circle at 15% 20%,
              rgba(99, 102, 241, 0.35),
              transparent 30%
            ),
            radial-gradient(
              circle at 85% 80%,
              rgba(16, 185, 129, 0.25),
              transparent 30%
            ),
            linear-gradient(
              135deg,
              #0f172a,
              #1e1b4b,
              #172554
            );

          font-family:
            "Segoe UI",
            Tahoma,
            Geneva,
            Verdana,
            sans-serif;
        }

        /* Background circles */

        .login-circle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: loginFloat 8s ease-in-out infinite;
        }

        .login-circle-one {
          width: 260px;
          height: 260px;
          background: rgba(99, 102, 241, 0.2);
          top: -100px;
          left: -80px;
        }

        .login-circle-two {
          width: 220px;
          height: 220px;
          background: rgba(16, 185, 129, 0.18);
          bottom: -80px;
          right: -60px;
          animation-delay: 2s;
        }

        /* Login Card */

        .login-card {
          width: 420px;
          padding: 42px 40px;

          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.18);

          border-radius: 25px;

          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);

          box-shadow:
            0 25px 60px rgba(0, 0, 0, 0.35),
            inset 0 1px 1px rgba(255, 255, 255, 0.1);

          position: relative;
          z-index: 2;

          animation: loginAppear 0.7s ease;
        }

        /* Logo */

        .login-logo {
          width: 70px;
          height: 70px;

          margin: 0 auto 20px;

          display: flex;
          justify-content: center;
          align-items: center;

          border-radius: 20px;

          background:
            linear-gradient(
              135deg,
              #6366f1,
              #3b82f6
            );

          box-shadow:
            0 12px 30px rgba(59, 130, 246, 0.35);

          font-size: 32px;

          animation: logoFloat 3s ease-in-out infinite;
        }

        /* Heading */

        .login-card h1 {
          text-align: center;

          color: white;

          font-size: 32px;
          font-weight: 800;

          margin: 0 0 8px;
        }

        .login-subtitle {
          text-align: center;

          color: #94a3b8;

          font-size: 14px;

          margin-bottom: 30px;
        }

        /* Form */

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-group label {
          color: #cbd5e1;

          font-size: 13px;
          font-weight: 600;
        }

        .login-input {
          width: 100%;

          padding: 14px 16px;

          border-radius: 11px;

          border: 1px solid rgba(255, 255, 255, 0.15);

          outline: none;

          background: rgba(15, 23, 42, 0.55);

          color: white;

          font-size: 14px;

          transition: all 0.3s ease;
        }

        .login-input::placeholder {
          color: #64748b;
        }

        .login-input:focus {
          border-color: #6366f1;

          background: rgba(15, 23, 42, 0.75);

          box-shadow:
            0 0 0 3px rgba(99, 102, 241, 0.15);
        }

        /* Login Button */

        .login-button {
          width: 100%;

          margin-top: 5px;

          padding: 14px;

          border: none;
          border-radius: 11px;

          color: white;

          background:
            linear-gradient(
              135deg,
              #6366f1,
              #3b82f6
            );

          font-size: 15px;
          font-weight: 700;

          cursor: pointer;

          box-shadow:
            0 8px 20px rgba(59, 130, 246, 0.3);

          transition: all 0.3s ease;
        }

        .login-button:hover {
          transform: translateY(-3px);

          box-shadow:
            0 14px 30px rgba(59, 130, 246, 0.45);
        }

        .login-button:active {
          transform: translateY(0);
        }

        /* Register */

        .register-text {
          text-align: center;

          margin-top: 25px;

          color: #64748b;

          font-size: 13px;
        }

        .register-link {
          color: #60a5fa;

          font-weight: 600;

          text-decoration: none;

          transition: color 0.3s ease;
        }

        .register-link:hover {
          color: #93c5fd;

          text-decoration: underline;
        }

        /* Footer */

        .login-footer {
          text-align: center;

          margin-top: 25px;
          padding-top: 18px;

          border-top:
            1px solid rgba(255, 255, 255, 0.08);

          color: #475569;

          font-size: 11px;
        }

        .login-footer strong {
          color: #64748b;
        }

        /* Animations */

        @keyframes loginAppear {
          from {
            opacity: 0;
            transform:
              translateY(30px)
              scale(0.96);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }

        @keyframes logoFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes loginFloat {
          0%,
          100% {
            transform:
              translateY(0)
              translateX(0);
          }

          50% {
            transform:
              translateY(-25px)
              translateX(15px);
          }
        }

        /* Mobile */

        @media (max-width: 500px) {
          .login-page {
            padding: 15px;
          }

          .login-card {
            width: 100%;
            padding: 35px 25px;
          }

          .login-card h1 {
            font-size: 28px;
          }
        }
      `}</style>

      <div className="login-page">

        {/* Background decoration */}
        <div className="login-circle login-circle-one"></div>
        <div className="login-circle login-circle-two"></div>

        <div className="login-card">

          {/* Logo */}
          <div className="login-logo">
            🔐
          </div>

          <h1>Welcome Back</h1>

          <p className="login-subtitle">
            Login to your Inventory Management System
          </p>

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >

            <div className="input-group">
              <label>Email Address</label>

              <input
                className="login-input"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <input
                className="login-input"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="login-button"
              type="submit"
            >
              🔓 &nbsp; Login to Account
            </button>

          </form>

          <div className="register-text">
            Don't have an account?{" "}
            <Link
              className="register-link"
              to="/register"
            >
              Create New Account
            </Link>
          </div>

          <div className="login-footer">
            © 2026 Inventory Management System
            <br />
            Crafted with <span>♥</span> by{" "}
            <strong>Harshit Saraswat</strong>
          </div>

        </div>
      </div>
    </>
  );
}

export default Login;