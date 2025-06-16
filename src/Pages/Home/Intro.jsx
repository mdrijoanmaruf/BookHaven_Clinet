import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

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

  // Animation variants
  const slideVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.5, ease: "easeIn" }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        delay: 0.3,
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, delay: 0.8 }
    },
    hover: { 
      scale: 1.05, 
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    }
  };

  const arrowVariants = {
    hover: { 
      scale: 1.2, 
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      transition: { duration: 0.2 }
    }
  };

  const welcomeVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        delay: 0.5
      }
    }
  };

  return (
    <>
      {/* Hero Section with Slider */}
      <motion.div 
        className="relative h-[70vh] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Slides */}
        <AnimatePresence mode="wait">
          {slides.map((slide, index) => (
            currentSlide === index && (
              <motion.div 
                key={slide.id}
                className="absolute top-0 left-0 w-full h-full"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                  <motion.img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 8 }}
                  />
                </div>
                
                {/* Content */}
                <div className="relative z-20 flex items-center justify-center h-full">
                  <motion.div 
                    className="container mx-auto px-6 text-center text-white"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.h1 
                      className="text-4xl md:text-5xl font-bold mb-4"
                      variants={itemVariants}
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p 
                      className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
                      variants={itemVariants}
                    >
                      {slide.description}
                    </motion.p>
                    <motion.div variants={itemVariants}>
                      <Link to={slide.buttonLink}>
                        <motion.button 
                          className="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-md text-lg font-medium hover:shadow-lg transition duration-300"
                          variants={buttonVariants}
                          whileHover="hover"
                        >
                          {slide.buttonText}
                        </motion.button>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
        
        {/* Navigation Arrows */}
        <motion.button 
          className="absolute top-1/2 left-4 z-30 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-3 text-white shadow-lg transform transition-all duration-200"
          onClick={goToPrevSlide}
          aria-label="Previous slide"
          variants={arrowVariants}
          whileHover="hover"
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </motion.button>
        
        <motion.button 
          className="absolute top-1/2 right-4 z-30 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-3 text-white shadow-lg transform transition-all duration-200"
          onClick={goToNextSlide}
          aria-label="Next slide"
          variants={arrowVariants}
          whileHover="hover"
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </motion.button>
        
        {/* Dot Indicators */}
        <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center space-x-3">
          {slides.map((_, index) => (
            <motion.button 
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              initial={{ scale: 1 }}
              animate={{ scale: currentSlide === index ? 1.25 : 1 }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Welcome Section */}
      <motion.div 
        className="py-12 bg-white"
        variants={welcomeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center text-primary-dark mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Welcome to BookHaven
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-lg text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Your ultimate destination for discovering, borrowing, and sharing books. 
            Join our community of book lovers and explore the world of literature today.
          </motion.p>
        </div>
      </motion.div>
    </>
  )
}

export default Intro