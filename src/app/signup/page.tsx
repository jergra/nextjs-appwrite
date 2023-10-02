'use client'

import Link from 'next/link' 
import React, { useEffect } from 'react' 
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

function SignupPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        username: '',
        email: '',
        password: ''
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    
    const onSignup = async () => {
        try  {
            setLoading(true)
            const response = await axios.post('/api/users/signup', user)
            console.log('signup success in signup/page.tsx', response.data)
            router.push('/login')

        } catch(error: any) {
            console.log('signup failed', error.message)
            toast.error(error.message)

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

  return (
    <div className='flex flex-col justify-evenly items-center h-screen'>
        <div>{loading ? 'Processing' : 'SIGNUP'}</div>
        <div className='flex flex-col items-center'>
            <input
                className='p-4 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600'
                id='username'
                type='text'
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder='username'
            />
            <input
                className='p-4 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600'
                id='email'
                type='text'
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder='email'
            />
            <input
                className='p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600'
                id='password'
                type='password'
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder='password'
            />
        </div>
        <button 
            onClick={onSignup}
            className={buttonDisabled ? 'bg-teal-500 text-white p-2 border border-gray-300 rounded-lg ml-2 focus:outline-none focus:border-gray-600'
                                        : 'bg-teal-600 text-white p-2 border border-gray-300 rounded-lg ml-2 focus:outline-none focus:border-gray-600'}
        >
            Signup
        </button>
        <Link href='/login'>
            <button className='bg-teal-600 text-white p-2 border border-gray-300 rounded-lg ml-2 focus:outline-none focus:border-gray-600'>
                Go to Login
            </button>
        </Link>
        
    </div>
  )
}

export default SignupPage