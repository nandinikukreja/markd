import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = true; // abhi ke liye true hai

        if(!isAuthenticated) navigate("/signin");
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
