import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


// Function component for handling user sign-out
function UserSignOut({ signOut }) {
  // Getting the navigation hook
  const navigate = useNavigate();


  useEffect(() => {
    // Calling the signOut function to sign out the user
    signOut();

    // Redirecting the user to the default route (list of courses)
    navigate('/', { replace: true });
  }, [signOut]); // Running the effect only when signOut or navigate changes

  return null; // Returning null since the component focused on actions rather than rendering UI
}

export default UserSignOut;
