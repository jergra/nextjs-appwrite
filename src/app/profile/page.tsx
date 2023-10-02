'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

function Profile() {
  const router = useRouter()
  const [data, setData] = useState('nothing')
  
  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success('logout successful')
      router.push('/login')
    } catch(error: any) {
      console.log('error.message in app/profile/page.tsx', error.message)
      toast.error(error.message)
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    console.log('res.data in app/profile/page.tsx', res.data)
    //setData(res.data.data._id)
    setData(res.data.data.username)
  }

  return (
    <div className='flex flex-col justify-evenly items-center h-screen'>
      PROFILE
      <button
        className='p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600'
      >
        {data === 'nothing' ? 'No details' : <Link href={`/profile/${data}`}>{data}</Link>}
      </button>
      <button
        className='bg-teal-600 text-white p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600'
        onClick={getUserDetails}
      >
        Get User Details
      </button>
      <button
        className='bg-teal-600 text-white p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600'
        onClick={() => router.push('/')}
      >
        Home
      </button>
      <button
        className='bg-teal-600 text-white p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600'
        onClick={logout}
      >
        Logout
      </button>
    </div>
  )
}

export default Profile