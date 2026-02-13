// src/components/Login.jsx
import React, { useState } from "react";
import loginImage from "../assets/login.jpg";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error handling state
  const navigate = useNavigate(); // Redirect after successful login

  // Handle login submit
  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("https://yourapi.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login: Store token and navigate
        localStorage.setItem("authToken", data.token); // Store token in localStorage
        navigate("/home"); // Redirect to /home page after login
      } else {
        // Handle errors (e.g., invalid credentials)
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      // Handle any errors with the fetch request
      setErrorMessage("Network error, please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="relative w-full max-w-6xl h-[85vh] rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-xl mx-6">
        <div className="flex w-[200%] h-full transition-transform duration-700 ease-in-out">
          {/* LOGIN VIEW */}
          <div className="w-1/2 flex">
            {/* Login Form */}
            <div className="w-1/2 flex items-center justify-center p-10">
              <div className="w-full max-w-md text-white">
                <h1 className="text-4xl font-bold mb-3">Welcome Back 👋</h1>
                <p className="mb-8 text-white/80">Login to continue your journey</p>

                {errorMessage && (
                  <div className="text-red-500 mb-4">
                    <p>{errorMessage}</p>
                  </div>
                )}

                <form onSubmit={handleLogin}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 px-4 py-3 rounded-xl bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-6 px-4 py-3 rounded-xl bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                  <button className="w-full py-3 rounded-xl font-semibold bg-linear-to-r from-pink-500 to-purple-600 hover:scale-105 transition shadow-lg">
                    Login
                  </button>
                </form>

                <p className="mt-6 text-sm text-white/80">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-yellow-300 font-semibold hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>

            <div className="w-1/2">
              <img
                src={loginImage}
                alt="login page image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
