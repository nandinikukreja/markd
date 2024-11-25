import React from "react";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 py-24">
      <h1 className="text-5xl font-bold mb-4 text-center">
        Stay curious.
      </h1>
      <p className="text-xl text-center mb-6">
        Discover stories, thinking, and expertise from writers on any topic.
      </p>
      <button className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800">
        Start reading
      </button>
    </div>
  );
};

export default HomePage;