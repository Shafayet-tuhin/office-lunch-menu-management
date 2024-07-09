import React from 'react'
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const useAdmin = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const {data : isAdmin , isLoading} = useQuery({
      queryKey : ['admin' , user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(`/user.admin/${user?.email}`)
        console.log(res)
        return res.data.admin
      }
    })
    return [isAdmin , isLoading]
}

export default useAdmin