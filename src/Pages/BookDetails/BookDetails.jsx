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
        <h3>Something went wrong</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          Try Again
        </button>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="error-container">
        <h3>Book Not Found</h3>
        <p>The book you're looking for doesn't exist or has been removed.</p>
        <Link to="/all-books" className="back-button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
          Back to Library
        </Link>
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
              <span className="star">★</span> {book.rating}/5 Rating
            </div>
            <div className="book-genre-badge">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V7.621a1.5 1.5 0 0 0-.44-1.06l-4.12-4.122A1.5 1.5 0 0 0 11.378 2H4.5ZM10 8a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5A.75.75 0 0 1 10 8Z" clipRule="evenodd" />
              </svg>
              {book.genre}
            </div>
            {book.quantity > 0 ? (
              <div className={`book-stock-badge ${book.quantity <= 3 ? 'limited' : 'in-stock'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                  <path d="M1 1.75A.75.75 0 0 1 1.75 1h1.628a1.75 1.75 0 0 1 1.734 1.51L5.18 3a65.25 65.25 0 0 1 13.36 1.668.75.75 0 0 1 .58.91 62.281 62.281 0 0 1-2.33 7.015.75.75 0 0 1-.609.51 62.443 62.443 0 0 1-13.566-2.066.75.75 0 0 1-.526-.703V1.75Z" />
                  <path d="M18.596 5.718a.75.75 0 0 1 .536.93 58.15 58.15 0 0 1-2.643 7.584.75.75 0 0 1-.732.471 64.108 64.108 0 0 1-13.025-2.139.75.75 0 0 1-.509-.72V4.019a.75.75 0 0 1 .559-.706 62.25 62.25 0 0 1 13.656 1.938.75.75 0 0 1 .158.467Z" />
                  <path d="M16.133 9.359a.75.75 0 0 1 .565.899 56.484 56.484 0 0 1-1.94 5.86.75.75 0 0 1-.611.51A96.387 96.387 0 0 1 1.339 13.33a.75.75 0 0 1-.522-.725v-3.738a.75.75 0 0 1 .584-.73 58.23 58.23 0 0 1 14.398.892.75.75 0 0 1 .334.33Z" />
                </svg>
                {book.quantity <= 3 ? 'Limited Stock' : 'In Stock'}: {book.quantity}
              </div>
            ) : (
              <div className="book-stock-badge out-of-stock">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                  <path fillRule="evenodd" d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z" clipRule="evenodd" />
                </svg>
                Out of Stock
              </div>
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
              <h3>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM1.49 15.326a.78.78 0 0 1-.358-.442 3 3 0 0 1 4.308-3.516 6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655ZM16.44 15.98a4.97 4.97 0 0 0 2.07-.654.78.78 0 0 0 .357-.442 3 3 0 0 0-4.308-3.517 6.484 6.484 0 0 1 1.907 3.96 2.32 2.32 0 0 1-.026.654ZM18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.304 16.19a.844.844 0 0 1-.277-.71 5 5 0 0 1 9.947 0 .843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81Z" />
                </svg>
                Author
              </h3>
              <p>{book.author}</p>
            </div>
            
            <div className="info-section">
              <h3>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 0 1 4.25 2h11.5A2.25 2.25 0 0 1 18 4.25v8.5A2.25 2.25 0 0 1 15.75 15h-3.105a3.501 3.501 0 0 0 1.1 1.677A.75.75 0 0 1 13.26 18H6.74a.75.75 0 0 1-.484-1.323A3.501 3.501 0 0 0 7.355 15H4.25A2.25 2.25 0 0 1 2 12.75v-8.5Zm1.5 0a.75.75 0 0 1 .75-.75h11.5a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-.75.75H4.25a.75.75 0 0 1-.75-.75v-7.5Z" clipRule="evenodd" />
                </svg>
                Description
              </h3>
              <p className="book-description">{book.description || 'No description available for this book.'}</p>
            </div>
            
            <div className="info-section">
              <h3>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M5.5 3A2.5 2.5 0 0 0 3 5.5v2.879a2.5 2.5 0 0 0 .732 1.767l6.5 6.5a2.5 2.5 0 0 0 3.536 0l2.878-2.878a2.5 2.5 0 0 0 0-3.536l-6.5-6.5A2.5 2.5 0 0 0 8.38 3H5.5ZM6 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" clipRule="evenodd" />
                </svg>
                Details
              </h3>
              <div className="book-details-grid">
                <div className="detail-item">
                  <span className="detail-label">Genre</span>
                  <span className="detail-value">{book.genre}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Rating</span>
                  <span className="detail-value">
                    <span className="star">★</span> {book.rating}/5
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Available Copies</span>
                  <span className="detail-value">{book.quantity}</span>
                </div>
              </div>
            </div>
            
            <div className="book-actions">
              <Link to="/all-books" className="back-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>
                Back to Library
              </Link>
              <Link to={`/update-book/${book._id}`} className="update-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
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