import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NewArticle = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const handleContentChange = (value) => {
    setFormData({
      ...formData,
      content: value,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/articles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            tags: formData.tags.split(",").map((tag) => tag.trim()),
          }),
        }
      );

      if (response.ok) {
        const article = await response.json();
        navigate(`/articles/${article._id}`);
      } else {
        console.error("Failed to create article");
      }
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={handleChange}
            value={formData.title}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Enter the title"
            required
          />
        </div>

        {/* Content Input */}
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Content
          </label>
          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={handleContentChange}
            placeholder="Write your article..."
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                [
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "blockquote",
                  "code-block",
                ],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link"],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "code-block",
              "list",
              "bullet",
              "link",
            ]}
          />
        </div>

        {/* Tags Input */}
        <div className="mb-6">
          <label
            htmlFor="tags"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Tags
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            onChange={handleChange}
            value={formData.tags}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Add tags separated by commas (e.g., technology, programming)"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-6 py-3 bg-black text-white text-lg font-semibold rounded-lg hover:bg-gray-800 transition-all"
        >
          Publish Article
        </button>
      </form>
    </div>
  );
};

export default NewArticle;
