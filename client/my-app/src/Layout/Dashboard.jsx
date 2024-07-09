import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { BsCart4 } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { GiWallet } from "react-icons/gi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import { FaBowlFood } from "react-icons/fa6";
import { RiCustomerService2Line } from "react-icons/ri";
import { Helmet } from 'react-helmet-async';
import useCart from '../hooks/useCart';
import { ImSpoonKnife } from "react-icons/im";
import { MdManageAccounts } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { AuthContext } from '../Context/AuthProvider';

const Dashboard = () => {

  const [isPending, cart, refetch] = useCart();
  const {isAdmin} = useContext(AuthContext)

  return (
    <div className="drawer lg:drawer-open">

      <Helmet>  
        <title>DashBoard Page</title> 
      </Helmet>

      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <Outlet />
        <label htmlFor="my-drawer-2" className="btn btn-neutral drawer-button mb-16 lg:hidden">
          Open Option Panel
        </label>
      </div>


      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-[#416b6b] text-white min-h-full w-80 p-4 text-[0.9rem]">
          {/* Sidebar content here */}

          <div className="divider text-base rounded-2xl py-3">Dashboard</div>

          {
            isAdmin ?   
              <>
                <li> <Link className="hover:text-orange-400" to= '/dashboard/home' > <FaHome />Admin Home </Link> </li>
                <li> <Link className="hover:text-orange-400" to='/dashboard/additem' > <ImSpoonKnife /> Add Items </Link> </li>
                <li> <Link className="hover:text-orange-400" to='/dashboard/manageitems' > <MdManageAccounts />  Manage Items </Link> </li>
                {/* <li> <Link className="hover:text-orange-400"> <FaBook /> Manage Bookings</Link> </li> */}
                <li> <Link className="hover:text-orange-400" to='/dashboard/allusers'> <FaUsers />  All Users</Link> </li>
              </>
              :
              <>
                <li> <Link className="hover:text-orange-400" to= '/dashboard/home' > <FaHome /> Home </Link> </li>
                <li> <Link className="hover:text-orange-400" to='/dashboard/mycart' >


                  <button className='flex gap-2 items-center'>
                    <BsCart4 /> My Cart
                    <div className="badge">
                      + {
                        cart?.length || 0
                      }

                    </div>
                  </button>

                </Link> </li>
                <li> <Link className="hover:text-orange-400" to='/dashboard/history' > <GiWallet />  Payment Hiatory </Link> </li>
                {/* <li> <Link className="hover:text-orange-400"> <FaRegCalendarAlt />  Reservations</Link> </li> */}
              </>
          }

          <div className="divider rounded-2xl text-base py-3">Homapage</div>

          <li><Link className="hover:text-orange-400" to='/'> <FaHome /> Home </Link> </li>
          <li><Link className="hover:text-orange-400" to="/menu"> <MdMenuBook /> Our Menu</Link></li>
          <li><Link className="hover:text-orange-400" to="/order"><FaBowlFood /> Order Food</Link></li>
          <li><Link className="hover:text-orange-400" to="/contact"> <RiCustomerService2Line />  Contact Us</Link></li>

        </ul>
      </div>
    </div>
  )
}

export default Dashboard