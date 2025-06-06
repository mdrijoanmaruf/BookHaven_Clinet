import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookAPI } from '../../api';
import './UpdateBook.css';

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    rating: 0,
    image: '',
    quantity: 0,
    description: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Fetch the book details when component mounts
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const data = await bookAPI.getBookById(id);
        setBook(data);
        setImagePreview(data.image);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch book details. Please try again.');
        setLoading(false);
        console.error('Error fetching book:', err);
      }
    };
    
    fetchBook();
  }, [id]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: name === 'rating' || name === 'quantity' ? parseInt(value, 10) : value
    }));
    
    // Update image preview when image URL changes
    if (name === 'image') {
      setImagePreview(value);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setUpdating(true);
      setError(null);
      
      await bookAPI.updateBook(id, book);
      
      setSuccessMessage('Book updated successfully!');
      setUpdating(false);
      
      // Redirect after successful update with a slight delay
      setTimeout(() => {
        navigate('/all-books');
      }, 2000);
      
    } catch (err) {
      setError('Failed to update book. Please try again.');
      setUpdating(false);
      console.error('Error updating book:', err);
    }
  };
  
  // Check if image URL is valid
  const handleImageError = () => {
    setImagePreview('/placeholder-book.jpg'); // Use a placeholder image on error
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading book details...</p>
      </div>
    );
  }
  
  return (
    <div className="update-book-container">
      <div className="update-book-header">
        <h2>Update Book</h2>
        <p>Update the information for "{book.title}"</p>
      </div>
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      
      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
        </div>
      )}
      
      <div className="update-book-content">
        <div className="book-preview">
          <div className="image-preview-container">
            {imagePreview ? (
              <img 
                src={imagePreview} 
                alt="Book cover preview" 
                onError={handleImageError}
              />
            ) : (
              <div className="no-image">No Image</div>
            )}
          </div>
          
          <div className="current-details">
            <h3>Current Details</h3>
            <p><strong>Title:</strong> {book.title}</p>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Rating:</strong> {book.rating}</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="update-form">
          <div className="form-group">
            <label htmlFor="image">Book Cover Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={book.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={book.title}
              onChange={handleChange}
              placeholder="Enter book title"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="author">Author Name</label>
            <input
              type="text"
              id="author"
              name="author"
              value={book.author}
              onChange={handleChange}
              placeholder="Enter author name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="genre">Category</label>
            <select
              id="genre"
              name="genre"
              value={book.genre}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a genre</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-fiction">Non-fiction</option>
              <option value="Mystery">Mystery</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Romance">Romance</option>
              <option value="Thriller">Thriller</option>
              <option value="Biography">Biography</option>
              <option value="History">History</option>
              <option value="Children">Children</option>
              <option value="Young Adult">Young Adult</option>
              <option value="Comic">Comic</option>
              <option value="Self-Help">Self-Help</option>
              <option value="Business">Business</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="rating">Rating (1-5)</label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              value={book.rating}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="0"
              value={book.quantity}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={book.description}
              onChange={handleChange}
              placeholder="Enter book description"
              rows="4"
            ></textarea>
          </div>
          
          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate('/all-books')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={updating}
            >
              {updating ? 'Updating...' : 'Update Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook; 