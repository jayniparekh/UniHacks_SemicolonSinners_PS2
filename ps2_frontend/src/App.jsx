import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from './components/Home';
import ProfileReviewLanding from './LandingPage'
import UserProfileForm from './UserProfileForm'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<UserProfileForm />} />
        <Route path="/" element={<ProfileReviewLanding />} />
      </Routes>
    </Router>
  )
}

export default App

