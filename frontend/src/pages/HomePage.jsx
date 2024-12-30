import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="px-6 py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(45%_25%_at_50%_50%,rgba(255,159,91,0.1),rgba(255,255,255,0))] z-0" />
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between relative z-10">
          <div className="md:w-1/2 space-y-8">
            <h1 className="text-6xl md:text-7xl font-serif font-bold leading-tight animate-fade-in">
              Where good ideas{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 animate-gradient bg-300%">
                find you.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-xl">
              Discover stories, thinking, and expertise from writers on any topic that inspires you.
            </p>
            <div className="pt-4">
              {token ? (
                <Link
                  to="/dashboard"
                  className="group inline-flex items-center px-8 py-4 bg-black text-white rounded-full text-xl hover:bg-gray-800 transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl shadow-black/5"
                >
                  Go to Dashboard
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              ) : (
                <Link
                  to="/getstarted"
                  className="group inline-flex items-center px-8 py-4 bg-black text-white rounded-full text-xl hover:bg-gray-800 transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl shadow-black/5"
                >
                  Start reading
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
          <div className="md:w-1/2 mb-12 md:mb-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-full blur-3xl" />
              <img
                src="/Markd.gif"
                alt="Hero illustration"
                className="relative w-full max-w-md mx-auto animate-float sm:max-w-md md:max-w-xl lg:max-w-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(255,255,255,0),rgba(0,0,0,0.02))]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Markd</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="text-gray-600 mb-6 group-hover:text-black transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_60%,rgba(255,255,255,0.1),rgba(0,0,0,0))]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Ready to start sharing your ideas?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Join our community of writers and readers today and start sharing your unique perspective with the world.
          </p>
          <Link
            to="/getstarted"
            className="inline-flex items-center px-8 py-4 bg-white text-black rounded-full text-xl hover:bg-gray-100 transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl shadow-black/5"
          >
            Get Started Now
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-white bg-black">
        <p className="text-sm font-mono">
          Made with <span className="text-red-500">❤️</span> by{" "}
          <a
            href="https://www.linkedin.com/in/harshpreet931"
            className="hover:text-gray-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
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
