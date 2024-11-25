import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="flex items-center justify-between p-4 bg-white shadow">
        <div className="text-2xl font-bold">
          <Link to="/">Logo</Link>
        </div>
        <div className="space-x-4">
          <Link to="/signin" className="text-gray-600 hover:text-gray-800">
            Sign In
          </Link>
          <Link
            to="/getstarted"
            className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800"
          >
            Get Started
          </Link>
        </div>
      </nav>
    )
}

export default NavBar;