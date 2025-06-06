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
  }
};

export default {
  bookAPI
}; 