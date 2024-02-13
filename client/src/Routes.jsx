import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Header from './components/Header'; // Importing the Header component
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component
import courses from "./components/Courses";
import Forbidden from "./components/Forbidden.jsx";
import NotFound from "./components/NotFound.jsx";
import UnhandledError from "./components/UnhandledError.jsx";


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />

        {/* Protected Routes */}
        <Route
          path="/courses"
          element={
            <PrivateRoute />
          }
        >
          {/* Using relative paths for nested routes */}
          <Route path="" element={<Courses />} /> {/* Default route */}
          <Route path="create" element={<CreateCourse />} />
          <Route path=":id/update" element={<UpdateCourse courses={courses} />} />
          <Route path=":id" element={<CourseDetail />} />
          <Route path="signout" element={<UserSignOut />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Unprotected Routes */}
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />

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



/* This component, acts as the central navigation hub for your React application.
It defines the routes that guide users to different sections of the app based on the URLs they visit.
It incorporates authentication protection for specific routes using the PrivateRoute component
It also handles various error scenarios by defining specific routes for them. */