import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext';

// Protecting routes from unauthorized access by checking user authentication
function PrivateRoute({ component: Component }) {
  // Accessing user information from the AuthContext
  const { user } = useAuth();
  // Tracking loading state while authentication status is determined
  const [loading, setLoading] = useState(true);

  // Effect Hook: Updates loading state when user changes
  useEffect(() => {
    setLoading(false);
  }, [user]);

  // If still loading, return null
  if (loading) {
    return null;
  }

  // If user is authenticated, render the provided component
  if (user) {
    return <Component />;
  }

  // If user is not authenticated, redirect to sign-in page
  return <Navigate to="/signin" replace />;
}

export default PrivateRoute;
