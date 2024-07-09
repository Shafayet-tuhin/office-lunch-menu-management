import React from 'react'
import useCart from '../../../hooks/useCart'
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import { MdOutlinePriceChange } from "react-icons/md";
import { SiCashapp } from "react-icons/si";
import { FaOpencart } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useState } from 'react';


const MyCart = () => {

  const [isPending, cart, refetch] = useCart()
  const [loading, setLoading] = useState(false)
  const total = cart.reduce((sum, item) => item.price + sum, 0)



  const handleDelete = (item) => {

    console.log(item)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true)

        fetch(`https://bistro-boss-roan.vercel.app/carts/${item._id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if (data.acknowledged) {
              setLoading(false)
              refetch()
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          })

      }
    });
  }



  return (
    <div className='w-full'>


      <div className='flex justify-center items-center flex-col mb-8'>
        <div className="flex flex-col items-center gap-4 mb-8">
          <p className="text-[#D99904] italic text-3xl font-abc">
            ---Cart Section---
          </p>
          <hr className="lg:w-[22rem] w-full" />
        </div>
        <div className='flex flex-col lg:flex-row items-center gap-4 p-4 bg-cyan-800 font-abc lg:text-2xl lg:font-semibold text-white rounded-xl'>
          <h3 className='mr-4 flex items-center gap-2'> <FaOpencart /> Total Items: {cart.length}</h3>
          <h3 className='mr-4 flex items-center gap-2 '><MdOutlinePriceChange className='text-2xl' />Total Price : ${total.toFixed(2)}</h3>
        </div>
        <Link to='/dashboard/payment' >
          <button className='btn bg-blue-500 hover:bg-blue-600 mt-2 text-white px-4 py-2 rounded-lg'>
            <SiCashapp /> Pay Now
          </button>
        </Link>
      </div>




      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className='lg:text-xl  bg-sky-800 text-white'>
            <tr>
              <th>#</th>
              <th>Food</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='bg-slate-200  text-black lg:text-lg'>
            {
              cart.map((item, ind) => {
                return (
                  <tr key={item._id}>
                    <td> {ind + 1} </td>
                    <td>

                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>

                    </td>
                    <td>
                      {item.name}
                    </td>
                    <td>${item.price}</td>
                    <td>
                      {
                        loading ? <span className="loading loading-ring loading-lg"> </span> : 
                        <button onClick={() => handleDelete(item)} className='btn btn-outline text-white bg-slate-800 hover:text-orange-400 text-2xl'>
                          <MdDelete />
                        </button>
                      }

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

export default MyCart