// src/hooks/useMe.js
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const useMe = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')
    
    useEffect(() => {
        if (!token) {
            setUser(null)
            setLoading(false)
            return
        }

        try {
            const decoded = jwtDecode(token)
            const userId = decoded.userId

            axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/me?userId=${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                setUser(response.data.user)
            }).catch((e) => {
                console.error("Failed to fetch user profile: ", e)
                setUser(null)
            }).finally(() => {
                setLoading(false)
            })
            
        } catch(e) {
            console.error("Invalid token found: ", e)
            localStorage.removeItem('token')
            setUser(null)
            setLoading(false)
        }
    }, [token])

    return {user, loading};
}

export default useMe