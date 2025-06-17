import { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup 
} from 'firebase/auth';
import app from '../Firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// API URL
const API_URL = 'https://book-haven-server-zeta.vercel.app';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to store JWT token
  const storeToken = async (currentUser) => {
    try {
      // Get token from the server
      const response = await axios.post(`${API_URL}/api/jwt`, {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName || '',
        photoURL: currentUser.photoURL || ''
      });
      
      if (response.data.token) {
        // Store token in localStorage
        localStorage.setItem('bookHavenToken', response.data.token);
        return response.data.token;
      }
    } catch (error) {
      console.error('Error storing token:', error);
    }
  };

  // Create axios instance with authorization header
  const axiosSecure = axios.create({
    baseURL: API_URL,
  });

  // Add interceptor to add token to requests
  useEffect(() => {
    const interceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('bookHavenToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(interceptor);
    };
  }, [axiosSecure]);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await storeToken(result.user);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const googleSignIn = async () => {
    // setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await storeToken(result.user);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const githubSignIn = async () => {
    // setLoading(true);
    try {
      const result = await signInWithPopup(auth, githubProvider);
      await storeToken(result.user);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name || '',
      photoURL: photo || '',
    }).then(() => {
      // Force a refresh to get the updated user data
      setUser({ ...auth.currentUser });
      // Update JWT token with new user data
      if (auth.currentUser) {
        storeToken(auth.currentUser);
      }
      return Promise.resolve();
    }).catch((error) => {
      return Promise.reject(error);
    });
  };

  const logOut = () => {
    setLoading(true);
    // Remove token from localStorage
    localStorage.removeItem('bookHavenToken');
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      // If user exists, get and store JWT token
      if (currentUser) {
        await storeToken(currentUser);
      }
      
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    auth,
    createUser,
    signIn,
    googleSignIn,
    githubSignIn,
    logOut,
    updateUserProfile,
    axiosSecure,
    storeToken,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider; 