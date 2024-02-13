import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext';


//Protecting routes from unauthorized access by checking user authentication
function PrivateRoute() {
  // Accessing user information from the AuthContext
  const { user } = useAuth();
  // Tracking loading state while authentication status is determined
  const [loading, setLoading] = useState(true);

  // Effect Hook: Updates loading state when user changes
  useEffect(() => {
    setLoading(false);
  }, [user]);

  if (loading) {
    return null;
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace /> // If user is not authenticated, redirect to login page
  );
}

export default PrivateRoute;
