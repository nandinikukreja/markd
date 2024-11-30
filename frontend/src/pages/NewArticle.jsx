import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewArticle = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map((tag) => tag.trim()),
        }),
      });

      if (response.ok) {
        const article = await response.json();
        navigate(`/articles/${article._id}`);
      } else {
        const err = await response.json();
        console.log(err);
      }
    } catch (err) {
      console.log("Network err:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Write Your Story</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-lg font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              placeholder="Enter your title..."
              onChange={handleChange}
              value={formData.title}
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-lg font-semibold text-gray-700 mb-2">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              rows="12"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              placeholder="Tell your story..."
              onChange={handleChange}
              value={formData.content}
            ></textarea>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-lg font-semibold text-gray-700 mb-2">
              Tags
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              placeholder="Add tags separated by commas (e.g. technology, programming, web)"
              onChange={handleChange}
              value={formData.tags}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-black text-white text-lg font-semibold rounded-lg hover:bg-gray-800 transform hover:scale-[1.02] transition-all duration-200"
          >
            Publish Story
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewArticle;