import React, { useState, useEffect } from 'react'
// import { useJwt } from 'react-jwt'

// BUG-I can access the token but cannot access the userId embedded in the token

const Navbar = () => {
  const [username, setUsername] = useState('Guest')
  // const token = localStorage.getItem('token')
  // if (token) {
  //   console.log(`Retrieved token - ${token}`)
  // }
  // const { decodedToken, isExpired } = useJwt(token)

  // if (decodedToken && !isExpired) {
  //   console.log(decodedToken)
  //   userId = decodedToken.userId
  //   console.log(userId)
  // }
  // useEffect(() => {
  //   // If token exists, is valid, and contains a name/username field
  //   if (decodedToken && !isExpired) {
  //     console.log("Decoded token:", decodedToken);
  //     // Adjust 'name' or 'username' based on your actual JWT payload structure
  //     setUsername(decodedToken.userId || "User");
  //   }
  // }, [decodedToken, isExpired]);
    

  return (
    <div className='w-full h-18 grid grid-cols-12'>
      <div 
        className='col-span-10 justify-self-start my-auto pl-20 font-bold text-2xl cursor-pointer'
        >
        Paytm
      </div>
      <div className='col-span-1 justify-self-center my-auto text-2xl font-bold'>Hello {username}</div>
      <div className='col-span-1 justify-self-center my-auto text-2xl font-bold'>U</div>
    </div>
  )
}

export default Navbar