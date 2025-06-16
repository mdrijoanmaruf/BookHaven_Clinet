import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoryAPI } from '../../api';

const BookCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoryAPI.getAllCategories();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div className="text-center py-10">Loading categories...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  // Display placeholder categories if none are found in the database
  const displayCategories = categories.length > 0 ? categories : [
    { _id: '1', name: 'Thriller', image: 'https://images.unsplash.com/photo-1587876931567-564ce588bfbd?auto=format&fit=crop&q=80&w=1000', description: 'Suspenseful and exciting stories' },
    { _id: '2', name: 'Sci-Fi', image: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&q=80&w=1000', description: 'Science fiction and futuristic worlds' },
    { _id: '3', name: 'Poetry', image: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?auto=format&fit=crop&q=80&w=1000', description: 'Expressive and artistic literary works' },
    { _id: '4', name: 'Drama', image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&q=80&w=1000', description: 'Theatrical and emotional stories' },
    { _id: '5', name: 'Children', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1000', description: 'Books for young readers' },
    { _id: '6', name: 'Self-Help', image: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&q=80&w=1000', description: 'Personal development and growth' },
    { _id: '7', name: 'Biography', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000', description: 'Life stories of notable people' },
    { _id: '8', name: 'Fantasy', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1000', description: 'Magical worlds and creatures' },
    { _id: '9', name: 'Romance', image: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&q=80&w=1000', description: 'Love stories and relationships' }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Book Categories</h2>
        <p className="text-center text-primary-dark mb-12 max-w-2xl mx-auto">Explore our diverse collection of books across various categories</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCategories.map((category) => (
            <Link 
              to={`/category/${category.name}`} 
              key={category._id}
              className="transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full border border-gray-100 group">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent z-10"></div>
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-primary">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.description || 'Explore books in this category'}</p>
                  <div className="mt-4">
                    <span className="inline-block bg-gradient-to-r from-primary to-accent text-white font-medium px-4 py-2 rounded-md transition duration-300 shadow-sm hover:shadow-md">
                      Explore Books
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookCategory;