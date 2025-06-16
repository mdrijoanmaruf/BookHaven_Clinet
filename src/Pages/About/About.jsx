import React from 'react'

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About BookHaven</h1>
            <p className="text-xl md:w-3/4 mx-auto">
              Where knowledge meets community - Discover our story, mission, and the people behind BookHaven.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary-dark mb-4">Our Story</h2>
              <p className="text-gray-700 mb-4">
                BookHaven was founded in 2010 with a simple mission: to create a space where knowledge is accessible to everyone. What started as a small community library has grown into a comprehensive digital platform that serves thousands of readers worldwide.
              </p>
              <p className="text-gray-700">
                Our journey began when a group of passionate book lovers decided to build a better system for managing and sharing books. Over the years, we've evolved from physical shelves to a cutting-edge digital library management system, while maintaining our core values of accessibility, community, and the love of reading.
              </p>
            </div>
            <div className="order-first md:order-last">
              <img 
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Library interior" 
                className="rounded-lg shadow-xl w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-dark mb-2">Our Mission & Values</h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="bg-gradient-to-r from-primary to-accent w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-dark mb-3">Accessibility</h3>
              <p className="text-gray-600">
                We believe knowledge should be accessible to everyone. Our platform is designed to break down barriers and make books available to all readers, regardless of their location or background.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="bg-gradient-to-r from-primary to-accent w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-dark mb-3">Community</h3>
              <p className="text-gray-600">
                Books have the power to connect people. We foster a vibrant community of readers, authors, and librarians who share their love of literature and learning with each other.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="bg-gradient-to-r from-primary to-accent w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-dark mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continually evolve our platform with the latest technology to enhance the reading and library management experience, making it more efficient and enjoyable for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold mb-2">10+</h3>
              <p className="text-lg">Years Experience</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">50,000+</h3>
              <p className="text-lg">Books Available</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">10,000+</h3>
              <p className="text-lg">Active Users</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">200+</h3>
              <p className="text-lg">Partner Libraries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-dark mb-6">Ready to Explore Our Collection?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of readers who have already discovered the joy of BookHaven. Start your reading journey today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/all-books" className="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-md font-medium shadow-md hover:shadow-lg transition duration-300">
              Browse Books
            </a>
            <a href="/register" className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-md font-medium transition duration-300">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About