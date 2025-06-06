import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../Providers/AuthProvider'

const Header = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch(error => console.error(error));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => 
          isActive ? "text-primary font-bold border-b-2 border-accent pb-1" : "text-primary-dark hover:text-accent transition-colors duration-300"
        }>
          Home
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/all-books" className={({ isActive }) => 
              isActive ? "text-primary font-bold border-b-2 border-accent pb-1" : "text-primary-dark hover:text-accent transition-colors duration-300"
            }>
              All Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-book" className={({ isActive }) => 
              isActive ? "text-primary font-bold border-b-2 border-accent pb-1" : "text-primary-dark hover:text-accent transition-colors duration-300"
            }>
              Add Book
            </NavLink>
          </li>
          <li>
            <NavLink to="/borrowed-books" className={({ isActive }) => 
              isActive ? "text-primary font-bold border-b-2 border-accent pb-1" : "text-primary-dark hover:text-accent transition-colors duration-300"
            }>
              Borrowed Books
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white text-primary-dark shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
              <div className="bg-gradient-to-r from-primary to-accent p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                  <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                </svg>
              </div>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">BookHaven</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {navLinks}
            </ul>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <img 
                    src={user.photoURL || 'https://i.ibb.co/SVVcWkj/user.png'} 
                    alt="User" 
                    className="w-10 h-10 rounded-full border-2 border-accent cursor-pointer shadow-sm transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute hidden group-hover:block bg-white p-2 rounded-md shadow-lg top-full right-0 mt-1 whitespace-nowrap z-10 border border-gray-100">
                    <p className="text-primary-dark font-medium">{user.displayName || 'User'}</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="bg-gradient-to-r from-primary to-accent text-white font-medium px-5 py-2 rounded-md transition duration-300 shadow-sm hover:shadow-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-5 py-1.5 rounded-md transition duration-300"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-gradient-to-r from-primary to-accent text-white font-medium px-5 py-2 rounded-md transition duration-300 shadow-sm hover:shadow-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-primary focus:outline-none">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-5 pb-3 animate-fadeIn">
            <ul className="flex flex-col space-y-4">
              {navLinks}
            </ul>
            <div className="mt-6 flex flex-col space-y-3 border-t border-gray-100 pt-4">
              {user ? (
                <>
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-md">
                    <img 
                      src={user.photoURL || 'https://i.ibb.co/SVVcWkj/user.png'} 
                      alt="User" 
                      className="w-10 h-10 rounded-full border-2 border-accent shadow-sm"
                    />
                    <span className="text-primary-dark font-medium">{user.displayName || 'User'}</span>
                  </div>
                  <button 
                    onClick={handleLogout} 
                    className="bg-gradient-to-r from-primary to-accent text-white font-medium px-5 py-3 rounded-md transition duration-300 shadow-sm w-full text-center mt-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-md transition duration-300 w-full text-center"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-gradient-to-r from-primary to-accent text-white font-medium px-5 py-3 rounded-md transition duration-300 shadow-sm w-full text-center"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Header