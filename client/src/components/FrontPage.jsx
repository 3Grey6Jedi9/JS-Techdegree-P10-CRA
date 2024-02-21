import React from 'react';
import { Link } from 'react-router-dom'; // For navigation links
import Courses_Library from '../assets/Courses_Library.jpeg'; // Importing main logo image

function FrontPage({ authenticatedUser, signOut }) { // Defining the FrontPage component
  return (
    <div className="header header--flex full-screen-header">
      <div className="bounds wrap">
        <img src={Courses_Library} className="header-logo-image" alt="logo" />
        <h1 className="header--logo">Courses Library</h1>
        <nav>
          {authenticatedUser ? (
            <ul className="header--signedin">
              <li>Welcome, {authenticatedUser.firstName}!</li>
              <li>
                <Link className="signout button custom-button" to="/signout" onClick={signOut}>
                  Sign Out
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="header--signedout">
              <li>
                <Link className="signup button custom-button" to="/signup">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link className="signin button custom-button" to="/signin">
                  Sign In
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
}


// Exporting the component for use in other parts of the app
export default FrontPage;
