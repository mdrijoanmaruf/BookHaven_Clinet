import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { bookAPI } from '../../api';

const AddBook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  
  // Handle image URL change
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const form = e.target;
    const title = form.title.value;
    const author = form.author.value;
    const genre = form.genre.value;
    const quantity = parseInt(form.quantity.value);
    const rating = parseFloat(form.rating.value);
    const description = form.description.value;
    const image = form.image.value; // Get image URL directly from form
    
    try {
      // Create book object
      const bookData = {
        title,
        author,
        genre,
        description,
        rating,
        image,
        quantity
      };
      
      // Send data to server using our API service
      const response = await bookAPI.addBook(bookData);
      
      if (response.acknowledged) {
        Swal.fire({
          title: 'Success!',
          text: 'Book added successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        form.reset();
        setImageUrl('');
      }
    } catch (error) {
      console.error('Error adding book:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add book. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const categories = [
    'Novel',
    'Thriller',
    'History',
    'Drama',
    'Sci-Fi',
    'Fantasy',
    'Horror',
    'Biography',
    'Romance',
    'Poetry',
    'Self-Help',
    'Children'
  ];
  
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-primary-dark mb-8 text-center">Add New Book</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Book Title */}
                  <div className="form-control">
                    <label className="block text-gray-700 font-medium mb-2">
                      Book Title <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="title" 
                      required 
                      placeholder="Enter book title" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  {/* Author Name */}
                  <div className="form-control">
                    <label className="block text-gray-700 font-medium mb-2">
                      Author Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="author" 
                      required 
                      placeholder="Enter author name" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category */}
                    <div className="form-control">
                      <label className="block text-gray-700 font-medium mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select 
                        name="genre" 
                        required 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="" disabled selected>Select a category</option>
                        {categories.map((category, index) => (
                          <option key={index} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Quantity */}
                    <div className="form-control">
                      <label className="block text-gray-700 font-medium mb-2">
                        Quantity <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="number" 
                        name="quantity" 
                        required 
                        min="1" 
                        placeholder="Enter quantity" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="form-control">
                    <label className="block text-gray-700 font-medium mb-2">
                      Rating <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="number" 
                      name="rating" 
                      required 
                      min="1" 
                      max="5" 
                      step="0.1" 
                      placeholder="Rating (1-5)" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  {/* Book Cover Image URL */}
                  <div className="form-control">
                    <label className="block text-gray-700 font-medium mb-2">
                      Book Cover Image URL <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="url" 
                      name="image" 
                      required
                      placeholder="Enter image URL (https://...)" 
                      value={imageUrl}
                      onChange={handleImageUrlChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {imageUrl && (
                      <div className="mt-2">
                        <img 
                          src={imageUrl} 
                          alt="Preview" 
                          className="h-40 object-contain" 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/150?text=Invalid+Image+URL';
                          }}
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Description */}
                  <div className="form-control">
                    <label className="block text-gray-700 font-medium mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                      name="description" 
                      required 
                      rows="4" 
                      placeholder="Enter a brief description of the book" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    ></textarea>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="form-control mt-8">
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-medium rounded-md shadow-md hover:shadow-lg transition duration-300 disabled:opacity-70"
                    >
                      {loading ? 'Adding Book...' : 'Add Book'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Book Information Section */}
            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <h2 className="text-xl font-semibold text-primary-dark mb-4">About Books</h2>
                <div className="prose text-gray-600">
                  <p className="mb-4">
                    Books are a gateway to knowledge, imagination, and personal growth. As you add books to our library, you're helping to expand our collection and provide more resources for our community.
                  </p>
                  <p className="mb-4">
                    Please ensure that all information is accurate and complete. High-quality book descriptions and correct categorization help users find the books they're looking for.
                  </p>
                  <p className="mb-4">
                    The rating system (1-5) helps users identify highly regarded books in our collection. Your honest assessment contributes to the overall quality of our recommendations.
                  </p>
                  <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-100">
                    <h3 className="text-lg font-medium text-primary-dark mb-2">Tips for Book Information</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      <li>Use high-quality image URLs for book covers</li>
                      <li>Include full author names</li>
                      <li>Select the most appropriate category</li>
                      <li>Provide a concise but informative description</li>
                      <li>Be accurate with quantity to avoid confusion</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook; 