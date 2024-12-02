import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-4 sm:py-8 px-4 sm:px-6 animate-pulse">
        <div className="h-8 sm:h-12 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
        <div className="flex items-center gap-2 mb-6 sm:mb-8">
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          <div className="h-4 bg-gray-200 rounded w-16 sm:w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-24 sm:w-32"></div>
        </div>
        <div className="space-y-3 sm:space-y-4">
          <div className="h-3 sm:h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-3 sm:h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Article not found
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            The article you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-12 px-4 sm:px-6">
      <article className="prose prose-sm sm:prose-lg mx-auto w-full overflow-hidden">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-gray-900 break-words">
          {article.title}
        </h1>

        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 border-b border-gray-100 pb-6 sm:pb-8">
          <div
            onClick={() => navigate(`/users/${article.author._id}`)}
            className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium cursor-pointer"
          >
            {article.author.name.charAt(0)}
          </div>
          <div
            onClick={() => navigate(`/users/${article.author._id}`)}
            className="flex flex-col cursor-pointer"
          >
            <span className="text-sm sm:text-base font-medium text-gray-900">
              {article.author.name}
            </span>
            <span className="text-xs sm:text-sm text-gray-500">
              {new Date(article.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="prose prose-sm sm:prose-lg prose-gray mx-auto">
          {article.content.split("\n").map(
            (paragraph, index) =>
              paragraph && (
                <p
                  key={index}
                  className="mb-4 text-gray-800 leading-relaxed break-words text-sm sm:text-base"
                >
                  {paragraph}
                </p>
              )
          )}
        </div>

        {article.tags && article.tags.length > 0 && (
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default Article;
