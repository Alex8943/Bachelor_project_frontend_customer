import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const authToken = sessionStorage.getItem("authToken");
  const storedName = sessionStorage.getItem("userName");
  const storedEmail = sessionStorage.getItem("userEmail");
  const storedRoleName = sessionStorage.getItem("userRoleName");
  const storedUserId = sessionStorage.getItem("userId");

  // Perform the check synchronously during render
  const isAuthenticated = authToken && storedName && storedEmail && storedRoleName && storedUserId;
  const hasValidInfo = storedName !== "Guest" && storedEmail !== "Unknown" && storedRoleName !== "Unknown";

  if (!isAuthenticated || !hasValidInfo) {
    console.log("Redirecting to login...");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;  // Render protected route children if authenticated
};

export default ProtectedRoute;
