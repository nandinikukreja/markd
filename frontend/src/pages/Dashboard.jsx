// frontend/src/pages/Dashboard.jsx
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
    fetch("/api/articles", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Articles */}
          <div className="w-full md:flex-1 md:max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">Your Feed</h1>
            {articles.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-500">No articles yet</p>
              </div>
            ) : (
              <div className="space-y-6">
                {articles.map((article) => (
                  <article
                    key={article._id}
                    className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {article.author.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium">{article.author.name}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(article.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <h2 
                      onClick={() => navigate(`/articles/${article._id}`)}
                      className="text-xl font-bold mb-3 cursor-pointer hover:text-gray-700"
                    >
                      {article.title}
                    </h2>
                    
                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {article.content}
                    </p>
                    
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="hidden md:block w-80 space-y-6">
            <div className="sticky top-20">
              {/* Search */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <input
                  type="search"
                  placeholder="Search articles..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              {/* Topics */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-bold text-lg mb-4">Popular Topics</h3>
                <div className="space-y-2">
                  {["Technology", "Programming", "Web Development", "AI", "Design"].map((topic) => (
                    <button
                      key={topic}
                      className="block w-full text-left px-4 py-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
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