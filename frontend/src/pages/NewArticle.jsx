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
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Write a New Article</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="mt-1 block w-full border px-3 py-2 rounded"
            onChange={handleChange}
            value={formData.title}
          />
        </div>
        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block text-lg font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows="10"
            required
            className="mt-1 block w-full border px-3 py-2 rounded"
            onChange={handleChange}
            value={formData.content}
          ></textarea>
        </div>
        {/* Tags */}
        <div>
          <label
            htmlFor="tags"
            className="block text-lg font-medium text-gray-700"
          >
            Tags (comma separated)
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            className="mt-1 block w-full border px-3 py-2 rounded"
            onChange={handleChange}
            value={formData.tags}
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default NewArticle;