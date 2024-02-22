import React from 'react';
import AngryQueen from '../assets/forbidden.jpeg' // Importing the forbidden image
import '../styles/error.css' // Importing the error styles



// Function component for displaying a "403 Forbidden" error message
function Forbidden() {
  return (
        <div className="forbcontainer">
      <img src={AngryQueen} className="" alt="forbidden" />
    <div className="error">
      <h1>403 - Forbidden</h1>
      <p>You don't have permission to access the requested page.</p>
    </div>
            </div>
  );
}


export default Forbidden

