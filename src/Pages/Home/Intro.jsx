import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Intro = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      title: "Discover Your Next Favorite Book",
      description: "Explore our vast collection of books spanning all genres. From bestselling fiction to educational resources, we have something for every reader.",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80",
      buttonText: "Browse Books",
      buttonLink: "/all-books"
    },
    {
      id: 2,
      title: "Borrow With Ease",
      description: "Our streamlined borrowing system makes it simple to access knowledge. Create an account, select your books, and enjoy reading at your convenience.",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80",
      buttonText: "Start Borrowing",
      buttonLink: "/borrowed-books"
    },
    {
      id: 3,
      title: "Contribute To Our Collection",
      description: "Have books to share with others? Add them to our library and help build our community of knowledge and stories.",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80",
      buttonText: "Add Book",
      buttonLink: "/add-book"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  // Handlers for manual navigation
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  
  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      {/* Hero Section with Slider */}
      <div className="relative h-[70vh] overflow-hidden">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="relative z-20 flex items-center justify-center h-full">
              <div className="container mx-auto px-6 text-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">{slide.description}</p>
                <Link 
                  to={slide.buttonLink} 
                  className="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-md text-lg font-medium hover:shadow-lg transition duration-300"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <button 
          className="absolute top-1/2 left-4 z-30 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-3 text-white shadow-lg transform hover:scale-110 transition-all duration-200"
          onClick={goToPrevSlide}
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        
        <button 
          className="absolute top-1/2 right-4 z-30 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-3 text-white shadow-lg transform hover:scale-110 transition-all duration-200"
          onClick={goToNextSlide}
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        
        {/* Dot Indicators */}
        <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center space-x-3">
          {slides.map((_, index) => (
            <button 
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white scale-125' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Welcome Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary-dark mb-8">Welcome to BookHaven</h2>
          <p className="text-gray-600 text-lg text-center max-w-3xl mx-auto">
            Your ultimate destination for discovering, borrowing, and sharing books. 
            Join our community of book lovers and explore the world of literature today.
          </p>
        </div>
      </div>
    </>
  )
}

export default Intro