'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function Home() {
  const router = useRouter()

  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success('logout successful')
      router.push('/login')
    } catch(error: any) {
      console.log('error.message in app/page.tsx', error.message)
      toast.error(error.message)
    }
  }
  
  return (
    <main className='flex flex-col justify-evenly items-center h-screen'>
      <h1>HOME PAGE</h1>
      <button
        className='bg-teal-600 text-white p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600'
        onClick={() => router.push('/profile')}
      >
        Profile
      </button>
      <button
        className='bg-teal-600 text-white p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600'
        onClick={logout}
      >
        Logout
      </button>
    </main>
  )
}
