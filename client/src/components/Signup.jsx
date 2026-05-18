import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signup () {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    })

    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target

        setInput((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleClick = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
                firstName: input.firstName,
                lastName: input.lastName,
                username: input.username,
                password: input.password
            })
            const token = response.data.token
            localStorage.setItem("token", token)
            setMessage(response.data.message)
            const status = response.status
            if (response.status == 201) {
                navigate('/')
            }
        } catch (e) {
            setMessage(e.response.data.msg)
            console.error("Signup error:", e)
        }
    }

    function SignInButton() {
        navigate('/signin')
    }

  return (
    <div className='flex flex-col items-center justify-center w-full bg-[#7f7f7f] h-screen'>
        <div className='flex flex-col items-center h-145 w-100 bg-[#ffffff] border-black border-0.5 rounded-2xl font-sans'>

            <div className='font-bold text-4xl mt-4'>Sign Up</div>
            <div className='text-[#6d717c] text-lg text-center pt-2 leading-tight'>Enter your information to create an <br /> account</div>

            <div className='w-full p-4 mt-4'>
                <div className=' w-full font-semibold'>FirstName</div>
                <input 
                    className='w-full p-2 border-[#e5e5e7] border-1 rounded-md mt-2'
                    type="text" 
                    placeholder='John' 
                    name = "firstName"
                    value = {input.firstName}
                    onChange={handleChange}
                    />
            </div>

            <div className='w-full pl-4'>
                <div className=' w-full font-semibold'>LastName</div>
                <input 
                    className='w-full p-2 border-[#e5e5e7] border-1 rounded-md mt-2' 
                    type="text" 
                    placeholder='Doe' 
                    name = "lastName"
                    value = {input.lastName}
                    onChange={handleChange}
                />
            </div>

            <div className='w-full pl-4 mt-2'>
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
                Sign Up
            </button>
            <div className='mt-1'>Already have an account? <button className='underline cursor-pointer' onClick={SignInButton}>Sign In</button></div>

        </div>
        <div className='text-red-700 text-xl mt-2 w-100 pl-5'>
            {message}
        </div>
    </div>
  )
}

export default Signup