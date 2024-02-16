import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // For navigation and routing
import axios from 'axios'; // For making API requests
import {useAuth} from "../AuthContext.jsx"; // Hook for authentication context
import '../styles/update.css' // Importing custom styles
import '../styles/courses.css' // Importing custom styles



// Function component for handling updating an existing course
function UpdateCourse({ courses }) {
  // Navigation hooks and routing parameters
  const navigate = useNavigate();
  const { id } = useParams();
  // Authentication context
  const {signOut, user} = useAuth();
  // State for storing validation errors
  const [validationErrors, setValidationErrors] = useState([]);








  // Initializing the state with values from the selected course
  const [updatedCourse, setUpdatedCourse] = useState({
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
  });




  //Fetching course details on component mount
  useEffect(() => {
    fetchCourseDetail();
  }, [id]);




  // Function for fetching course details from the API
  const fetchCourseDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/courses/${id}`);
      if (response.status === 200) {
        const data = response.data;
        setUpdatedCourse(data);
        // Cheking authorization
      if (user.id !== data.userId) {
        navigate('/forbidden'); // Unauthorized access
      }
      } else {
        // Handling different error scenarios based on status codes
        console.error(`Network response was not ok. Status: ${response.status}`);
        if (response.status === 404){
            navigate('/notfound')
          } else if(response.status === 403) {
            navigate('/forbidden')

          } else {

            navigate('/error')
          }
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
      if (error.response.status === 404){
            navigate('/notfound')
          } else if(error.response.status === 403) {
            navigate('/forbidden')

          } else {

            navigate('/error')
          }
    }
  };






  // Handling input changes for course details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCourse({
      ...updatedCourse,
      [name]: value,
    });
  };

  // Handling form submission (updating course)
  const handleSubmit = async (e) => {

        e.preventDefault();

    const userPassword = window.prompt('Enter your password to update the course:');
  if (!userPassword) {
    // User canceled the prompt
    return;
  }
   const authString = `${user.emailAddress}:${userPassword}`;
   const base64AuthString = btoa(authString);
   const authHeaderValue = `Basic ${base64AuthString}`;


    try {
  const response = await axios.put(`http://localhost:5001/api/courses/${id}`, updatedCourse, {
    headers: {
      Authorization: authHeaderValue,
      'Content-Type': 'application/json',
    },
  });
  if (response.status >= 200 && response.status < 400) {
    // Successful update, navigate to the course detail page
    navigate(`/courses/${id}`);
  } else {
    console.error(`Network response was not ok. Status: ${response.status}`);
    if (response.status === 500) {
      navigate('/error')
    }
  }
} catch (error) {
      if (error.response && error.response.status === 400) {
        // Validation errors returned from the API
        setValidationErrors(error.response.data.errors);
      }
  console.error('Error updating course:', error);
  if(error.response.status === 500) {
    navigate('/error')
  }
}


  };





  const handleCancel = () => {
    // Redirect the user to the course detail page
    navigate(`/courses/${id}`);
  };




  const handleSignOut = () => {
    signOut(); // Calling the signOut function.

  }







  return (
    <div className="courses-container">
      <div className="update-header">
        <h2 className="courses-title">Update Course</h2>
        <h4>Is there something you wish to change {user.firstName} {user.lastName}?</h4>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      {validationErrors.length > 0 && (
    <div className="validation--errors">
      <h3>Validation Errors</h3>
      <ul>
        {validationErrors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  )}
      <form onSubmit={handleSubmit} className="form-container">
        <div className="left-column">
          <label htmlFor="title" className="label-title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={updatedCourse.title}
            onChange={handleInputChange}
          />
          <h2 className="author">By {user.firstName} {user.lastName}</h2>
        </div>
        <div className="right-column">
          <label htmlFor="estimatedTime" className="label-estimatedTime">Estimated Time</label>
          <input
            type="text"
            id="estimatedTime"
            name="estimatedTime"
            value={updatedCourse.estimatedTime}
            onChange={handleInputChange}
          />
        </div>
        <div className="left-column">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={updatedCourse.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="right-column">
          <label htmlFor="materialsNeeded">Materials Needed</label>
          <textarea
            id="materialsNeeded"
            name="materialsNeeded"
            value={updatedCourse.materialsNeeded}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Update Course</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateCourse;

