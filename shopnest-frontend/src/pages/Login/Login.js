import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authService.login(formData);

      localStorage.setItem("token", response.data.accessToken);

      navigate("/home");

    } catch (err) {
      setError("Invalid Username or Password!");
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2>Welcome Back..</h2>
        <p className="subtitle">Login to your ShopNest account</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="usernameOrEmail"
            placeholder="Email"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="error">{error}</p>}

        </form>

        <p className="register-link">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
