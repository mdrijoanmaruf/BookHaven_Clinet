import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    }
  };

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

  if (loading) return (
    <div className="text-center py-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="inline-block"
      >
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-primary-dark">Loading featured books...</p>
      </motion.div>
    </div>
  );
  
  if (error) return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="text-center py-10 text-red-500"
    >
      {error}
    </motion.div>
  );

  return (
    <motion.div 
      className="py-16 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Featured Books
        </motion.h2>
        <motion.p 
          className="text-center text-primary-dark mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Discover our most popular and highly recommended books
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {displayBooks.map((book) => (
            <motion.div 
              key={book._id} 
              className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col border border-gray-100"
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent z-10"></div>
                <motion.img 
                  src={book.image} 
                  alt={book.title} 
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div 
                  className="absolute top-3 right-3 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium z-20"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  Featured
                </motion.div>
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
                <Link to={`/book-details/${book._id}`}>
                  <motion.button 
                    className="block w-full bg-gradient-to-r from-primary to-accent text-white text-center px-4 py-3 rounded-md"
                    whileHover={{ 
                      scale: 1.03, 
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)" 
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Details
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link to="/all-books">
            <motion.button 
              className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-md"
              variants={buttonVariants}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              View All Books
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeaturedBooks; 