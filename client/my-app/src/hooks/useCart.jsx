import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { AuthContext } from "../Context/AuthProvider"
import useAxiosSecure from "./useAxiosSecure"

const useCart = () => {

    const token = localStorage.getItem('token')

    const {user} = useContext(AuthContext)

    const axiosSecure = useAxiosSecure()

    const { isPending, refetch , data : cart = [] } = useQuery({
        queryKey: ['cart' , user?.email],



        queryFn: async () => {
            const res = await fetch(`https://bistro-boss-roan.vercel.app/carts?email=${user.email}` , {
                headers: {
                    'authorization': `bearer ${token}`
                }  ,
            })
            return res.json()
        },


        
        // queryFn: async () => {
        //     const res = await axiosSecure(`/carts?email=${user.email}`)
        //     console.log(res)
        //     return res.data
        // },
      })
      return [ isPending, cart , refetch ]
}

export default useCart