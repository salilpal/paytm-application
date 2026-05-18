import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Users(props) {
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/all?user=${props.username}`)
        .then((response) => {
            setUsers(response.data.users)
        })
  }, [])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/bulk?filter=${filter}`)
        .then((response) => {
            setUsers(response.data.users)
        })
  }, [filter])

  return (
    <div className='w-full h-150'>
      <div className='w-full h-10 pt-1 pl-20 text-2xl font-semibold'>
        Users
      </div>

      <div className='w-full h-20'>
        <form className="mx-20 pt-4">
            <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-heading sr-only ">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
                </div>
                <input onChange={(e) => {
                    setFilter(e.target.value)
                }} type="search" id="search" className="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body rounded" placeholder="Search" required />
                <button type="button" className="absolute end-1.5 bottom-1.5 text-black bg-brand hover:bg-brand-strong box-border border border focus:ring-1 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none cursor-pointer">Search</button>
            </div>
        </form>
      </div>

      <div>
        
            {users.map((user) => <User key={user._id} user={user} />)}
      </div>
    </div>
  )
}

function User({user}) {
    const navigate = useNavigate()
    
    const handleClick = (firstName, lastName, id) => {
        // navigate(`/send?firstName=${firstName}lastName=${lastName}id=${id}`)
    }

    return (
    <div className='w-full grid grid-cols-12 h-15 text-xl font-semibold'>
        <div className='col-span-1 justify-self-center my-auto'>{user.username}</div>
        <div className='col-span-10 my-auto'>{user.firstName}</div>
        <button 
            className='col-span-1 justify-self-start my-auto bg-black text-white p-2 pl-3 pr-3 rounded cursor-pointer'
            onClick={(e) => {
                navigate(`/send?id=${user._id}&firstName=${user.firstName}&lastName=${user.lastName}`)
            }}
        >
            Send Money
        </button>
    </div>
    )
}

export default Users
// to build
// 1. search functionality
// 2. pagination
// 3. dividing into different components