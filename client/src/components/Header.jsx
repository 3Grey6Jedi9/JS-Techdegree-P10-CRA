import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx'; // Importing the useAuth hook

function Header() {
  const location = useLocation();
  const { user } = useAuth(); // Accessing user and signOut function from AuthContext
  const navigate = useNavigate();
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    // If user is not authenticated, set the redirect variable to the current path
    if (!user) {
      setRedirectPath(location.pathname);
    }
  }, [user, location.pathname]);

  // Function to render the header content based on authentication and path
  const renderHeaderContent = () => {
    // Check if the user is authenticated and the current path is '/courses'
    if (user && location.pathname === '/courses') {
      return (
        <div className="courses-header">
          <h2 className="courses-title">Courses</h2>
          <h4>Welcome, {user.firstName} {user.lastName}!</h4>
          <button onClick={handleSignOut} className="signout-button">Sign Out</button>
        </div>
      );
    } else if (!user) {
      return (
       <div className="courses-header">
          <h2 className="courses-title">Courses</h2>
          <h4></h4>
          <button onClick={handleSignUp} className="signout-button">Sign Up</button>
           <button onClick={handleSignIn} className="signout-button">Sign In</button>
        </div>
      );
    }
  };



  const handleSignOut = () => {

      navigate('/signout'); // Calling the signOut function to sign out the user

  }

  const handleSignUp = () => {

      navigate('/signup');
  }

  const handleSignIn = () => {

      navigate('/signin');
  }





  return (
    <div className="header">
      {renderHeaderContent()}
    </div>
  );
}

export default Header;
