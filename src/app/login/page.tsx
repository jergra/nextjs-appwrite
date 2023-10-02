'use client'

import Link from 'next/link' 
import React from 'react' 
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

function Login() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: '',
        password: ''
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    const onLogin = async () => {
        try  {
            setLoading(true)
            const response = await axios.post('/api/users/login', user)
            console.log('login success in app/login/page.tsx', response.data)
            toast.success('login success')
            router.push('/profile')

        } catch(error: any) {
            console.log('login failed', error.message)
            toast.error(error.message)

        } finally {
            setLoading(false)
        }
    }

  return (
    <div className='flex flex-col justify-evenly items-center h-screen'>
        <div>{loading ? 'Processing' : 'LOGIN'}</div>
        <div  className='flex flex-col items-center'>
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
            onClick={onLogin}
            className={buttonDisabled ? 'bg-teal-500 text-white p-2 border border-gray-300 rounded-lg ml-2 focus:outline-none focus:border-gray-600'
                                        : 'bg-teal-600 text-white p-2 border border-gray-300 rounded-lg ml-2 focus:outline-none focus:border-gray-600'}
        >
            Login
        </button>
        <Link href='/signup'>
            <button 
                className='bg-teal-600 text-white p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600'
            >
                Go to Signup
            </button>
        </Link>
        
    </div>
  )
}

export default Login