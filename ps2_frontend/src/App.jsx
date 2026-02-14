import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProfileReviewLanding from './pages/LandingPage';
import DatingProfileForm from './pages/UserProfileForm'
import EditProfile from './pages/EditProfile';
import ProfileDisplay from './pages/ProfileDisplay';
import DiscoverPage from './pages/DiscoverPage'; // ✅ New Discover page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfileReviewLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create-profile" element={<DatingProfileForm />} />
        <Route path="/edit-profile/:profileId" element={<EditProfile />} />
        <Route path="/profile-display/:profileId" element={<ProfileDisplay />} />
        <Route path="/discover" element={<DiscoverPage />} /> {/* ✅ Main dating app page */}
      </Routes>
    </Router>
  );
}

export default App