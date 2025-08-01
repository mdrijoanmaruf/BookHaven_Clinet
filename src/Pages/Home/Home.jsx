import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Intro from './Intro'
import BookCategory from './BookCategory'
import FeaturedBooks from './FeaturedBooks'
import Testimonials from './Testimonials'
import Newsletter from './Newsletter'

const Home = () => {
  // Container variant for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  // Child variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Home - Your Digital Library | BookHaven</title>
        <meta name="description" content="Welcome to BookHaven - Your premier digital library platform. Discover, borrow, and manage books with ease." />
      </Helmet>
      <motion.div 
        className="min-h-screen"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Intro />
        
        <motion.div variants={sectionVariants}>
          <BookCategory />
        </motion.div>
        
        <motion.div variants={sectionVariants}>
          <FeaturedBooks />
        </motion.div>
        
        <motion.div variants={sectionVariants}>
          <Testimonials />
        </motion.div>
        
        <motion.div variants={sectionVariants}>
          <Newsletter />
        </motion.div>
      </motion.div>
    </>
  )
}

export default Home