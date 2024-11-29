import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
    } else {
      fetch("/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data.user);
        })
        .catch((error) => {
          console.error("Error:", error);
          navigate("/signin");
        });
    }
  }, [navigate]);

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error(err));
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Articles (Full width on mobile) */}
          <div className="w-full md:flex-1 md:max-w-2xl">
            {/* Article List */}
            {articles.map((article) => (
              <article
                key={article._id}
                className="py-6 md:py-8 border-b border-gray-200"
              >
                {/* Article content */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                  <span className="text-sm font-medium">
                    {article.author.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    · {new Date(article.createdAt).toDateString()}
                  </span>
                </div>
                <h2
                  className="text-lg md:text-xl font-bold mb-2 hover:underline cursor-pointer"
                  onClick={() => navigate(`/articles/${article._id}`)}
                >
                  {article.title}
                </h2>
                <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-2">
                  {article.content.substring(0, 150)}...
                </p>
                {/* Rest of the article card */}
              </article>
            ))}
          </div>

          {/* Right Column - Hidden on mobile */}
          <div className="hidden md:block w-80 space-y-8">
            {/* Search Bar */}
            <div className="sticky top-20">
              <input
                type="search"
                placeholder="Search..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-gray-400"
              />

              {/* Trending Topics */}
              <div className="mt-8">
                <h3 className="font-semibold mb-4">Trending Topics</h3>
                <div className="space-y-2">
                  {[
                    "Technology",
                    "Programming",
                    "Web Development",
                    "AI",
                    "Design",
                  ].map((topic) => (
                    <button
                      key={topic}
                      className="block w-full text-left px-4 py-2 rounded-full hover:bg-gray-100"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
