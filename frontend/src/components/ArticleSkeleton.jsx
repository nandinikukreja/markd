const ArticleSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        {/* Author avatar skeleton */}
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div className="space-y-2">
          {/* Author name skeleton */}
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          {/* Date skeleton */}
          <div className="h-3 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
      {/* Title skeleton */}
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
      {/* Content skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
      {/* Tags skeleton */}
      <div className="flex gap-2">
        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
      </div>
    </div>
  );
};

export default ArticleSkeleton;