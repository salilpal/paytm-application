import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useMe from '../../hooks/useMe'
import Loader from '../common/Loader'

const Navbar = () => {
  const {user, loading} = useMe()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/signin')
    }
  }, [user, loading, navigate])

  if (loading) {
    return (
      <Loader></Loader>
    )
  }

  return (
    <div className='w-full h-18 grid grid-cols-12'>
      <div 
        className='col-span-10 justify-self-start my-auto pl-20 font-bold text-2xl cursor-pointer'
        >
        Paytm
      </div>
      <div className='col-span-1 justify-self-center my-auto text-2xl font-bold'>Hello, {user.username}</div>
      <div 
        className='col-span-1 justify-self-center my-auto text-2xl font-bold'
        >
          <Link to='/profile'>
          U
          </Link>
      </div>
    </div>
  )
}

export default Navbar