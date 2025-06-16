import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Providers/AuthProvider';
import Loader from '../Components/Loader';
import { useEffect, useState } from 'react';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [tokenChecked, setTokenChecked] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('bookHavenToken');
      
      if (user && token) {
        setIsValidToken(true);
      } else {
        setIsValidToken(false);
      }
      
      setTokenChecked(true);
    };

    if (!loading) {
      checkToken();
    }
  }, [user, loading]);

  if (loading || !tokenChecked) {
    return <Loader />;
  }

  if (user && isValidToken) {
    return children;
  }

  // If no token or invalid token, remove it and redirect to login
  if (!isValidToken) {
    localStorage.removeItem('bookHavenToken');
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute; 