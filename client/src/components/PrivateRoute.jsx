import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';



// Protecting routes from unauthorized access by checking user authentication
function PrivateRoute({ component: Component }) {
  const { user, setRedirectPath } = useAuth();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Immediately set loading to false once user info is checked
    setLoading(false);

    if (!user) {
      // Setting the redirect path only if the user is not authenticated
      setRedirectPath(location.pathname);
    }
  }, [user, location.pathname, setRedirectPath]);

  // If still loading, return null to indicate nothing is being rendered yet
  if (loading) {
    return null;
  }

  // If user is authenticated, render the provided component
  if (user) {
    return <Component />;
  } else {
    // If user is not authenticated, redirect to sign-in page
    // No need to set redirect path here as it's been set in useEffect
    return <Navigate to="/signin" replace />;
  }
}

export default PrivateRoute;
