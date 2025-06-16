import React, { useState } from 'react';

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

  return (
    <div className="py-16 bg-gradient-to-r from-primary to-accent text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">Stay Updated with BookHaven</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Subscribe to our newsletter to receive updates on new book arrivals, special offers, and reading recommendations.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-stretch gap-4">
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-2xl font-semibold mb-3">Join Our Newsletter</h3>
                <p className="text-white/80 mb-6">
                  Get weekly updates on the newest books, exclusive offers, and personalized recommendations straight to your inbox.
                </p>
                
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Weekly Book Recommendations</h4>
                    <p className="text-sm text-white/70">Personalized to your reading preferences</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Early Access to Promotions</h4>
                    <p className="text-sm text-white/70">Be the first to know about special offers</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 md:border-l md:border-white/20 md:pl-8">
                <form onSubmit={handleSubmit} className="flex flex-col h-full justify-center">
                  {isSubmitted ? (
                    <div className="bg-white/20 rounded-lg p-4 text-center mb-4">
                      <svg className="w-10 h-10 mx-auto text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="font-medium">Thank you for subscribing!</p>
                      <p className="text-sm text-white/80 mt-1">You'll receive our next newsletter soon.</p>
                    </div>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="yourname@example.com"
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-white/50 text-white placeholder:text-white/50"
                          required
                        />
                        {error && <p className="text-red-300 text-sm mt-1">{error}</p>}
                      </div>
                      
                      <button 
                        type="submit" 
                        className="bg-white text-primary font-medium px-6 py-3 rounded-lg hover:bg-opacity-90 transition duration-300"
                      >
                        Subscribe Now
                      </button>
                      
                      <p className="text-xs text-white/60 mt-3">
                        By subscribing, you agree to our <a href="/legal/privacy-policy" className="underline">Privacy Policy</a> and consent to receive emails from BookHaven.
                      </p>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter; 