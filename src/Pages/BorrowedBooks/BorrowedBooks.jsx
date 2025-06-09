import React, { useState, useEffect, useContext } from 'react';
import { borrowedBooksAPI } from '../../api';
import { toast } from 'react-hot-toast';
// import { AuthContext } from '../../contexts/AuthContext';
import { AuthContext } from '../../Providers/AuthProvider';
import './BorrowedBooks.css';

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [returningBook, setReturningBook] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      if (!currentUser || !currentUser.email) {
        setError('User authentication required');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const data = await borrowedBooksAPI.getUserBorrowedBooks(currentUser.email);
        setBorrowedBooks(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch borrowed books. Please try again later.');
        setLoading(false);
        console.error('Error fetching borrowed books:', err);
      }
    };

    fetchBorrowedBooks();
  }, [currentUser]);

  const handleReturnBook = async (id, bookId) => {
    try {
      setReturningBook(id);
      await borrowedBooksAPI.returnBook(id, bookId);
      
      // Update the local state to remove the returned book
      setBorrowedBooks(prevBooks => prevBooks.filter(book => book._id !== id));
      
      toast.success('Book returned successfully!');
    } catch (err) {
      toast.error('Failed to return book. Please try again.');
      console.error('Error returning book:', err);
    } finally {
      setReturningBook(null);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateDaysLeft = (returnDate) => {
    const today = new Date();
    const due = new Date(returnDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="borrowed-loading-container">
        <div className="borrowed-loading-spinner"></div>
        <p>Loading your borrowed books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="borrowed-error-container">
        <h3>Something went wrong</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (borrowedBooks.length === 0) {
    return (
      <div className="borrowed-empty-container">
        <div className="empty-illustration">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
            <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
          </svg>
        </div>
        <h3>You haven't borrowed any books yet!</h3>
        <p>Explore our library and discover amazing books to borrow.</p>
        <a href="/books" className="browse-books-btn">Browse Books</a>
      </div>
    );
  }

  return (
    <div className="borrowed-books-container">
      <div className="borrowed-header">
        <h2>Your Borrowed Books</h2>
        <p className="borrowed-count">You currently have {borrowedBooks.length} {borrowedBooks.length === 1 ? 'book' : 'books'} borrowed</p>
      </div>
      
      <div className="borrowed-books-grid">
        {borrowedBooks.map((book) => {
          const daysLeft = calculateDaysLeft(book.returnDate);
          return (
            <div key={book._id} className="borrowed-book-card">
              <div className="borrowed-book-image">
                <img 
                  src={book.image} 
                  alt={book.title} 
                  onError={(e) => {e.target.src = '/placeholder-book.jpg'}}
                />
                {daysLeft <= 3 && daysLeft > 0 && (
                  <div className="due-soon-badge">
                    Due Soon
                  </div>
                )}
                {daysLeft <= 0 && (
                  <div className="overdue-badge">
                    Overdue
                  </div>
                )}
              </div>
              <div className="borrowed-book-details">
                <h3 title={book.title}>{book.title}</h3>
                <p className="borrowed-book-author">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM1.49 15.326a.78.78 0 0 1-.358-.442 3 3 0 0 1 4.308-3.516 6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655ZM16.44 15.98a4.97 4.97 0 0 0 2.07-.654.78.78 0 0 0 .357-.442 3 3 0 0 0-4.308-3.517 6.484 6.484 0 0 1 1.907 3.96 2.32 2.32 0 0 1-.026.654ZM18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.304 16.19a.844.844 0 0 1-.277-.71 5 5 0 0 1 9.947 0 .843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81Z" />
                  </svg>
                  {book.author}
                </p>
                <p className="borrowed-book-genre">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V7.621a1.5 1.5 0 0 0-.44-1.06l-4.12-4.122A1.5 1.5 0 0 0 11.378 2H4.5ZM10 8a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5A.75.75 0 0 1 10 8Z" clipRule="evenodd" />
                  </svg>
                  <span className="genre-tag">{book.genre}</span>
                </p>
                <div className="borrow-dates">
                  <div className="date-item">
                    <span className="date-label">Borrowed:</span>
                    <span className="date-value">{formatDate(book.borrowDate)}</span>
                  </div>
                  <div className="date-item">
                    <span className="date-label">Return by:</span>
                    <span className={`date-value ${daysLeft <= 3 ? 'text-warning' : ''} ${daysLeft <= 0 ? 'text-danger' : ''}`}>
                      {formatDate(book.returnDate)}
                    </span>
                  </div>
                </div>
                <div className="days-left-indicator">
                  <div className="days-left-bar">
                    <div 
                      className={`days-left-progress ${daysLeft <= 3 ? 'warning' : ''} ${daysLeft <= 0 ? 'danger' : ''}`}
                      style={{ width: `${Math.max(0, Math.min(100, (daysLeft / 14) * 100))}%` }}
                    ></div>
                  </div>
                  <span className={`days-left-text ${daysLeft <= 3 ? 'text-warning' : ''} ${daysLeft <= 0 ? 'text-danger' : ''}`}>
                    {daysLeft > 0 
                      ? `${daysLeft} ${daysLeft === 1 ? 'day' : 'days'} left` 
                      : `${Math.abs(daysLeft)} ${Math.abs(daysLeft) === 1 ? 'day' : 'days'} overdue`}
                  </span>
                </div>
                <button 
                  className="return-button" 
                  onClick={() => handleReturnBook(book._id, book.bookId)}
                  disabled={returningBook === book._id}
                >
                  {returningBook === book._id ? (
                    <>
                      <div className="return-spinner"></div>
                      <span>Returning...</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
                      </svg>
                      Return Book
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BorrowedBooks; 