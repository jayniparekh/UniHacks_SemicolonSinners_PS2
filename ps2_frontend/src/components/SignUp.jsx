// src/components/SignUp.jsx
import React, { useState } from "react";
import loginImage from "../assets/login.jpg";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error handling state
  const navigate = useNavigate(); // Redirect after successful signup

  // Handle sign up submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    const signupData = {
      fullName: fullName,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("https://yourapi.com/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful signup: Navigate to login page
        navigate("/login");
      } else {
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Network error, please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="relative w-full max-w-6xl h-[85vh] rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-xl">
        <div className="flex w-[200%] h-full transition-transform duration-700 ease-in-out">
          {/* SIGNUP VIEW */}
          <div className="w-1/2 flex">
            {/* Signup Form */}
            <div className="w-1/2 flex items-center justify-center p-10">
              <div className="w-full max-w-md text-white">
                <h1 className="text-4xl font-bold mb-3">Create Account 🚀</h1>
                <p className="mb-8 text-white/80">Join us and start exploring</p>

                {errorMessage && (
                  <div className="text-red-500 mb-4">
                    <p>{errorMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSignUp}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full mb-4 px-4 py-3 rounded-xl bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 px-4 py-3 rounded-xl bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-6 px-4 py-3 rounded-xl bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  <button className="w-full py-3 rounded-xl font-semibold bg-linear-to-r from-indigo-500 to-blue-600 hover:scale-105 transition shadow-lg">
                    Sign Up
                  </button>
                </form>

                <p className="mt-6 text-sm text-white/80">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="cursor-pointer font-semibold text-yellow-300 hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
            {/* Image Section */}
            <div className="w-1/2">
              <img
                src={loginImage}
                alt="SignUp page image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
