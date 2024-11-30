import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/signin");
  };

  return (
    <nav className="flex items-center justify-between p-4 px-8 bg-white shadow">
      <div className="text-2xl font-bold">
        <Link to="/">
          <img src="Markd.svg" alt="Logo" className="h-12 w-auto" />
        </Link>
      </div>
      <div className="space-x-4">
        {token && (
          <>
          <Link to="/new-article" className="text-gray-600 hover:text-gray-800 hover:underline">
            Write
          </Link>
          <Link to={`/users/${userId}`} className="text-gray-600 hover:text-gray-800 hover:underline">
            Profile
          </Link>
          </>
        )}
        {token ? (
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-800"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/signin" className="text-gray-600 hover:text-gray-800">
              Sign In
            </Link>
            <Link
              to="/getstarted"
              className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
