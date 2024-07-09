import React from "react";
import useMenu from "../../../hooks/useMenu";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageItems = () => {

  const [menu,,refetch] = useMenu()

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

        fetch(`https://bistro-boss-roan.vercel.app/menu/${item._id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if (data.acknowledged) {
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
    <div className="w-full">
      <div className="flex flex-col items-center gap-4 mb-12">
        <p className="text-[#D99904] italic text-xl font-normal">
          ---Whats New ?---
        </p>
        <hr className="w-[22rem]" />
        <p className="text-[#151515] font-normal text-[2.5rem] font-abc">
          Manage Item
        </p>
        <hr className="w-[23rem]" />
      </div>





      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Food</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              menu.map((item, ind) => {
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
                    <td className="uppercase">{item.category}</td>
                    <td>${item.price}</td>
                    <td>
                     <Link to= {`/dashboard/updateitems/${item._id}`}> <button className='btn btn-outline text-white hover:text-orange-400 text-2xl bg-slate-800'> <FaEdit />  </button></Link>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(item)} className='btn btn-outline text-white hover:text-orange-400 text-2xl bg-slate-800'> <MdDelete />  </button>
                    </td>
                  </tr>
                )
              })
            }


          </tbody>
        </table> 
      </div>



    </div>
  );
};

export default ManageItems;
