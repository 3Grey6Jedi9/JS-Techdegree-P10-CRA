import React from 'react';
import './styles/App.css';
import AppRoutes from './Routes';
import { AuthProvider } from './AuthContext'; // Import the AuthProvider responsible for managing the authentication state of the App
import './styles/global.css';


function App() { // This defines the App component, which is the main component of your React application.
  return (
    <div className="App">
      <header className="App-header">
        <AuthProvider> {/* Wrapping the app with AuthProvider */}
          <AppRoutes /> {/* This renders the AppRoutes component, so we can display the appropriate component */}
        </AuthProvider>
      </header>
    </div>
  );
}

export default App;


/* The App component serves as the entry point of the React application. It imports necessary components, styles, and
 defines the overall application structure. By wrapping the AppRoutes component with the AuthProvider, it ensures
that all components within the application have access to the authentication state. */




