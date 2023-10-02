'use client'

import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

function UserProfile({params}: any) {
  console.log('params in app/profile/[username]/page.tsx', params)
  const router = useRouter()

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

  return (
    <div className='flex flex-col justify-evenly items-center h-screen'>
      {params.username}
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

export default UserProfile