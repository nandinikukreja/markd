import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [articles, setArticles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", bio: "" });
  const [confirmDelete, setConfirmDelete] = useState(null);
  const loggedInUserId = localStorage.getItem("userId");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/signin");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          setUserData(data.user);
          setArticles(data.articles);
          setFormData({ name: data.user.name, bio: data.user.bio || "" });
        }
      })
      .catch((err) => console.error(err));
  }, [id, navigate]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        setUserData(updatedUser);
        setIsEditing(false);
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteClick = (articleId) => {
    if (confirmDelete === articleId) {
      deleteArticle(articleId);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(articleId);

      setTimeout(() => {
        setConfirmDelete(null);
      }, 5000);
    }
  };

  const deleteArticle = (articleId) => {
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}/api/articles/${articleId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          setArticles(articles.filter((article) => article._id !== articleId));
        } else {
          console.error("Failed to delete the article");
        }
      })
      .catch((err) => console.error(err));
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
          <div className="h-6 bg-gray-200 rounded w-48"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        {isEditing ? (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Bio
              </label>
              <textarea
                name="bio"
                id="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={handleEditToggle}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            <div className="flex items-center">
              <div className="w-16 h-16 md:w-12 md:h-12 rounded-full bg-gray-200 hidden md:flex items-center justify-center text-gray-700 font-bold text-2xl md:text-xl">
                {userData.name.charAt(0)}
              </div>
              <div className="mt-4 md:mt-0 md:ml-4 md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {userData.name}
                </h1>
                <p className="text-gray-600 max-w-2xl break-words">
                  {userData.bio || "No bio yet"}
                </p>
              </div>
            </div>
            {loggedInUserId === id && (
              <button
                onClick={handleEditToggle}
                className="mt-4 md:mt-0 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
        )}
      </div>

      {/* Articles Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Articles</h2>
        <div className="space-y-8">
          {articles.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No articles yet</p>
          ) : (
            articles.map((article) => (
              <article
                key={article._id}
                className="relative border-b border-gray-100 last:border-0 pb-12 last:pb-0"
              >
                {loggedInUserId === id && (
                  <>
                    <button
                      onClick={() => handleDeleteClick(article._id)}
                      className={`absolute bottom-0 right-0 pb-2 rounded-full text-gray-400 hover:text-red-600 transition-all duration-300 ${
                        confirmDelete === article._id
                          ? "opacity-100"
                          : "opacity-50"
                      }`}
                    >
                      {confirmDelete === article._id ? "Confirm?" : "Delete"}
                    </button>
                    <button
                      onClick={() => navigate(`/edit-article/${article._id}`)}
                      className="absolute bottom-0 right-0 pb-2 mr-16 rounded-full text-gray-400 hover:text-blue-600 transition-all duration-300"
                    >
                      Edit
                    </button>
                  </>
                )}

                <h3
                  onClick={() => navigate(`/articles/${article._id}`)}
                  className="text-xl font-bold mb-3 cursor-pointer hover:underline transition-all"
                >
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 break-words line-clamp-2">
                  {article.content}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    {new Date(article.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
