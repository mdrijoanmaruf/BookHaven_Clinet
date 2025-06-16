import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Md Rijoan Maruf',
      role: 'Avid Reader',
      image: 'https://i.ibb.co/RT9FwBYw/488257098-1767983300425990-1845821744608083197-n.jpg',
      quote: 'BookHaven has completely transformed my reading experience. The selection is fantastic, and I love how easy it is to discover new books that match my interests.',
    },
    {
      id: 2,
      name: 'Raiyyan Islam',
      role: 'Book Club Organizer',
      image: 'https://i.ibb.co/N2dZt4zq/raiyaan.jpg',
      quote: 'Our book club relies on BookHaven for all our monthly selections. The detailed descriptions and reviews help us choose books that lead to great discussions.',
    },
    {
      id: 3,
      name: 'Osman Goni',
      role: 'Literature Student',
      image: 'https://i.ibb.co/6JHTPQwk/osman.jpg',
      quote: 'As a literature student, I need access to a wide variety of books. BookHaven has been an invaluable resource for my studies and personal reading journey.',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const testimonialVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const quoteVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 0.3
      }
    }
  };

  const checkmarkVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.6
      }
    }
  };

  return (
    <motion.div 
      className="py-16 bg-gray-50"
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
          What Our Readers Say
        </motion.h2>
        <motion.p 
          className="text-center text-primary-dark mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Hear from our community of book lovers and readers
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id} 
              className="bg-white rounded-lg shadow-md p-8 border border-gray-100 relative"
              variants={testimonialVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="absolute -top-10 left-1/2 transform -translate-x-1/2"
                variants={imageVariants}
              >
                <motion.div 
                  className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="text-center mt-12"
                variants={quoteVariants}
              >
                <motion.svg 
                  className="w-10 h-10 mx-auto text-gray-300 mb-4" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  initial={{ opacity: 0, rotateY: 90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16.032-.52.112-1.08.239-.63.148-1.16.287-1.59.416L4 13.479a5.947 5.947 0 002.043-2.217C6.887 9.63 7.252 8.392 7.252 7c0-2.213-1.57-3.842-3.652-3.842-2.087 0-3.667 1.635-3.667 3.854 0 .87.21 1.613.63 2.227.42.613 1.09 1.09 2 1.436 1.23.456 1.69.65 2.384 1.189.46.344.82.73 1.073 1.16.253.429.379.91.379 1.441 0 .512-.12.915-.367 1.22-.245.303-.607.455-1.089.455-.253 0-.46-.042-.617-.126a.954.954 0 01-.394-.399 1.966 1.966 0 01-.16-.76c0-.228.08-.484.24-.766.16-.292.394-.598.704-.92l-1.659-1.175a4.843 4.843 0 00-.303.28 3.537 3.537 0 00-.748 1.043c-.18.404-.274.765-.274 1.083 0 .532.114.987.343 1.367.229.38.56.667.992.858.43.191.935.287 1.513.287.881 0 1.646-.221 2.31-.662.666-.44 1-1.09 1-1.947zm10.66 0c0-.88-.23-1.618-.69-2.217-.326-.412-.77-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16.032-.52.112-1.08.239-.63.148-1.16.287-1.59.416L14 13.479a5.947 5.947 0 002.043-2.217c.616-1.012.982-2.169.982-3.444 0-1.213-.44-2.244-1.215-3.044C15.033 3.97 14.026 3.5 12.81 3.5c-1.19 0-2.186.476-2.962 1.307-.776.83-1.164 1.863-1.164 3.047 0 .87.21 1.613.63 2.227.42.613 1.09 1.09 2 1.436 1.23.456 1.69.65 2.384 1.189.46.344.82.73 1.073 1.16.253.429.379.91.379 1.441 0 .512-.12.915-.367 1.22-.245.303-.607.455-1.089.455-.253 0-.46-.042-.617-.126a.954.954 0 01-.394-.399 1.966 1.966 0 01-.16-.76c0-.228.08-.484.24-.766.16-.292.394-.598.704-.92l-1.658-1.175a4.843 4.843 0 00-.303.28 3.537 3.537 0 00-.748 1.043c-.18.404-.274.765-.274 1.083 0 .532.114.987.343 1.367.229.38.56.667.992.858.43.191.935.287 1.513.287.881 0 1.646-.221 2.31-.662.666-.44 1-1.09 1-1.947z" />
                </motion.svg>
                <motion.p 
                  className="text-gray-600 mb-6 italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {testimonial.quote}
                </motion.p>
                <motion.h4 
                  className="font-semibold text-lg text-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {testimonial.name}
                </motion.h4>
                <motion.p 
                  className="text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  {testimonial.role}
                </motion.p>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-6 right-6"
                variants={checkmarkVariants}
              >
                <motion.div 
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Testimonials; 