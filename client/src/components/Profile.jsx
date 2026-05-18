import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import useMe from '../hooks/useMe'
import Loader from './common/Loader'

function Profile () {
  const {user, loading} = useMe()

  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/signin')
    }
  }, [user, loading, navigate])

  if (!user) {
    return (
        <Loader />
    )
  }

  const handleClick = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className='w-full flex flex-col h-screen items-center justify-center bg-[#7f7f7f]'>
      <div className='w-100 h-80 flex flex-col bg-[#ffffff] items-center justify-center border-black border-0.5 rounded-2xl font-sans'>
          <div className='font-bold text-4xl'>Profile</div>
          <div className='text-[#6d717c] text-lg text-center pt-2 leading-tight'>These are your profile details</div>
          <div className='text-center w-full text-xl pt-2 pb-2 mt-4'><b>Name:</b> {user.firstName} {user.lastName}</div>
          <div className='text-center w-full pt-2 pb-2 text-xl'><b>username:</b> {user.username}</div>

          <button onClick={handleClick}
            className='bg-[#18181a] py-2 px-7 text-white mt-6 font-semibold text-lg rounded-md cursor-pointer'
          >
            Log Out
          </button>
      </div>
    </div>
  )
}

export default Profile