import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Balance() {
  const [balance, setBalance] = useState(0)
  const token = localStorage.getItem('token')
//   console.log(token)
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/account/balance`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        setBalance(response.data.balance)
    })
  }, [token])
  return (
    <div className='w-full h-60'>
        <div className='h-full pt-22 pl-20 text-2xl font-semibold'>Your Balance ${balance}</div>
    </div>
  )
}

export default Balance