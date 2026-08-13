import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

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
        "https://harshit-inventory-api-2026.onrender.com/register",
        form
      );

      setMessage(res.data.message);

      alert(res.data.message);

      navigate("/login");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .register-page {
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

        /* Background decoration */

        .register-circle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;

          animation: registerFloat 8s ease-in-out infinite;
        }

        .register-circle-one {
          width: 270px;
          height: 270px;

          top: -100px;
          left: -80px;

          background: rgba(99, 102, 241, 0.2);
        }

        .register-circle-two {
          width: 230px;
          height: 230px;

          bottom: -80px;
          right: -60px;

          background: rgba(16, 185, 129, 0.18);

          animation-delay: 2s;
        }

        .register-circle-three {
          width: 100px;
          height: 100px;

          top: 15%;
          right: 12%;

          background: rgba(236, 72, 153, 0.15);

          animation-delay: 4s;
        }

        /* Card */

        .register-card {
          width: 450px;

          padding: 40px;

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

          animation: registerAppear 0.7s ease;
        }

        /* Logo */

        .register-logo {
          width: 70px;
          height: 70px;

          margin: 0 auto 18px;

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

          animation:
            registerLogoFloat
            3s
            ease-in-out
            infinite;
        }

        /* Heading */

        .register-card h1 {
          text-align: center;

          color: white;

          font-size: 31px;
          font-weight: 800;

          margin: 0 0 8px;
        }

        .register-subtitle {
          text-align: center;

          color: #94a3b8;

          font-size: 14px;

          margin-bottom: 28px;
        }

        /* Form */

        .register-form {
          display: flex;
          flex-direction: column;

          gap: 16px;
        }

        .name-row {
          display: grid;

          grid-template-columns: 1fr 1fr;

          gap: 14px;
        }

        .input-group {
          display: flex;
          flex-direction: column;

          gap: 7px;
        }

        .input-group label {
          color: #cbd5e1;

          font-size: 13px;
          font-weight: 600;
        }

        .register-input {
          width: 100%;

          padding: 13px 15px;

          border-radius: 11px;

          border:
            1px solid
            rgba(255, 255, 255, 0.15);

          outline: none;

          background:
            rgba(15, 23, 42, 0.55);

          color: white;

          font-size: 14px;

          transition: all 0.3s ease;
        }

        .register-input::placeholder {
          color: #64748b;
        }

        .register-input:focus {
          border-color: #6366f1;

          background:
            rgba(15, 23, 42, 0.75);

          box-shadow:
            0 0 0 3px
            rgba(99, 102, 241, 0.15);
        }

        /* Register Button */

        .register-button {
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
            0 8px 20px
            rgba(59, 130, 246, 0.3);

          transition: all 0.3s ease;
        }

        .register-button:hover {
          transform: translateY(-3px);

          box-shadow:
            0 14px 30px
            rgba(59, 130, 246, 0.45);
        }

        .register-button:active {
          transform: translateY(0);
        }

        /* Login Link */

        .login-text {
          text-align: center;

          margin-top: 22px;

          color: #64748b;

          font-size: 13px;
        }

        .login-link {
          color: #60a5fa;

          font-weight: 600;

          text-decoration: none;

          transition: color 0.3s ease;
        }

        .login-link:hover {
          color: #93c5fd;

          text-decoration: underline;
        }

        /* Success Message */

        .success-message {
          text-align: center;

          margin-top: 12px;

          color: #34d399;

          font-size: 13px;
        }

        /* Footer */

        .register-footer {
          text-align: center;

          margin-top: 24px;
          padding-top: 18px;

          border-top:
            1px solid
            rgba(255, 255, 255, 0.08);

          color: #475569;

          font-size: 11px;
        }

        .register-footer strong {
          color: #64748b;
        }

        .heart {
          color: #f43f5e;
        }

        /* Animations */

        @keyframes registerAppear {
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

        @keyframes registerLogoFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes registerFloat {
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
          .register-page {
            padding: 15px;
          }

          .register-card {
            width: 100%;

            padding: 32px 24px;
          }

          .register-card h1 {
            font-size: 27px;
          }

          .name-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="register-page">

        {/* Background decoration */}
        <div className="register-circle register-circle-one"></div>

        <div className="register-circle register-circle-two"></div>

        <div className="register-circle register-circle-three"></div>

        <div className="register-card">

          {/* Logo */}
          <div className="register-logo">
            ✨
          </div>

          <h1>Create Account</h1>

          <p className="register-subtitle">
            Join the Inventory Management System
          </p>

          <form
            className="register-form"
            onSubmit={handleSubmit}
          >

            {/* First + Last Name */}

            <div className="name-row">

              <div className="input-group">

                <label>First Name</label>

                <input
                  className="register-input"
                  type="text"
                  name="firstname"
                  placeholder="First name"
                  value={form.firstname}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="input-group">

                <label>Last Name</label>

                <input
                  className="register-input"
                  type="text"
                  name="lastname"
                  placeholder="Last name"
                  value={form.lastname}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* Email */}

            <div className="input-group">

              <label>Email Address</label>

              <input
                className="register-input"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />

            </div>

            {/* Password */}

            <div className="input-group">

              <label>Password</label>

              <input
                className="register-input"
                type="password"
                name="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
              />

            </div>

            {/* Button */}

            <button
              className="register-button"
              type="submit"
            >
              🚀 &nbsp; Create My Account
            </button>

          </form>

          {/* Message */}

          {message && (
            <p className="success-message">
              ✓ {message}
            </p>
          )}

          {/* Login */}

          <div className="login-text">

            Already have an account?{" "}

            <Link
              className="login-link"
              to="/login"
            >
              Login here
            </Link>

          </div>

          {/* Footer */}

          <div className="register-footer">

            © 2026 Inventory Management System

            <br />

            Crafted with{" "}
            <span className="heart">♥</span>{" "}
            by{" "}
            <strong>Harshit Saraswat</strong>

          </div>

        </div>

      </div>
    </>
  );
}

export default Register;