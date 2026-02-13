import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';

// Mock data for users (Replace this with an actual API request)
const usersData = [
  { id: 1, name: "John Doe", imageUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
  { id: 2, name: "Jane Smith", imageUrl: "https://randomuser.me/api/portraits/women/1.jpg" },
  { id: 3, name: "Sara Lee", imageUrl: "https://randomuser.me/api/portraits/women/2.jpg" },
  // Add more users or fetch from an API
];

const HomePage = () => {
  const [users, setUsers] = useState(usersData);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [liked, setLiked] = useState(false); // State to track whether the profile is liked
  const navigate = useNavigate();

  // Handle discard (reject)
  const handleDiscard = () => {
    console.log("User discarded");
    setLiked(false); // Reset liked state on discard
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1); // Move to the next user
    } else {
      console.log("No more users.");
    }
  };

  // Handle swipe right (like)
  const handleSendRequest = () => {
    console.log("Swiped Right");
    setLiked(true); // Set liked to true when liked
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1); // Move to the next user
    } else {
      console.log("No more users.");
    }
  };

  const handleLogout = () => {
    // Logic to handle user logout, e.g., clear the token
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500">
      <div className="relative w-full max-w-6xl h-[85vh] rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-xl">
        <div className="flex flex-col items-center justify-center p-8 space-y-8">
          {/* User Card Section */}
          {users.length > 0 && currentUserIndex < users.length && (
            <div className="w-full max-w-xs bg-white p-6 rounded-xl shadow-lg">
              <img
                src={users[currentUserIndex].imageUrl}
                alt={users[currentUserIndex].name}
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
              <h2 className="text-xl font-bold text-center">{users[currentUserIndex].name}</h2>
            </div>
          )}

          {/* Swipe Actions */}
          <div className="flex space-x-8">
            {/* Discard Button */}
            <button
              onClick={handleDiscard}
              className="bg-red-500 text-white py-3 px-8 rounded-xl text-xl font-semibold hover:scale-105 transition"
            >
              Discard
            </button>

            {/* Favorite (Like) Icon Button */}
            <button
              onClick={() => setLiked(!liked)} // Toggle the liked state on click
              className={`${
                liked ? "text-white" : "text-gray-500"
              }  rounded-xl p-3 transition duration-300 ease-in-out  hover:text-white`}
            >
              <FavoriteIcon fontSize="large" />
            </button>

            {/* Send Request Button */}
            <button
              onClick={handleSendRequest}
              className="bg-green-500 text-white py-3 px-8 rounded-xl text-xl font-semibold hover:scale-105 transition"
            >
              Send Request
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-yellow-500 text-white py-2 px-6 rounded-xl text-sm font-semibold hover:scale-105 transition mt-6"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
