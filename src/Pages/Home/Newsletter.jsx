import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // In a real app, you would send this to your backend
    console.log('Subscribing email:', email);
    setIsSubmitted(true);
    setError('');
    setEmail('');
    
    // Reset the success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "backOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="py-16 bg-gradient-to-r from-primary to-accent text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="text-center mb-10" variants={itemVariants}>
            <motion.h2 
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Stay Updated with BookHaven
            </motion.h2>
            <motion.p 
              className="text-white/80 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Subscribe to our newsletter to receive updates on new book arrivals, special offers, and reading recommendations.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg"
            variants={cardVariants}
          >
            <div className="flex flex-col md:flex-row items-stretch gap-4">
              <motion.div className="flex-1 flex flex-col justify-center">
                <motion.h3 
                  className="text-2xl font-semibold mb-3"
                  variants={itemVariants}
                >
                  Join Our Newsletter
                </motion.h3>
                <motion.p 
                  className="text-white/80 mb-6"
                  variants={itemVariants}
                >
                  Get weekly updates on the newest books, exclusive offers, and personalized recommendations straight to your inbox.
                </motion.p>
                
                <motion.div 
                  className="flex items-center mb-6"
                  variants={featureVariants}
                >
                  <motion.div 
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 mr-4"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                  </motion.div>
                  <div>
                    <h4 className="font-medium">Weekly Book Recommendations</h4>
                    <p className="text-sm text-white/70">Personalized to your reading preferences</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center"
                  variants={featureVariants}
                >
                  <motion.div 
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 mr-4"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                  <div>
                    <h4 className="font-medium">Early Access to Promotions</h4>
                    <p className="text-sm text-white/70">Be the first to know about special offers</p>
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="flex-1 md:border-l md:border-white/20 md:pl-8"
                variants={itemVariants}
              >
                <form onSubmit={handleSubmit} className="flex flex-col h-full justify-center">
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div 
                        className="bg-white/20 rounded-lg p-4 text-center mb-4"
                        key="success"
                        variants={successVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <motion.svg 
                          className="w-10 h-10 mx-auto text-white mb-2" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ 
                            scale: 1, 
                            opacity: 1,
                            transition: { delay: 0.2, duration: 0.5, type: "spring" }
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </motion.svg>
                        <motion.p 
                          className="font-medium"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.4 }}
                        >
                          Thank you for subscribing!
                        </motion.p>
                        <motion.p 
                          className="text-sm text-white/80 mt-1"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.4 }}
                        >
                          You'll receive our next newsletter soon.
                        </motion.p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="mb-4">
                          <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                          <motion.input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="yourname@example.com"
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-white/50 text-white placeholder:text-white/50"
                            required
                            whileFocus={{ scale: 1.01, borderColor: "rgba(255,255,255,0.5)" }}
                            transition={{ duration: 0.2 }}
                          />
                          <AnimatePresence>
                            {error && (
                              <motion.p 
                                className="text-red-300 text-sm mt-1"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                              >
                                {error}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                        
                        <motion.button 
                          type="submit" 
                          className="bg-white text-primary font-medium px-6 py-3 rounded-lg"
                          whileHover={{ scale: 1.03, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)" }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                        >
                          Subscribe Now
                        </motion.button>
                        
                        <motion.p 
                          className="text-xs text-white/60 mt-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                        >
                          By subscribing, you agree to our <a href="/legal/privacy-policy" className="underline">Privacy Policy</a> and consent to receive emails from BookHaven.
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Newsletter; 