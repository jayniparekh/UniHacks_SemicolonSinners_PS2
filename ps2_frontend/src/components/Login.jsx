// src/components/Login.jsx
import React, { useState } from "react";
import loginImage from "../assets/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch(
        "https://profilepro-1bp4.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        setErrorMessage(data.message || "Invalid credentials.");
        return;
      }

      // Save token and user ID
      localStorage.setItem("authToken", data.token);
      if (data.userId) {
        localStorage.setItem("userId", data.userId);
      }

      // ✅ Check if user has a profile
      try {
        const profileCheck = await fetch(
          `https://profilepro-1bp4.onrender.com/api/profile/user/${data.userId || 'me'}`,
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${data.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (profileCheck.ok) {
          const profileData = await profileCheck.json();
          navigate(`/profile-display/${profileData._id || profileData.id}`);
        } else if (profileCheck.status === 404) {
          navigate("/create-profile");
        } else {
          navigate("/create-profile");
        }
      } catch (error) {
        console.error("Error checking profile:", error);
        navigate("/create-profile");
      }

    } catch (error) {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        
        {/* Left Side - Form */}
        <div className="auth-form-section">
          <div className="auth-form-wrapper">
            
            <div className="auth-header">
              <h1 className="auth-title">Welcome Back 👋</h1>
              <p className="auth-subtitle">Login to continue your journey</p>
            </div>

            {errorMessage && (
              <div className="error-message">
                <svg className="error-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="auth-form">
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <p className="auth-footer-text">
              Don't have an account?{" "}
              <Link to="/signup" className="auth-link">Sign Up</Link>
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="auth-image-section">
          <div className="image-overlay"></div>
          <img src={loginImage} alt="Login" className="auth-image" />
          <div className="image-content">
            <h2>Start Your Journey</h2>
            <p>Get honest feedback on your dating profile from real people</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;