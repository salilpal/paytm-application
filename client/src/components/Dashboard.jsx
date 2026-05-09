import React from 'react'
import Navbar from './Dashboard/Navbar'
import Balance from './Dashboard/Balance'
import Users from './Dashboard/Users'

function Dashboard () {
  // use grids
  return (
    <div className='h-screen w-full'>
      <Navbar />
      <Balance />
      <Users />
    </div>
  )
}

export default Dashboard