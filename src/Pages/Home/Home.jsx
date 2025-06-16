import React from 'react'
import Intro from './Intro'
import BookCategory from './BookCategory'

const Home = () => {
  return (
    <div className="min-h-screen">
      <Intro />
      <BookCategory />
      
      {/* Add other home page sections below */}
    </div>
  )
}

export default Home