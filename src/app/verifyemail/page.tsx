'use client'

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function VerifyEmailPage() {
    const [token, setToken] = useState('')
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', {token})
            setVerified(true)
        } catch(error: any) {
            setError(true)
            console.log('error.response.data in src/app/verifyemail', error.response.data)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split('=')[1]
        setToken(urlToken || '')
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

    return (
        <div className='flex flex-col justify-evenly items-center h-screen'>
            <h1>VERIFY EMAIL</h1>
            <h2>{token ? `${token}` : 'no token'}</h2>

            {verified && (
                <div className='flex flex-col items-center'>
                    <h2>Email Verified</h2>
                    <button
                        className='bg-teal-600 text-white p-2 mt-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600'
                    >
                        <Link href='/login'>Login</Link>
                    </button>
                    
                </div>
            )}

            {error && (
                <div>
                    <h2>Error</h2>
                </div>
            )}
        </div>
    )
}