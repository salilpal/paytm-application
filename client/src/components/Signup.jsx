import React, { useEffect, useState } from 'react'

function Signup () {
    const [ input, setInput ] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setInput((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    useEffect(() => {
        
    }, [input])

  return (
    <div className='flex items-center justify-center w-full bg-[#7f7f7f] h-screen'>
        <div className='flex flex-col items-center h-160 w-100 bg-[#ffffff] border-black border-0.5 rounded-2xl font-sans'>

        <div className='font-bold text-4xl mt-4'>Sign Up</div>
        <div className='text-[#6d717c] text-lg text-center pt-2 leading-tight'>Enter your information to create an <br /> account</div>

        <div className='w-full p-4'>
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

        <button 
            className='bg-[#18181a] py-2 px-30 text-white mt-2 font-semibold text-lg rounded-md'
        >
            Signup
        </button>
        <div className='mt-1'>Already have an account? <button>Login</button></div>

        </div>
    </div>
  )
}

export default Signup