import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const handleLogoutClick = () => {
    if (!confirmLogout) {
      setConfirmLogout(true);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/signin");
    }
  };

  useEffect(() => {
    let timer;
    if (confirmLogout) {
      timer = setTimeout(() => {
        setConfirmLogout(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [confirmLogout]);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md backdrop-blur-sm bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to={token ? "/dashboard" : "/"}
              className="transform hover:scale-105 transition-transform duration-200"
            >
              <img src="/Markd.gif" alt="Logo" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {token ? (
              <>
                <Link
                  to="/new-article"
                  className="text-gray-600 hover:text-black transition-colors duration-200 font-medium"
                >
                  Write
                </Link>
                <Link
                  to={`/users/${userId}`}
                  className="text-gray-600 hover:text-black transition-colors duration-200 font-medium"
                >
                  Profile
                </Link>
                {confirmLogout ? (
                  <button
                    onClick={handleLogoutClick}
                    className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-300 font-medium animate-confirm"
                  >
                    Confirm?
                  </button>
                ) : (
                  <button
                    onClick={handleLogoutClick}
                    className="px-4 py-2 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 transition-all duration-300 font-medium"
                  >
                    Logout
                  </button>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-gray-600 hover:text-black transition-colors duration-200 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/getstarted"
                  className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200 font-medium"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;