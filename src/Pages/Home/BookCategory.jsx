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
    { _id: '1', name: 'Fiction', image: 'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?auto=format&fit=crop&q=80&w=1000', description: 'Fictional stories and novels' },
    { _id: '2', name: 'Science', image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1000', description: 'Scientific books and research' },
    { _id: '3', name: 'History', image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=1000', description: 'Historical accounts and documentation' },
    { _id: '4', name: 'Biography', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000', description: 'Life stories of notable people' },
    { _id: '5', name: 'Self-Help', image: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&q=80&w=1000', description: 'Personal development and growth' },
    { _id: '6', name: 'Fantasy', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1000', description: 'Magical worlds and creatures' }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Book Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCategories.map((category) => (
            <Link 
              to={`/category/${category.name}`} 
              key={category._id}
              className="transition-transform duration-300 transform hover:scale-105"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-600">{category.description || 'Explore books in this category'}</p>
                  <div className="mt-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
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