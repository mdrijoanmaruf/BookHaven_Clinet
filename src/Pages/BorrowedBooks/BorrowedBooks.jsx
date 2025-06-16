import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { bookAPI } from '../../api';
import { useAuth } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [returningBook, setReturningBook] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchBorrowedBooks = async () => {
      try {
        setLoading(true);
        const data = await bookAPI.getBorrowedBooks(user.uid);
        setBorrowedBooks(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch borrowed books. Please try again.');
        setLoading(false);
        console.error('Error fetching borrowed books:', err);
      }
    };

    fetchBorrowedBooks();
  }, [user, navigate]);

  const handleReturnBook = async (borrowId, bookId) => {
    try {
      setReturningBook(borrowId);
      
      // Confirm with the user
      const result = await Swal.fire({
        title: 'Return Book?',
        text: "Are you sure you want to return this book?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, return it!'
      });
      
      if (!result.isConfirmed) {
        setReturningBook(null);
        return;
      }
      
      console.log('Sending return request with data:', { borrowId, bookId, userId: user.uid });
      
      // Call API to return the book
      const response = await bookAPI.returnBook({
        borrowId,
        bookId,
        userId: user.uid
      });
      
      console.log('Return book response:', response);
      
      // Update the local state to reflect changes
      setBorrowedBooks(prev => 
        prev.map(book => 
          book._id === borrowId 
            ? { ...book, status: 'returned' } 
            : book
        )
      );
      
      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Book Returned!',
        text: 'Thank you for returning the book.',
        confirmButtonColor: '#3085d6'
      });
      
    } catch (err) {
      console.error('Error returning book:', err);
      
      // More detailed error logging
      if (err.response) {
        // The request was made and the server responded with a status code
        console.error('Error response data:', err.response.data);
        console.error('Error response status:', err.response.status);
      } else if (err.request) {
        // The request was made but no response was received
        console.error('Error request:', err.request);
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Failed to Return',
        text: err.response?.data?.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setReturningBook(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-gray-200 border-l-primary rounded-full animate-spin mb-6"></div>
        <p className="text-gray-600 font-medium text-lg">Loading borrowed books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <h3 className="text-2xl font-semibold text-red-500 mb-3">Something went wrong</h3>
        <p className="text-gray-600 mb-8 max-w-md text-lg">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4">My Borrowed Books</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6"></div>
        <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto">
          Track all the books you've borrowed from our library and their return dates.
        </p>
      </div>
      
      {borrowedBooks.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-10 text-center max-w-xl mx-auto">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">No Books Borrowed</h3>
          <p className="text-gray-600 mb-8">You haven't borrowed any books from our library yet.</p>
          <Link 
            to="/all-books" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-medium rounded-lg hover:shadow-lg transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
            Browse Books
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {borrowedBooks.map((book) => {
              const borrowDate = new Date(book.borrowDate);
              const returnDate = new Date(book.returnDate);
              const today = new Date();
              const isOverdue = returnDate < today && book.status === 'borrowed';
              const daysLeft = Math.ceil((returnDate - today) / (1000 * 60 * 60 * 24));
              
              return (
                <div 
                  key={book._id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-1/3 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20"></div>
                      <img 
                        src={book.bookImage} 
                        alt={book.bookTitle}
                        className="w-full h-48 sm:h-full object-cover" 
                        onError={(e) => {e.target.src = '/placeholder-book.jpg'}}
                      />
                      {book.status === 'borrowed' && (
                        <div className="absolute top-3 left-3">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            isOverdue 
                              ? 'bg-red-100 text-red-700' 
                              : daysLeft <= 3 
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-blue-100 text-blue-700'
                          }`}>
                            {isOverdue 
                              ? 'Overdue' 
                              : daysLeft === 0 
                                ? 'Due Today'
                                : daysLeft === 1 
                                  ? '1 day left' 
                                  : `${daysLeft} days left`
                            }
                          </div>
                        </div>
                      )}
                      {book.status === 'returned' && (
                        <div className="absolute top-3 left-3">
                          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                            Returned
                          </div>
                        </div>
                      )}
                      
                      {book.bookCategory && (
                        <div className="absolute bottom-3 left-3">
                          <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                            {book.bookCategory}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="sm:w-2/3 p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{book.bookTitle}</h3>
                        <p className="text-gray-600">By {book.bookAuthor}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-5">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Borrow Date</p>
                          <p className="font-medium">{borrowDate.toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Return Date</p>
                          <p className={`font-medium ${isOverdue ? 'text-red-600' : ''}`}>
                            {returnDate.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 mt-auto">
                        <Link 
                          to={`/book-details/${book.bookId}`} 
                          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                          View Details
                        </Link>
                        
                        {book.status === 'borrowed' && (
                          <button 
                            onClick={() => handleReturnBook(book._id, book.bookId)}
                            disabled={returningBook === book._id}
                            className={`inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition ${
                              returningBook === book._id ? 'opacity-70 cursor-wait' : ''
                            }`}
                          >
                            {returningBook === book._id ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-green-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                              </>
                            ) : (
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                </svg>
                                Return Book
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-10 text-center">
            <Link 
              to="/all-books"
              className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
              </svg>
              Back to Library
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default BorrowedBooks; 