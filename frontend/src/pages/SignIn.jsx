import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // future implementation
  };

  return (
    <div className="min-h-[calc(100vh-76px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 shadow-lg rounded-2xl">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="/Markd.svg"
            alt="Markd"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/getstarted"
              className="font-medium text-black hover:text-gray-800"
            >
              Get started
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {
          /* <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-black hover:text-gray-800">
                Forgot your password?
              </a>
            </div>
          </div> */
          // for future implementation
          }

          <button
            type="submit"
            className="w-full rounded-full bg-black px-4 py-2.5 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;