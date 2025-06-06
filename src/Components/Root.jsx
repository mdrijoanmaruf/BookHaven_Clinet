import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useAuth } from '../Providers/AuthProvider'
import Loader from './Loader'

const Root = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default Root