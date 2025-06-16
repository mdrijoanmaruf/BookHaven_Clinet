import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { bookAPI } from '../../api';

// Simple star rating component to avoid dependency issues
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

const CategoryBooks = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await bookAPI.getBooksByCategory(category);
        setBooks(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch books');
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category]);

  if (loading) return <div className="text-center py-10">Loading books...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{category} Books</h2>
        <p className="text-center text-primary-dark mb-12 max-w-2xl mx-auto">Explore our collection of {category.toLowerCase()} books</p>

        {books.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-700 mb-4">No books found in this category.</p>
            <Link to="/" className="inline-block bg-gradient-to-r from-primary to-accent text-white font-medium px-6 py-3 rounded-md hover:shadow-md transition duration-300">
              Back to Categories
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <div key={book._id} className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col border border-gray-100 group transition-all duration-300 hover:shadow-xl">
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent z-10"></div>
                  <img 
                    src={book.image} 
                    alt={book.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-semibold mb-3 text-primary">{book.title}</h3>
                  <p className="text-gray-700 mb-2"><span className="font-semibold text-primary-dark">Author:</span> {book.author}</p>
                  <p className="text-gray-700 mb-2"><span className="font-semibold text-primary-dark">Category:</span> {book.genre}</p>
                  <p className="text-gray-700 mb-3"><span className="font-semibold text-primary-dark">Quantity:</span> {book.quantity}</p>
                  
                  <div className="mb-4">
                    <StarRating rating={book.rating || 0} />
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <Link 
                    to={`/book-details/${book._id}`} 
                    className="block w-full bg-gradient-to-r from-primary to-accent text-white text-center px-4 py-3 rounded-md hover:shadow-md transition duration-300"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryBooks; 