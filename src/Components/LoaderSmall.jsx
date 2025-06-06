import React from 'react'

const LoaderSmall = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="relative">
        <div className="w-8 h-8 border-primary border-2 rounded-full"></div>
        <div className="w-8 h-8 border-accent border-t-2 animate-spin rounded-full absolute top-0 left-0"></div>
      </div>
      <div className="ml-2 text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Loading...
      </div>
    </div>
  )
}

export default LoaderSmall 