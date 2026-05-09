import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signin () {
  const [input, setInput] = useState({
    username: '',
    password: ''
  })

  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target

    setInput((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleClick = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signin`, {
        username: input.username,
        password: input.password
      })
      const token = response.data.token
      localStorage.setItem("token", token)
      setMessage(response.data.msg)
      const status = response.status
      if (response.status == 201) {
        navigate('/dashboard')
      }
    } catch (e) {
      setMessage(e.response.data.msg)
      console.error("Signin error:", e)
    }
  }

  function SignUpButton() {
    navigate('/signup')
  }

  return (
    <div className='w-full flex flex-col h-screen items-center justify-center bg-[#7f7f7f]'>
      <div className='w-100 h-105 flex flex-col bg-[#ffffff] items-center border-black border-0.5 rounded-2xl font-sans'>

          <div className='font-bold text-4xl mt-4'>Sign In</div>
          <div className='text-[#6d717c] text-lg text-center pt-2 leading-tight'>Enter your credentials to access your <br /> account</div>

          <div className='w-full p-4 mt-4'>
                <div className=' w-full font-semibold'>username</div>
                <input 
                    className='w-full p-2 border-[#e5e5e7] border-1 rounded-md mt-2'
                    type="text" 
                    placeholder='johndoe' 
                    name = "username"
                    value = {input.username}
                    onChange={handleChange}
                    />
          </div>

          <div className='w-full pl-4 mt-2'>
            <div className=' w-full font-semibold'>Password</div>
            <input 
              className='w-full p-2 border-[#e5e5e7] border-1 rounded-md mt-2' 
              type="password" 
              name = "password"
              value = {input.password}
              onChange={handleChange}
            />
          </div>

          <button onClick={handleClick}
            className='bg-[#18181a] py-2 px-30 text-white mt-2 font-semibold text-lg rounded-md cursor-pointer'
          >
            Sign In
          </button>
          <div className='mt-1'>Don't have an account? <button className='underline cursor-pointer' onClick={SignUpButton}>SignUp</button></div>
      </div>
      <div className='text-red-700 text-xl mt-2 w-100 pl-5'>
        {message}
      </div>
    </div>
  )
}

export default Signin