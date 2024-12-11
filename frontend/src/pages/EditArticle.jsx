import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const [loading, setLoading] = useState(true);

  const handleContentChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      content: value,
    }));
  };

  useEffect(() => {
    const fetchArticle = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/articles/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          navigate("/signin");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch article");
        }

        const article = await response.json();

        setFormData({
          title: article.title,
          content: article.content,
          tags: article.tags.join(", "),
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/articles/${id}`,
        {
          method: "PUT",
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
        navigate(`/articles/${id}`);
      } else {
        console.error("Failed to update article");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-4xl font-bold mb-8">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Edit Your Article
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
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
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              placeholder="Enter your title..."
              onChange={handleChange}
              value={formData.title}
            />
          </div>

          {/* Content */}
          <div>
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
              placeholder="Edit your story..."
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
              className="mb-6"
            />
          </div>

          {/* Tags */}
          <div>
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
            Update Article
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditArticle;
