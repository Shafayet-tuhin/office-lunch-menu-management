import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { FaUserCircle } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import Swal from 'sweetalert2'
import { RiAdminFill } from "react-icons/ri";
import { GrUserAdmin } from "react-icons/gr";
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../Context/AuthProvider'


const AllUsers = () => {

  const {user} = useContext(AuthContext)
  const token = localStorage.getItem('token')

  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('https://bistro-boss-roan.vercel.app/users' , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      return res.json()
    },
  })

const navigate = useNavigate()


  const switchRole = (item) => {
   
    const newRole = item.role === 'user' ? 'admin' : 'user';


    Swal.fire({
      title: "Are you sure?",
      text:  `Do you want to update the role to ${newRole}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!"
    }).then((result) => {
      if (result.isConfirmed) {

        fetch(`https://bistro-boss-roan.vercel.app/users/${item._id}`, {
          method : 'PUT' ,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ role: newRole })
        })
          .then(res => res.json())
          .then(data => {
         
            if (data.acknowledged) {
              refetch()
              Swal.fire({
                title: "Upadted!",
                text: `Role has been updated to ${newRole}.`,
                icon: "success"
              });
            }
          })

      }
    });
  }

  return (
    <div className='w-full'>


      <Helmet>
        <title>All User</title>
      </Helmet>
    
       
       <div className='flex items-center flex-col gap-2'>
                  <h1>All User</h1>
                  <p>Total User : {users.length} </p>
       </div>


      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((item, index) => {
                return (
                  <tr key={item._id}>

                    <td> {index + 1} </td>

                    <td>
                      <div className="flex items-center gap-3">
                        <div className="mask mask-squircle h-12 w-12">
                          {item.image ? (
                            <img className='w-11 rounded-2xl' src={item.image} alt="User" />
                          ) : (
                            <FaUserCircle className='w-11 h-11' />
                          )}
                        </div>
                      </div>
                    </td>
                    <td>{item.name} </td>
                    <td>{item.email}</td>
                    <td className='uppercase'>{item.role} </td>

                    <td>  
                         <button className='btn' onClick={() => switchRole(item)}>
                              {
                                item.role === 'user'? <> Make Admin <GrUserAdmin /></> : <>Make User<RiAdminFill /> </>
                              }
                         </button>
                       </td>
                  </tr>

                )
              })
            }
          </tbody>
        </table>
      </div>


    </div>
  )
}

export default AllUsers