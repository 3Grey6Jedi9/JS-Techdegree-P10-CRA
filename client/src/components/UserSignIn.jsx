import React, { useState } from 'react';
import axios from 'axios'; // Importing Axios for making API request
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx'; // Accessing authentication context
import AliceDoor from '../assets/signin.png';
import '../styles/signin.css'; // Importing custom styles



// Function component for user sign-in
function UserSignIn(props) {
  // State variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, redirectPath, setRedirectPath } = useAuth(); // Accessing signIn function from context
  const navigate = useNavigate();


  // Handling input changes for email and password field
  const handleInputChange = (e) => {
    // Updating respective state based on input name
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  // Handling form submission (sign-in)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Making an API request to authenticate the user
      // Creating authentication header for API request
      const authString = `${email}:${password}`;
      const base64AuthString = btoa(authString); // Encoding credentials to Base64
      // Sending API request to authenticate user
      const response = await axios.get('http://localhost:5001/api/users', {
        headers: {
          Authorization: `Basic ${base64AuthString}`,
        },
      });

      if (response.status === 200) {
        signIn(response.data, password);
        navigate(redirectPath)
        setRedirectPath('/courses')

      } else {
        console.error(`Authentication failed. Status: ${response.status}`);
        if (response.status === 500) {
          navigate('/error');
        }
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      if (error.response.status === 500) {
        navigate('/error');
      }
    }
  };

  const handleCancel = () => {
    // Redirecting the user to the default route (FrontPage)
    navigate('/');
  };

  return (
    <div className="user-signin-container">
      <img src={AliceDoor} className="user-signin-logo" alt="signin" />
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" name="email" value={email} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={handleInputChange} required />
        </div>
        <div>
          <button type="submit" className="user-signin-button">
            Sign In
          </button>
          <button type="button" onClick={handleCancel} className="user-signin-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserSignIn;
