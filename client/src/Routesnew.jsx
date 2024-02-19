import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header'; // Importing the Header component
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';
import UnhandledError from './components/UnhandledError';
import courses from "./components/Courses";





function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Header is always rendered */}
        <Route path="/" element={<Header />} />

        {/* Unprotected Routes */}
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/courses" element={<Courses />} />

        {/* Protected Routes */}
        {/* Wrapped the CreateCourse and UpdateCourse components with PrivateRoute */}
        <Route path="/courses/create" element={<PrivateRoute component={CreateCourse} />} />
        {/* Pass the courses prop to the UpdateCourse component */}
        <Route
          path="/courses/:id/update"
          element={<PrivateRoute component={(props) => <UpdateCourse {...props} courses={courses} />} />}
        />

        {/* Unprotected Routes */}
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/signout" element={<UserSignOut />} />

        {/* Error Routes */}
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/error" element={<UnhandledError />} />

        {/* Catching-all route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
