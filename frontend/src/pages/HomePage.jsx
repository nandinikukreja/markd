import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between">
          <div className="md:w-1/2">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 animate-fade-in">
              Where good ideas{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600">
                find you.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-xl leading-relaxed">
              Discover stories, thinking, and expertise from writers on any
              topic that matters to you.
            </p>
            {token ? (
              <Link
                to="/dashboard"
                className="inline-block px-8 py-4 bg-black text-white rounded-full text-xl hover:bg-gray-800 transform hover:scale-105 transition-all duration-500 shadow-lg"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/getstarted"
                className="inline-block px-8 py-4 bg-black text-white rounded-full text-xl hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Start reading
              </Link>
            )}
          </div>
          <div className="md:w-1/2 mb-12 md:mb-0">
            <img
              src="/Markd.gif"
              alt="Hero illustration"
              className="w-full max-w-md mx-auto animate-float sm:max-w-md md:max-w-xl lg:max-w-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose Markd?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-gray-700 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to start sharing your ideas?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join our community of writers and readers today.
          </p>
          <Link
            to="/getstarted"
            className="inline-block px-8 py-4 bg-white text-black rounded-full text-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="font-mono font-bold py-8 text-center text-white bg-black">
        <p className="text-sm">
          Made with <span className="text-red-500">❤️</span> by{" "}
          <a
            href="www.linkedin.com/in/harshpreet931"
            className="hover:underline"
          >
            Harshpreet Singh
          </a>
        </p>
      </footer>
    </div>
  );
};

const features = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
    title: "Write Your Story",
    description:
      "Share your knowledge and experiences with a global audience through engaging articles.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    title: "Discover Ideas",
    description:
      "Explore diverse perspectives and insights from writers around the world.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Build Your Network",
    description:
      "Connect with like-minded readers and writers in your field of interest.",
  },
];

export default HomePage;
