import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

const GetStarted = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = formData.password;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if(!passwordRegex.test(password)) {
      setModalMessage("Password must contain at least 8 characters, including one letter and one number.");
      setShowModal(true);
      setModalAction(null);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setModalMessage("Account created successfully! Please sign in.");
        setModalAction(() => () => navigate("/signin"));
        setShowModal(true);
      } else {
        const error = await response.json();
        setModalMessage(`Error: ${error.message}`);
        setShowModal(true);
        setModalAction(null);
      }
    } catch (error) {
      setModalMessage("Network Error.");
      setShowModal(true);
      setModalAction(null);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="min-h-[calc(100vh-76px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 shadow-lg rounded-2xl">
          <div>
            <img className="mx-auto h-12 w-auto" src="/Markd.svg" alt="Markd" />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Join Markd
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="font-medium text-black hover:text-gray-800"
              >
                Sign in
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <div>
                  <label
                    htmlFor="Name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Enter your Name"
                    onChange={handleChange}
                    value={formData.name}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
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
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="Create a password"
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-black px-4 py-2.5 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
            >
              Create account
            </button>
          </form>
        </div>
      </div>

      {showModal && (
        <Modal
          message={modalMessage}
          onClose={closeModal}
          onConfirm={modalAction}
          confirmText="Go to Sign In"
        />
      )}
    </>
  );
};

export default GetStarted;
