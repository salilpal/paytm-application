import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [username, setUsername] = useState('User')

  return (
    <div className='w-full h-18 grid grid-cols-12'>
      <div 
        className='col-span-10 justify-self-start my-auto pl-20 font-bold text-2xl cursor-pointer'
        >
        Paytm
      </div>
      <div className='col-span-1 justify-self-center my-auto text-2xl font-bold'>Hello, {username}</div>
      <div 
        className='col-span-1 justify-self-center my-auto text-2xl font-bold'
        >
          <Link to='/signin'>
          U
          </Link>
      </div>
    </div>
  )
}

export default Navbar