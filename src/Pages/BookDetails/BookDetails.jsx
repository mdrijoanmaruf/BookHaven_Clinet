import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { bookAPI } from '../../api';
import { useAuth } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [returnDate, setReturnDate] = useState('');
  const [borrowLoading, setBorrowLoading] = useState(false);
  const [alreadyBorrowed, setAlreadyBorrowed] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

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

  // Check if user has already borrowed this book
  useEffect(() => {
    const checkBorrowStatus = async () => {
      if (!user || !book) return;
      
      try {
        const borrowedBooks = await bookAPI.getBorrowedBooks(user.uid);
        const hasAlreadyBorrowed = borrowedBooks.some(
          borrowedBook => borrowedBook.bookId === book._id && borrowedBook.status === 'borrowed'
        );
        
        setAlreadyBorrowed(hasAlreadyBorrowed);
      } catch (err) {
        console.error('Error checking borrow status:', err);
      }
    };
    
    checkBorrowStatus();
  }, [user, book]);

  // Set default return date (14 days from now)
  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    setReturnDate(date.toISOString().split('T')[0]);
  }, []);

  const handleBorrow = async (e) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!returnDate) {
      Swal.fire({
        icon: 'error',
        title: 'Return Date Required',
        text: 'Please select a return date'
      });
      return;
    }
    
    try {
      setBorrowLoading(true);
      
      const borrowData = {
        bookId: book._id,
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        returnDate
      };
      
      const response = await bookAPI.borrowBook(borrowData);
      
      // Update book quantity locally
      setBook(prev => ({
        ...prev,
        quantity: response.currentQuantity
      }));
      
      // Update borrowed status
      setAlreadyBorrowed(true);
      
      setShowModal(false);
      
      Swal.fire({
        icon: 'success',
        title: 'Book Borrowed!',
        text: `You have successfully borrowed "${book.title}". Please return by ${new Date(returnDate).toLocaleDateString()}.`,
        confirmButtonColor: '#3085d6'
      });
      
      setBorrowLoading(false);
    } catch (err) {
      setBorrowLoading(false);
      console.error('Error borrowing book:', err);
      
      if (err.response?.data?.alreadyBorrowed) {
        setAlreadyBorrowed(true);
        Swal.fire({
          icon: 'warning',
          title: 'Already Borrowed',
          text: 'You have already borrowed this book. You can borrow it again after returning it.',
          confirmButtonColor: '#3085d6'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Borrow',
          text: err.response?.data?.message || 'Something went wrong. Please try again.'
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-gray-200 border-l-primary rounded-full animate-spin mb-6"></div>
        <p className="text-gray-600 font-medium text-lg">Loading book details...</p>
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

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Book Not Found</h3>
        <p className="text-gray-600 mb-8 max-w-md text-lg">The book you're looking for doesn't exist or has been removed.</p>
        <Link to="/all-books" className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
          Back to Library
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{book?.title ? `${book.title} - Book Details` : 'Book Details'} | BookHaven</title>
        <meta name="description" content={book?.description ? `${book.description.substring(0, 150)}...` : 'View detailed information about this book including author, rating, and availability.'} />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <h1 className="text-4xl font-bold text-gray-800 mb-5">{book.title}</h1>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full">
              <span className="text-yellow-500 mr-1.5">★</span> {book.rating}/5 Rating
            </div>
            <div className="flex items-center bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1.5">
                <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V7.621a1.5 1.5 0 0 0-.44-1.06l-4.12-4.122A1.5 1.5 0 0 0 11.378 2H4.5ZM10 8a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5A.75.75 0 0 1 10 8Z" clipRule="evenodd" />
              </svg>
              {book.genre}
            </div>
            {book.quantity > 0 ? (
              <div className={`flex items-center px-4 py-1.5 rounded-full ${book.quantity <= 3 ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1.5">
                  <path d="M1 1.75A.75.75 0 0 1 1.75 1h1.628a1.75 1.75 0 0 1 1.734 1.51L5.18 3a65.25 65.25 0 0 1 13.36 1.668.75.75 0 0 1 .58.91 62.281 62.281 0 0 1-2.33 7.015.75.75 0 0 1-.609.51 62.443 62.443 0 0 1-13.566-2.066.75.75 0 0 1-.526-.703V1.75Z" />
                  <path d="M18.596 5.718a.75.75 0 0 1 .536.93 58.15 58.15 0 0 1-2.643 7.584.75.75 0 0 1-.732.471 64.108 64.108 0 0 1-13.025-2.139.75.75 0 0 1-.509-.72V4.019a.75.75 0 0 1 .559-.706 62.25 62.25 0 0 1 13.656 1.938.75.75 0 0 1 .158.467Z" />
                  <path d="M16.133 9.359a.75.75 0 0 1 .565.899 56.484 56.484 0 0 1-1.94 5.86.75.75 0 0 1-.611.51A96.387 96.387 0 0 1 1.339 13.33a.75.75 0 0 1-.522-.725v-3.738a.75.75 0 0 1 .584-.73 58.23 58.23 0 0 1 14.398.892.75.75 0 0 1 .334.33Z" />
                </svg>
                {book.quantity <= 3 ? 'Limited Stock' : 'In Stock'}: {book.quantity}
              </div>
            ) : (
              <div className="flex items-center bg-red-100 text-red-800 px-4 py-1.5 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1.5">
                  <path fillRule="evenodd" d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z" clipRule="evenodd" />
                </svg>
                Out of Stock
              </div>
            )}
          </div>
        </div>

        <div className="p-8 md:flex">
          <div className="md:w-1/3 mb-8 md:mb-0 md:pr-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-md opacity-20 rounded-xl transform -translate-y-2 translate-x-2"></div>
              <img 
                src={book.image} 
                alt={book.title} 
                className="relative w-full h-auto object-cover rounded-xl shadow-lg border border-gray-200" 
                onError={(e) => {e.target.src = '/placeholder-book.jpg'}} 
              />
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="mb-8">
              <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mr-3 text-primary">
                  <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM1.49 15.326a.78.78 0 0 1-.358-.442 3 3 0 0 1 4.308-3.516 6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655ZM16.44 15.98a4.97 4.97 0 0 0 2.07-.654.78.78 0 0 0 .357-.442 3 3 0 0 0-4.308-3.517 6.484 6.484 0 0 1 1.907 3.96 2.32 2.32 0 0 1-.026.654ZM18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.304 16.19a.844.844 0 0 1-.277-.71 5 5 0 0 1 9.947 0 .843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81Z" />
                </svg>
                Author
              </h3>
              <p className="text-gray-700 text-lg pl-9">{book.author}</p>
            </div>
            
            <div className="mb-8">
              <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mr-3 text-primary">
                  <path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 0 1 4.25 2h11.5A2.25 2.25 0 0 1 18 4.25v8.5A2.25 2.25 0 0 1 15.75 15h-3.105a3.501 3.501 0 0 0 1.1 1.677A.75.75 0 0 1 13.26 18H6.74a.75.75 0 0 1-.484-1.323A3.501 3.501 0 0 0 7.355 15H4.25A2.25 2.25 0 0 1 2 12.75v-8.5Zm1.5 0a.75.75 0 0 1 .75-.75h11.5a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-.75.75H4.25a.75.75 0 0 1-.75-.75v-7.5Z" clipRule="evenodd" />
                </svg>
                Description
              </h3>
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                <p className="text-gray-700 leading-relaxed text-lg">{book.description || 'No description available for this book.'}</p>
              </div>
            </div>
            
            <div className="mb-10">
              <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mr-3 text-primary">
                  <path fillRule="evenodd" d="M5.5 3A2.5 2.5 0 0 0 3 5.5v2.879a2.5 2.5 0 0 0 .732 1.767l6.5 6.5a2.5 2.5 0 0 0 3.536 0l2.878-2.878a2.5 2.5 0 0 0 0-3.536l-6.5-6.5A2.5 2.5 0 0 0 8.38 3H5.5ZM6 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" clipRule="evenodd" />
                </svg>
                Details
              </h3>
              <div className="grid grid-cols-2 gap-5 pl-9">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <span className="block text-sm text-gray-500 mb-1">Genre</span>
                  <span className="font-medium text-gray-800 text-lg">{book.genre}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <span className="block text-sm text-gray-500 mb-1">Rating</span>
                  <span className="font-medium text-gray-800 text-lg">
                    <span className="text-yellow-500 mr-1">★</span> {book.rating}/5
                  </span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <span className="block text-sm text-gray-500 mb-1">Available Copies</span>
                  <span className="font-medium text-gray-800 text-lg">{book.quantity}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/all-books" 
                className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition transform hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>
                Back to Library
              </Link>
              <Link 
                to={`/update-book/${book._id}`} 
                className="flex items-center px-6 py-3 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition transform hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                Update Book
              </Link>
              {alreadyBorrowed ? (
                <div className="flex items-center px-6 py-3 bg-amber-100 text-amber-800 font-medium rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                  Already Borrowed
                </div>
              ) : (
                <button 
                  onClick={() => setShowModal(true)} 
                  className={`flex items-center px-6 py-3 font-medium rounded-lg transition transform hover:scale-105 ${
                    book.quantity <= 0 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg'
                  }`}
                  disabled={book.quantity <= 0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                  </svg>
                  Borrow Book
                </button>
              )}
              <Link 
                to="/borrowed-books" 
                className="flex items-center px-6 py-3 bg-green-100 text-green-700 font-medium rounded-lg hover:bg-green-200 transition transform hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
                My Borrowed Books
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Borrow Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div 
            className="bg-white rounded-xl w-full max-w-md shadow-2xl overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-800">Borrow <span className="text-primary">Book</span></h3>
              <button 
                className="text-gray-500 hover:text-gray-700 transition rounded-full hover:bg-gray-100 p-1"
                onClick={() => setShowModal(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 max-h-[70vh] overflow-y-auto scrollbar-hide">
              <div className="flex items-center pb-6 mb-6 border-b border-gray-100">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-sm opacity-20 rounded-lg transform -translate-y-1 translate-x-1"></div>
                  <img 
                    src={book.image} 
                    alt={book.title} 
                    className="relative w-24 h-36 object-cover rounded-lg shadow-md mr-5"
                    onError={(e) => {e.target.src = '/placeholder-book.jpg'}} 
                  />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-1">{book.title}</h4>
                  <p className="text-gray-600">By {book.author}</p>
                  {book.quantity > 0 && (
                    <span className="inline-block mt-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {book.quantity} copies available
                    </span>
                  )}
                </div>
              </div>
              
              <form onSubmit={handleBorrow} className="space-y-5">
                <div>
                  <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    id="userName" 
                    value={user?.displayName || ''} 
                    disabled 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                
                <div>
                  <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="userEmail" 
                    value={user?.email || ''} 
                    disabled 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                
                <div>
                  <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                  <input 
                    type="date" 
                    id="returnDate" 
                    value={returnDate} 
                    onChange={(e) => setReturnDate(e.target.value)} 
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div className="bg-amber-50 p-5 rounded-lg border border-amber-100">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    <p className="text-amber-800">By borrowing this book, you agree to return it by the specified date. Late returns may incur fees.</p>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <div className="flex justify-end space-x-4">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-5 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition transform hover:scale-105"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleBorrow}
                  className={`px-5 py-3 bg-gradient-to-r from-primary to-accent text-white font-medium rounded-lg transition transform hover:scale-105 ${
                    borrowLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg'
                  }`}
                  disabled={borrowLoading}
                >
                  {borrowLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : 'Confirm Borrow'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default BookDetails; 