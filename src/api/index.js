import axios from 'axios';

// Base URL for API calls
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include JWT token
apiClient.interceptors.request.use(
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

// Add response interceptor to handle authentication errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 (Unauthorized) or 403 (Forbidden) errors
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Clear token if it's invalid or expired
      localStorage.removeItem('bookHavenToken');
      
      // Redirect to login page if needed
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Book related API calls
export const bookAPI = {
  // Add a new book
  addBook: async (bookData) => {
    try {
      const response = await apiClient.post('/books', bookData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get all books
  getAllBooks: async () => {
    try {
      const response = await apiClient.get('/books');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get a single book by ID
  getBookById: async (id) => {
    try {
      const response = await apiClient.get(`/books/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Update a book
  updateBook: async (id, bookData) => {
    try {
      const response = await apiClient.put(`/books/${id}`, bookData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get books by category
  getBooksByCategory: async (category) => {
    try {
      const response = await apiClient.get(`/books/category/${category}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Borrow a book
  borrowBook: async (borrowData) => {
    try {
      const response = await apiClient.post('/borrow', borrowData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get borrowed books for a user
  getBorrowedBooks: async (userId) => {
    try {
      const response = await apiClient.get(`/borrowed-books/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Return a borrowed book
  returnBook: async (data) => {
    try {
      const response = await apiClient.post(`/return-book`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Category related API calls
export const categoryAPI = {
  // Get all categories
  getAllCategories: async () => {
    try {
      const response = await apiClient.get('/categories');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default {
  bookAPI,
  categoryAPI
}; 