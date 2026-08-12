import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Background decoration */}
      <div className="background-circle circle-one"></div>
      <div className="background-circle circle-two"></div>
      <div className="background-circle circle-three"></div>

      <div className="home-card">
        {/* Icon */}
        <div className="logo-box">
          <span>📦</span>
        </div>

        <p className="welcome-text">WELCOME TO</p>

        <h1>
          Inventory
          <span> Management</span>
        </h1>

        <p className="description">
          Manage your inventory efficiently, securely, and effortlessly.
          Keep track of your products and manage everything from one place.
        </p>

        <div className="buttons">
          <button
            className="btn-register"
            onClick={() => navigate("/register")}
          >
            <span>🚀</span>
            Create Account
          </button>

          <button
            className="btn-login"
            onClick={() => navigate("/login")}
          >
            <span>🔐</span>
            Login
          </button>
        </div>

        <div className="features">
          <div className="feature">
            <span>✓</span>
            Easy to use
          </div>

          <div className="feature">
            <span>✓</span>
            Secure
          </div>

          <div className="feature">
            <span>✓</span>
            Fast
          </div>
        </div>

        <div className="footer-text">
  <span>© 2026 Inventory Management System</span>

  <span className="footer-divider">•</span>

  <span>
    Crafted with <span className="heart">♥</span> by{" "}
    <strong>Harshit Saraswat</strong>
  </span>
</div>
      </div>
    </div>
  );
}

export default Home;