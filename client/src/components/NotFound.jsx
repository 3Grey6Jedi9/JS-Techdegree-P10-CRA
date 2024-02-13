import React from 'react';
import Dog from "../assets/notfound.jpeg"; // Importing the "not found" image
import '../styles/error.css' // Importing the error styles



// Function component for displaying a "404 Not Found" error message
function NotFound() {
  return (
      <div className="container">
      <img src={Dog} className="" alt="notfound" />
    <div className="error">
      <h1>404 - Not Found</h1>
      <p>The requested page can't be found.</p>
        <p>You should verify the URL.</p>
    </div>
          </div>
  );
}

export default NotFound




