import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="relative">
        <div className="w-20 h-20 border-primary border-4 rounded-full"></div>
        <div className="w-20 h-20 border-accent border-t-4 animate-spin rounded-full absolute top-0 left-0"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary-dark font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary">
            <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
          </svg>
        </div>
      </div>
      <div className="ml-4 text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Loading...
      </div>
    </div>
  )
}

export default Loader 