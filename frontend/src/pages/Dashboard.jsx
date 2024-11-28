import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
    } else {
      fetch("/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          //handle response data
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [navigate]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">Dashboard</h1>
      </div>
    </>
  );
};

export default Dashboard;
