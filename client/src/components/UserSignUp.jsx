import React, { useState } from 'react';
import axios from 'axios'; // Importing Axios for making API requests
import { useNavigate } from 'react-router-dom'; // For navigation
import { useAuth } from '../AuthContext.jsx'; // Accessing authentication context
import '../styles/signup.css' // Importing custom styles
import Rabbit from "../assets/signup.jpeg";


// Function component for user sign-up
function UserSignUp(props) {
  // State variables for user input and validation errors
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState([]); // State to store validation errors


  // Accessing navigation hook and signIn function from context
  const navigate = useNavigate();
  const { signIn } = useAuth();



  // Handling input changes for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Updating respective state based on input name
    if (name === 'firstName') {
      setFirstName(value);
    } else if (name === 'lastName') {
      setLastName(value);
    } else if (name === 'emailAddress') {
      setEmailAddress(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };






  // Handling form submission (sign-up)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing default form submission

    // Checking password match
    if (password !== confirmPassword) {
      alert('Password and confirm password do not match.');
      return;
    }

    try {
      // Making a POST request to create a new user
      const response = await axios.post('http://localhost:5001/api/users', {
        firstName,
        lastName,
        emailAddress,
        password,
      }, {
        headers: {
          Authorization: 'Basic joe@smith.com:joepassword',
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        // Successful user registration, you can redirect to a protected route or sign in the user
        signIn(response.data);
        navigate('/signin');
      } else {
        console.error(`User registration failed. Status: ${response.status}`);
        if (response.status === 500) {
          navigate('/error')
        }
        if (response.data.errors) {
          setValidationErrors(response.data.errors); // Setting the validation errors in state
        }
      }
    } catch (error) {
       if (error.response && error.response.status === 400) {
        // Validation errors returned from the API
        setValidationErrors(error.response.data.errors);
      }
      console.error('Error during user registration:', error);
      if(error.response.status===500){
        navigate('/error')
      }
    }
  };






  const handleCancel = () => {
    // Redirecting the user to the default route (FrontPage)
    navigate('/');
  };








  return (
    <div className="user-signup-container">
      <img src={Rabbit} className="user-signup-logo" alt="signup" />
      <h2>Sign Up</h2>
      {validationErrors.length > 0 && ( // Displaying validation errors if there are any
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={handleInputChange}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={handleInputChange}
        />
        <label htmlFor="emailAddress">Email Address:</label>
        <input
          type="email"
          id="emailAddress"
          name="emailAddress"
          value={emailAddress}
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleInputChange}
        />
        <button className="button" type="submit">Sign Up</button>
        <button className="button" type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
      <p>Already have a user account? Click here to <a href="signin">sign in</a>!</p>
    </div>
  );
}

export default UserSignUp;
