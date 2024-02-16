import React, { useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext.jsx'; // Access authentication context
import ReactMarkdown from 'react-markdown';
import '../styles/courses.css' // Include relevant styles
import '../styles/coursedetail.css' // Include specific styles



// Defining the CourseDetail component
function CourseDetail() {
    // Track course data, course ID, and authentication state
  const [course, setCourse] = useState(null);
  const { id } = useParams();
  const { user, signOut } = useAuth(); // Accessing the authenticated user and signOut function
  const [isCourseOwner, setIsCourseOwner] = useState(true); // State to track if the user is the course owner
  const [OwnerData, setOwnerData] = useState(null); // State to see who is the course owner

    const navigate = useNavigate();





    useEffect(() => {
    // Function to fetching the course details from your API
    async function fetchCourseDetail() {
      try {
        const response = await axios.get(`http://localhost:5001/api/courses/${id}`);
        if (response.status === 200) {
          const data = response.data;
          setCourse(data);
          // Checking if the authenticated user's ID matches the course owner's ID
          setIsCourseOwner(user && user.id === data.userId);
          // If not the course owner, fetching user data associated with the course
        if (!isCourseOwner) {
            //Asking for password before executing the request (since we didn't store the plain password)
        const userPassword = window.prompt('Enter your password to see a course created by other user:');
  if (!userPassword) {
    // User canceled the prompt
    return;
  }
   const authString = `${user.emailAddress}:${userPassword}`;
   const base64AuthString = btoa(authString);
   const authHeaderValue = `Basic ${base64AuthString}`;
          const userResponse = await axios.get(`http://localhost:5001/api/courses/${data.userId}`, {
        headers: {
          Authorization: authHeaderValue,
        },
      });
          if (userResponse.status === 200) {
            const userData = userResponse.data;
            setOwnerData(userData);
          }
        }
      } else {

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
    }

    fetchCourseDetail();
  }, [id, user, isCourseOwner]); // Fetching details when the 'id' parameter changes or when the user changes or the course owner













// This function will define the DELETE button action
  const handleDeleteCourse = async () => {

      // Using window.prompt() to ask for the password
  const userPassword = window.prompt('Enter your password to delete the course:');
  if (!userPassword) {
    // User canceled the prompt
    return;
  }
   const authString = `${user.emailAddress}:${userPassword}`;
   const base64AuthString = btoa(authString);
   const authHeaderValue = `Basic ${base64AuthString}`;


   try {
  const response = await axios.delete(`http://localhost:5001/api/courses/${id}`, {
    headers: {
      Authorization: authHeaderValue,
    },
  });

  if (response.status >= 200 && response.status < 400) {
    // Course deleted successfully, navigate to the courses list
    navigate('/courses');
  } else {
    console.error(`Network response was not ok. Status: ${response.status}`);
    if (response.status === 500) {
      navigate('/error')
    }
  }
} catch (error) {
  console.error('Error deleting course:', error);
  if(error.response.status === 500) {
    navigate('/error')
  }
}
  };







  // Handling the user SIGN OUT button action
  const handleSignOut = () => {
    signOut();
  };








  return (
      <div className="detail-container">
      <div className="courses-header">
         <h2 className="courses-title">Course Detail</h2>
         <h4>I hope you like this course, {user.firstName} {user.lastName}!</h4>
        <button onClick={handleSignOut} className="signout-button">Sign Out</button>
    </div>
        {user && isCourseOwner && (
            <div className="detail-header-buttons">
              <Link to="/courses" className="signout-button">Go back to Courses</Link>
              <button onClick={handleDeleteCourse} className="delete">Delete Course</button>
              <Link to="update" className="signout-button">Update Course</Link>
            </div>
          )}
    <div>
      {course ? (
        <div className="content-container">
  <div className="left-column">
    <div className="title-container">
    <h3>Title:</h3>
    <h3 className="sectiontitle">{course.title}</h3>
      </div>
 {isCourseOwner ? (
  <h2 className="author">By {user.firstName} {user.lastName}</h2>
) : (
  <h2 className="author">By {OwnerData && OwnerData.User.firstName} {OwnerData && OwnerData.User.lastName}</h2>
)}

    <h3>Course Description</h3>
    <ReactMarkdown className="section">{course.description}</ReactMarkdown>
  </div>
  <div className="right-column">
    <div className="materials-container">
    <h3 className="materials-title">Materials</h3>
    <ReactMarkdown className="section">{course.materialsNeeded}</ReactMarkdown>
      </div>
    <h3>Duration</h3>
    <ReactMarkdown className="section">{course.estimatedTime}</ReactMarkdown>
  </div>
</div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
      </div>
  );
}

export default CourseDetail;
