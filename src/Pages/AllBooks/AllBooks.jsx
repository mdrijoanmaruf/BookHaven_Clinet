import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookAPI } from '../../api';
import './AllBooks.css';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await bookAPI.getAllBooks();
        setBooks(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch books. Please try again later.');
        setLoading(false);
        console.error('Error fetching books:', err);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading books...</p>
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

  if (books.length === 0) {
    return (
      <div className="no-books-container">
        <h3>No Books Available</h3>
        <p>There are currently no books in the library.</p>
        <Link to="/add-book" className="add-book-link">Add a Book</Link>
      </div>
    );
  }

  return (
    <div className="all-books-container">
      <h2>All Books</h2>
      <div className="books-grid">
        {books.map((book) => (
          <div key={book._id} className="book-card">
            <div className="book-image">
              <img src={book.image} alt={book.title} onError={(e) => {e.target.src = '/placeholder-book.jpg'}} />
              <div className="book-rating">
                <span>★</span> {book.rating}
              </div>
              {book.quantity <= 3 && book.quantity > 0 && (
                <div className="book-limited">
                  Limited Stock
                </div>
              )}
              {book.quantity === 0 && (
                <div className="book-unavailable">
                  Out of Stock
                </div>
              )}
            </div>
            <div className="book-details">
              <h3 title={book.title}>{book.title}</h3>
              <p className="book-author">By: {book.author}</p>
              <p className="book-genre">Genre: <span className="genre-tag">{book.genre}</span></p>
              <p className="book-quantity">Available: {book.quantity}</p>
              <div className="book-actions">
                <Link to={`/book-details/${book._id}`} className="details-button">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  Details
                </Link>
                <Link to={`/update-book/${book._id}`} className="update-button">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                  Update
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks; 