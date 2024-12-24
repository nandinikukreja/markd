// frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleSkeleton from "../components/ArticleSkeleton";
import DOMPurify from "dompurify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [sortOption, setSortOption] = useState("latest");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [popularTags, setPopularTags] = useState([
    "Tech",
    "Science",
    "Web Development",
    "ML",
    "Sports",
  ]);

  const fetchArticles = async () => {
    if (loading) return;
    setLoading(true);
    const token = localStorage.getItem("token");
    const url = `${
      import.meta.env.VITE_API_URL
    }/api/articles?sort=${sortOption}&page=${page}&search=${searchQuery}`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      // Use a Set to track unique IDs and filter out duplicates
      setArticles((prevArticles) => {
        const existingIds = new Set(prevArticles.map((article) => article._id));
        const uniqueNewArticles = data.filter(
          (article) => !existingIds.has(article._id)
        );
        return [...prevArticles, ...uniqueNewArticles];
      });

      // Check if more articles are available
      if (data.length < 10) {
        setHasMore(false);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
    fetchArticles();
  }, [sortOption]);

  useEffect(() => {
    fetchArticles();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const scrollThreshold = document.body.offsetHeight - 100; // Reduced threshold

      if (!loading && hasMore && scrollPosition > scrollThreshold) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]); // Add loading to dependencies

  useEffect(() => {
    setPage(1);
    setArticles([]);
    fetchArticles();
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:flex-1 md:max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">Your Feed</h1>

            {/* Sort selector */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full px-4 py-2 mb-8 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="latest">Latest</option>
              <option value="most-upvotes">Most Upvotes</option>
            </select>

            {/* Loading state */}
            {loading && articles.length === 0 && (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <ArticleSkeleton key={i} />
                ))}
              </div>
            )}

            {/* Articles list */}
            <div className="space-y-6">
              {articles.map((article, index) => (
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
                        {new Date(article.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <h2
                    onClick={() => navigate(`/articles/${article._id}`)}
                    className={`text-xl font-bold mb-3 cursor-pointer hover:opacity-80 ${
                      sortOption === "most-upvotes" && index === 0
                        ? "gold-gradient"
                        : sortOption === "most-upvotes" && index === 1
                        ? "silver-gradient"
                        : sortOption === "most-upvotes" && index === 2
                        ? "bronze-gradient"
                        : ""
                    }`}
                  >
                    {sortOption === "most-upvotes" && index === 0 && "🥇 "}
                    {sortOption === "most-upvotes" && index === 1 && "🥈 "}
                    {sortOption === "most-upvotes" && index === 2 && "🥉 "}
                    {article.title}
                  </h2>

                  <div className="prose prose-sm mb-4 line-clamp-3">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(article.content),
                      }}
                      className="content-article"
                    />
                  </div>

                  {/* Tags */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, i) => (
                        <span
                          key={i}
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
          </div>
          {/* Sidebar - Search & Tags */}
          <div className="hidden lg:block w-1/3">
            <div className="sticky top-24 space-y-8">
              {/* Search Bar */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => {setSearchQuery(e.target.value); setPage(1); setArticles([]);}}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <svg
                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-bold mb-4">Popular Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(tag)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      {tag}
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
