import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useMe from '../hooks/useMe'
import Loader from './common/Loader'

function SendMoney () {
  const [amount, setAmount] = useState(0)
  const [message, setMessage] = useState('')
  const {user, loading} = useMe()
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')
  const firstName = searchParams.get('firstName')
  const firstLetter = firstName[0].toUpperCase()
  const lastName = searchParams.get('lastName')

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

  const handleClick = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/account/transfer`,
      {
        amount: amount,
        to: id
      }, {
        headers: {
        'Authorization': 'Bearer '+ localStorage.getItem('token'),
        'Content-Type': 'application/json'
        }
      }
    )
    setMessage(response.data.message)
  }

  function redirectToDashboard() {
    navigate('/')
  }

  return (
    <div className='bg-[#fff] w-full h-screen flex justify-center items-center flex-col'>
      <div className='bg-[#fff] w-120 h-100 rounded-xl text-black shadow-2xl'>
        <div className=' justify-center items-center flex pt-5 pb-5 text-2xl font-bold '>Send Money</div>

        <div className='flex grid grid-cols-12 pt-4 pb-4'>
          <div className='col-span-3 bg-green-500 w-15 h-15 ml-7 p-2 justify-self-center flex justify-center items-center text-3xl text-white rounded-full font-bold'>{firstLetter}</div>
          <div className='col-span-9 justify-self-start flex justify-center items-center text-2xl pl-3 pr-3'>{firstName} {lastName}</div>
        </div>

        <div className='w-full p-4 mt-4'>
          <div className=' w-full font-semibold'>Amount (in $)</div>
          <input
            onChange={(e) => {
              setAmount(e.target.value)
            }}
          className='w-full p-2 border-[#e5e5e7] border-1 rounded-md mt-2' type="number" placeholder='Enter amount' />
        </div>

        <div className='w-full flex justify-center items-center'>
        <button
         className='flex w-90 bg-green-500 py-3 justify-center text-white mt-2 font-semibold text-xl rounded-md cursor-pointer'
         onClick={handleClick}
         >Initiate Transfer</button>
        </div>
      </div>
      
      <div className='w-120 h-10 flex items-center pl-10 text-xl text-red-700 '>
        {message}
      </div>
      {message && (
        <div className='flex cursor-pointer hover:text-blue-500' onClick={redirectToDashboard}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
        </svg>
        <div className='font-semibold'>Back to Dashboard</div>
      </div>
      )}
    </div>
  )
}

export default SendMoney