import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-6 py-24 bg-yellow-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-7xl font-serif font-bold mb-6">Stay curious.</h1>
          <p className="text-2xl text-gray-700 mb-8 max-w-xl">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
          {token ? (
            <Link
              to="/dashboard"
              className="inline-block px-8 py-3 bg-black text-white rounded-full text-xl hover:bg-gray-800"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              to="/getstarted"
              className="inline-block px-8 py-3 bg-black text-white rounded-full text-xl hover:bg-gray-800"
            >
              Start reading
            </Link>
          )}
        </div>
      </section>

      {/* Trending Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            <h2 className="text-base font-medium">Trending on Markd</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="flex gap-4">
                <div className="text-3xl font-bold text-gray-200">0{item}</div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                    <span className="text-sm">Author Name</span>
                  </div>
                  <h3 className="font-bold mb-2 hover:underline cursor-pointer">
                    A fascinating article title that catches attention
                  </h3>
                  <p className="text-sm text-gray-500">Dec 1 · 5 min read</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
