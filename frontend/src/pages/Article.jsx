import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`/api/articles/${id}`)
      .then((response) => response.json())
      .then((data) => setArticle(data))
      .catch((error) => console.error("Error:", error));
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        <span className="text-sm font-medium">{article.author.name}</span>
        <span className="text-sm text-gray-500">· {new Date(article.createdAt).toDateString()}</span>
      </div>
      <div className="prose">
        {article.content}
      </div>
    </div>
  );
};

export default Article;