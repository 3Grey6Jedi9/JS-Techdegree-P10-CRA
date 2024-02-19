import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../AuthContext.jsx";
import '../styles/createcourse.css'

// Component to create a new course
function CreateCourse() { // Receiving password as a prop
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const { signOut, user, password } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'description') {
      setDescription(value);
    } else if (name === 'estimatedTime') {
      setEstimatedTime(value);
    } else if (name === 'materialsNeeded') {
      setMaterialsNeeded(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authString = `${user.emailAddress}:${password}`;
    const base64AuthString = btoa(authString);
    const authHeaderValue = `Basic ${base64AuthString}`;

    try {
      const response = await axios.post('http://localhost:5001/api/courses', {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        userId: user.id,
      }, {
        headers: {
          Authorization: authHeaderValue,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        const newCourseId = response.data.id;
        navigate(`/courses/${newCourseId}`);
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
      } else {
        console.error('Error creating course:', error);
         if(error.response.status === 500) {
    navigate('/error')
  }
      }
    }
  };

  const handleCancel = () => {
    navigate('/courses');
  };

  const handleSignOut = () => {
        navigate('/signout');

  };

  return (
    <div className="create-course-container">
      <div className="create-header">
        <h2>Create Course</h2>
        <button onClick={handleSignOut} className="create-signout">Sign Out</button>
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
      <form onSubmit={handleSubmit} className="create-form">
        <div className="smaller-input">
          <label htmlFor="title" className="create-label">Course Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleInputChange}
          />
          <h2 className="author">By {user.firstName} {user.lastName}</h2>
        </div>
        <div>
          <label htmlFor="estimatedTime" className="create-label">Estimated Time</label>
          <input
            type="text"
            id="estimatedTime"
            name="estimatedTime"
            value={estimatedTime}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description" className="create-label">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="materialsNeeded" className="create-label">Materials Needed</label>
          <textarea
            id="materialsNeeded"
            name="materialsNeeded"
            value={materialsNeeded}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Create Course</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCourse;
