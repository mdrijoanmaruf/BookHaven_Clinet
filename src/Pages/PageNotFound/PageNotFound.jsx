import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - 404 Error | BookHaven</title>
        <meta name="description" content="Sorry, the page you're looking for doesn't exist. Return to BookHaven's homepage to continue exploring our digital library." />
      </Helmet>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center">
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="text-9xl font-extrabold text-gray-200 tracking-widest">404</div>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 text-primary-dark opacity-25">
                <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
              </svg>
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6">Oops! Page Not Found</h1>
        
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <p className="text-xl text-gray-600 mb-6">
            The book you're looking for seems to be missing from our shelves.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-medium rounded-md shadow-md hover:shadow-lg transition duration-300">
              Return Home
            </Link>
            <Link to="/all-books" className="px-6 py-3 bg-white border border-primary text-primary font-medium rounded-md shadow-sm hover:bg-gray-50 transition duration-300">
              Browse Books
            </Link>
          </div>
        </div>
        
        <div className="flex justify-center space-x-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mx-auto mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
              </svg>
            </div>
            <Link to="/contact" className="text-primary-dark font-medium hover:text-accent transition-colors">
              Contact Us
            </Link>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mx-auto mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <Link to="/all-books" className="text-primary-dark font-medium hover:text-accent transition-colors">
              Search Books
            </Link>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mx-auto mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            <Link to="/login" className="text-primary-dark font-medium hover:text-accent transition-colors">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default PageNotFound