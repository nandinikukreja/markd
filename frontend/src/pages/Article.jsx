import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import Modal from "../components/Modal";

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [sanitizedContent, setSanitizedContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch the article");
        }
        return response.json();
      })
      .then((data) => {
        setArticle(data);
        const sanitized = DOMPurify.sanitize(data.content);
        setSanitizedContent(sanitized);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [id]);

  const handleUpvote = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/articles/${id}/upvote`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const updatedArticle = await response.json();
        setArticle((article) => ({
          ...article,
          upvotes: updatedArticle.upvotes,
        }));
      } else if (response.status === 400) {
        setModalMessage("Article already upvoted!");
        setShowModal(true);
      } else {
        console.error("Failed to upvote");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleDownvote = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/articles/${id}/downvote`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const updatedArticle = await response.json();
        setArticle((article) => ({
          ...article,
          upvotes: updatedArticle.upvotes,
        }));
      } else if (response.status === 400) {
        setModalMessage("Article not upvoted yet!");
        setShowModal(true);
      } else {
        console.error("Failed to downvote");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 animate-pulse space-y-8">
          {/* Title skeleton */}
          <div className="h-10 sm:h-14 bg-gray-200 rounded-xl w-3/4"></div>

          {/* Author info skeleton */}
          <div className="flex items-center gap-4 border-b border-gray-100 pb-8">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          </div>

          {/* Content skeleton */}
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Article not found
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8">
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            {article.title}
          </h1>

          {/* Author info */}
          <div className="flex items-center gap-4 border-b border-gray-100 pb-8">
            <div
              onClick={() => navigate(`/users/${article.author._id}`)}
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl font-medium text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors"
            >
              {article.author.name.charAt(0)}
            </div>
            <div className="space-y-1">
              <h3
                onClick={() => navigate(`/users/${article.author._id}`)}
                className="font-medium text-gray-900 cursor-pointer hover:text-gray-700"
              >
                {article.author.name}
              </h3>
              <p className="text-sm text-gray-500">
                {new Date(article.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none prose-pre:bg-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-headings:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-500">
            <div
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              className="ql-editor"
            />
          </div>

          {/* Tags and Actions */}
          <div className="pt-8 border-t border-gray-100 space-y-6">
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4">
              <button
                onClick={handleUpvote}
                className="px-6 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full hover:from-gray-900 hover:to-black transition-all duration-300 flex items-center gap-2 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 transform group-hover:scale-110 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
                <span>Upvote • {article.upvotes}</span>
              </button>
              <button
                onClick={handleDownvote}
                className="px-6 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full hover:from-gray-900 hover:to-black transition-all duration-300 flex items-center gap-2 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 transform group-hover:scale-110 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <span>Downvote</span>
              </button>

              {article.author._id === localStorage.getItem("userId") && (
                <button
                  onClick={() => navigate(`/edit-article/${article._id}`)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <span>Edit Article</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </article>

      {showModal && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default Article;
