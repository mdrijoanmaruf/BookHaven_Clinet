import React from 'react'
import Intro from './Intro'
import BookCategory from './BookCategory'
import FeaturedBooks from './FeaturedBooks'
import Testimonials from './Testimonials'
import Newsletter from './Newsletter'

const Home = () => {
  return (
    <div className="min-h-screen">
      <Intro />
      <BookCategory />
      <FeaturedBooks />
      <Testimonials />
      <Newsletter />
      
      {/* Add other home page sections below */}
    </div>
  )
}

export default Home