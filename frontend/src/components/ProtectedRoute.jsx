import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) navigate("/signin");
      else {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify-token`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) setIsAuthenticated(true);
          else {
            localStorage.removeItem("token");
            navigate("/signin");
          }
        } catch (err) {
          console.log(err);
          localStorage.removeItem("token");
          navigate("/signin");
        }
      }
    };

    verifyToken();
  }, [navigate]);

  if (isAuthenticated == null) return null;

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
