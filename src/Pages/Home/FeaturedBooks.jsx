import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookAPI } from '../../api';

// Simple star rating component
const StarRating = ({ rating }) => {
  const stars = [];
  const fullStar = "★";
  const emptyStar = "☆";
  
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<span key={i} className="text-accent text-xl">{fullStar}</span>);
    } else {
      stars.push(<span key={i} className="text-accent/30 text-xl">{emptyStar}</span>);
    }
  }
  
  return <div className="flex">{stars}</div>;
};

const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        setLoading(true);
        // Fetching all books and taking the first 3
        // In a real app, you'd have a specific API for featured books
        const data = await bookAPI.getAllBooks();
        setBooks(data.slice(0, 3));
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch featured books');
        setLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, []);

  // Sample featured books in case API fails or returns empty
  const sampleBooks = [
    { 
      _id: '1', 
      title: 'The Silent Echo', 
      author: 'Elizabeth Winters', 
      genre: 'Mystery', 
      rating: 4.5, 
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=1000' 
    },
    { 
      _id: '2', 
      title: 'Beyond the Horizon', 
      author: 'James Carter', 
      genre: 'Science Fiction', 
      rating: 4.8, 
      image: 'https://images.unsplash.com/photo-1531901599143-df5010ab9438?auto=format&fit=crop&q=80&w=1000' 
    },
    { 
      _id: '3', 
      title: 'Whispers of the Past', 
      author: 'Sophia Chen', 
      genre: 'Historical Fiction', 
      rating: 4.2, 
      image: 'https://images.unsplash.com/photo-1518744386442-2d48ac5b5e84?auto=format&fit=crop&q=80&w=1000' 
    }
  ];

  const displayBooks = books.length > 0 ? books : sampleBooks;

  if (loading) return <div className="text-center py-10">Loading featured books...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Featured Books</h2>
        <p className="text-center text-primary-dark mb-12 max-w-2xl mx-auto">Discover our most popular and highly recommended books</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayBooks.map((book) => (
            <div key={book._id} className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col border border-gray-100 group transition-all duration-300 hover:shadow-xl">
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent z-10"></div>
                <img 
                  src={book.image} 
                  alt={book.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium z-20">
                  Featured
                </div>
              </div>
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold mb-3 text-primary">{book.title}</h3>
                <p className="text-gray-700 mb-2"><span className="font-semibold text-primary-dark">Author:</span> {book.author}</p>
                <p className="text-gray-700 mb-3"><span className="font-semibold text-primary-dark">Genre:</span> {book.genre}</p>
                
                <div className="mb-4">
                  <StarRating rating={book.rating || 0} />
                </div>
              </div>
              <div className="px-6 pb-6">
                <Link 
                  to={`/book-details/${book._id}`} 
                  className="block w-full bg-gradient-to-r from-primary to-accent text-white text-center px-4 py-3 rounded-md hover:shadow-md transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link 
            to="/all-books" 
            className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-md transition duration-300"
          >
            View All Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBooks; 