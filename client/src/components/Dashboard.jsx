import React, { useEffect } from 'react'
import Navbar from './Dashboard/Navbar'
import Balance from './Dashboard/Balance'
import Users from './Dashboard/Users'
import useMe from '../hooks/useMe'
import { Navigate, useNavigate } from 'react-router-dom'
import Loader from './common/Loader'

function Dashboard () {
  const {user, loading} = useMe()
  const navigate = useNavigate()
  useEffect(() => {
    if (!loading && !user) {
      navigate('/signin')
    }
  })

  if (!user) {
    return (
      <Loader />
    )
  }
  
  return (
    <div className='h-screen w-full'>
        <Navbar />
        <Balance />
        <Users username={user.username}/>
    </div>
  )
}

export default Dashboard