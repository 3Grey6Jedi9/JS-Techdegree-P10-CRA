import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../AuthContext.jsx"; // Importing the useAuth hook
import '../styles/courses.css'
import Header from './Header'

// Component to displaying a list of courses and a "Create New Course" button
function Courses() {
  //State to storing the list of courses
  const [courses, setCourses] = useState([]);
  const {user} = useAuth(); // Accessing the signOut function from the authentication context
  const navigate = useNavigate() // Hook to handling navigation





  // Fetching courses on component mount
  useEffect(() => {
    // Function to fetch the list of courses from your API
    async function fetchCourses() {
      try {
        // Making an API request to retrieve all courses
        const response = await axios.get('http://localhost:5001/api/courses');
        setCourses(response.data); // Updating the state with the fetch courses
      } catch (error) {
        console.error('Error fetching courses:', error);
        if(error.response.status === 500) {
          navigate('/error')
        }
      }
    }

    fetchCourses();
  }, []);











  return (
    <div className="courses-container">
       <Header /> {/* Render the Header component */}
      <ul className="courses-list">
        {courses.map((course) => (
          <li key={course.id}>
            <div className="course-box">
              <Link to={`/courses/${course.id}`}>
              <div className="course-name">Course {course.id}</div>
                  <div className="course-title">{course.title}</div>
              </Link>
            </div>
          </li>
        ))}
          <Link to="create" className="course-box">+ Create a New Course +</Link>
      </ul>
    </div>
  );
}




export default Courses;
