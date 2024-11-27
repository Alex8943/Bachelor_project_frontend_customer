import React, { useContext } from 'react';
import { Navigate, Outlet} from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Ensure this path is correct

const ProtectedRoute = () => {
  const { authToken } = React.useContext(AuthContext); // Use authToken from context

  if (!authToken) {
    console.log('No auth token found. Redirecting to login...');
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Render child routes if authenticated
};

export default ProtectedRoute;
