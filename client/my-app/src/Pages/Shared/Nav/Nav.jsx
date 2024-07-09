import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import Swal from 'sweetalert2';
import { FaUserCircle } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import useCart from '../../../hooks/useCart';

const Nav = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const [isPending, cart, refetch] = useCart();


  const navOption = (
    <>
      <li><Link className="hover:text-orange-400" to="/">Home</Link></li>
      <li><Link className="hover:text-orange-400" to="/menu">Our Menu</Link></li>
      <li><Link className="hover:text-orange-400" to="/order">Order Food</Link></li>
      <li><Link className="hover:text-orange-400" to="/contact">Contact Us</Link></li>
      <li><Link className="hover:text-orange-400" to="/dashboard/home">Dashboard</Link></li>
      <li>
        <Link className="hover:text-orange-400" to="/dashboard/mycart">
          <button className='flex gap-2 items-center'>
            <BsCart4 className='text-2xl' />
            <div className="badge text-xl">
              {
                user ? cart?.length || 0 : ""
              }

            </div>
          </button>
        </Link>
      </li>
    </>
  );

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged Out Successfully",
        });
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="navbar fixed z-10 opacity-70 bg-black max-w-screen-xl rounded-xl text-white font-abc">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-black">
            {navOption}
          </ul>
        </div>
        <Link to="/" className="px-4 text-white bg-opacity-20 border-none text-xl font-medium font-abc hover:text-orange-400">
          BISTRO BOSS
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg">
          {navOption}
        </ul>
      </div>
      <div className="navbar-end">
        {loading ? (
          <span className="loading loading-spinner loading-lg"></span>
        ) : user ? (
          <div className='flex items-center gap-2'>
            {user.photoURL ? (
              <img className='w-11 rounded-2xl' src={user.photoURL} alt="User" />
            ) : (
              <FaUserCircle className='w-11 h-11' />
            )}
            <button onClick={handleLogout} className="btn text-white bg-opacity-20 border-none hover:text-black text-base">Logout</button>
          </div>
        ) : (
          <Link to="/login" className="btn text-white bg-opacity-20 border-none hover:text-black text-base">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
