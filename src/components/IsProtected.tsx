import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Ensure this path is correct

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authToken } = useContext(AuthContext); // Use the authToken from the context

  if (!authToken) {
    console.log('You must be signed in to access this page');
    return <Navigate to="/" replace />; // Redirect to the home page if not authenticated
  }
  console.log("You're signed in. Auth token is correct!");
  return <>{children}</>; // Render the protected component if authenticated
};

export default ProtectedRoute;
