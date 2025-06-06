import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { bookAPI } from '../../api';
import './BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const data = await bookAPI.getBookById(id);
        setBook(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch book details. Please try again.');
        setLoading(false);
        console.error('Error fetching book details:', err);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading book details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="error-container">
        <h3>Book Not Found</h3>
        <p>The book you're looking for doesn't exist or has been removed.</p>
        <Link to="/all-books" className="back-button">Back to All Books</Link>
      </div>
    );
  }

  return (
    <div className="book-details-container">
      <div className="book-details-card">
        <div className="book-details-header">
          <h1>{book.title}</h1>
          <div className="book-badges">
            <div className="book-rating-badge">
              <span className="star">★</span> {book.rating}/5
            </div>
            <div className="book-genre-badge">{book.genre}</div>
            {book.quantity > 0 ? (
              <div className={`book-stock-badge ${book.quantity <= 3 ? 'limited' : 'in-stock'}`}>
                {book.quantity <= 3 ? 'Limited Stock' : 'In Stock'}: {book.quantity}
              </div>
            ) : (
              <div className="book-stock-badge out-of-stock">Out of Stock</div>
            )}
          </div>
        </div>

        <div className="book-content">
          <div className="book-cover">
            <img 
              src={book.image} 
              alt={book.title} 
              onError={(e) => {e.target.src = '/placeholder-book.jpg'}} 
            />
          </div>
          
          <div className="book-info">
            <div className="info-section">
              <h3>Author</h3>
              <p>{book.author}</p>
            </div>
            
            <div className="info-section">
              <h3>Description</h3>
              <p className="book-description">{book.description || 'No description available for this book.'}</p>
            </div>
            
            <div className="info-section">
              <h3>Details</h3>
              <div className="book-details-grid">
                <div className="detail-item">
                  <span className="detail-label">Genre</span>
                  <span className="detail-value">{book.genre}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Rating</span>
                  <span className="detail-value">{book.rating}/5</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Available Copies</span>
                  <span className="detail-value">{book.quantity}</span>
                </div>
              </div>
            </div>
            
            <div className="book-actions">
              <Link to="/all-books" className="back-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>
                Back to Books
              </Link>
              <Link to={`/update-book/${book._id}`} className="update-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                Update Book
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails; 