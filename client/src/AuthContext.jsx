import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie

// Creating an AuthContext
const AuthContext = createContext();

// Creating a custom hook to access the AuthContext
export function useAuth() {
  return useContext(AuthContext); // This will allow components to access the context values provided by the AuthProvider.
}

// Creating an AuthProvider component
export function AuthProvider({ children, password }) { // Wrapping other components with its context
  const [user, setUser] = useState(null);
  const [storedPassword, setStoredPassword] = useState('');
  const [redirectPath, setRedirectPath] = useState('/courses');


  useEffect(() => {
    // Checking if user data is stored in cookies
    const userData = Cookies.get('userData');

    if (userData) {
      // If user data exists in cookies, parse and set the user state
      setUser(JSON.parse(userData));
      setStoredPassword(password)
    }
  }, [password]);

  const signIn = (userData, userPassword) => {
    // Implementing sign-in logic and set the user state
    setUser(userData);
    setStoredPassword(userPassword);

    // Storing user data in cookies when signed in
    Cookies.set('userData', JSON.stringify(userData), { expires: 7 }); // Setting an expiration date if needed
  };

  const signOut = () => {
    // Implementing sign-out logic and clear the user state
    setUser(null);
    setStoredPassword('');

    // Remove user data from cookies when signed out
    Cookies.remove('userData');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, password: storedPassword, redirectPath, setRedirectPath }}>
      {children}
    </AuthContext.Provider>
  );
}


// This file manages authentication state and functions within