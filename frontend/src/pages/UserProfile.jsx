import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [articles, setArticles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", bio: "" });
  const loggedInUserId = localStorage.getItem("userId");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`/api/users/${id}`, {
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

    fetch(`/api/users/${id}`, {
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

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {isEditing ? (
        <div className="mb-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full mb-4 border px-3 py-2 rounded"
          />
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="block w-full mb-4 border px-3 py-2 rounded"
            rows="4"
            placeholder="Tell us about yourself..."
          ></textarea>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-black text-white rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={handleEditToggle}
            className="px-4 py-2 bg-gray-300 text-black rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">{userData.name}</h1>
          <p className="text-gray-600 mb-4">{userData.bio}</p>
          {loggedInUserId === id && (
            <button
              onClick={handleEditToggle}
              className="px-4 py-2 bg-black text-white rounded"
            >
              Edit Profile
            </button>
          )}
        </div>
      )}

      {/* User's Articles */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">Articles</h2>
      <div className="space-y-6">
        {articles.map((article) => (
            <div key={article._id} className="mb-4">
            <h3
                onClick={() => navigate(`/articles/${article._id}`)}
                className="text-xl font-bold cursor-pointer hover:underline"
            >
                {article.title}
            </h3>
            <p className="text-gray-600 break-words overflow-hidden">
                {article.content.substring(0, 100)}...
            </p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;