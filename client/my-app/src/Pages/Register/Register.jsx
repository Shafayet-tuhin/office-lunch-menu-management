import React, { useContext } from 'react'
import logo from '../../assets/login/signup.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { AuthContext } from '../../Context/AuthProvider'
import Swal from 'sweetalert2'
import { updateProfile } from 'firebase/auth'

const Register = () => {

  const { createUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = (e) => {

    e.preventDefault();

    const name = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value

    createUser(email, password)
    .then((res) => {
      const user = res.user;
      console.log(user);
  
      return updateProfile(user, { displayName: name })
        .then(() => {

          fetch('https://bistro-boss-roan.vercel.app/users' , {
            method : "POST",
            headers : {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name : name, 
              email : email,
              password : password,
              role : "user"
            })
          })


          Swal.fire({
            title: `Registered Successfully , Welcome, ${name}`,
            icon: "success"
          });
  
          navigate('/');
        });
    })
    .catch((err) => {
      Swal.fire({
        title: `${err.message}`,
        icon: "error"
      });

    });
  

    console.log(name, email, password)
  }

  return (
    <div className="my-20">

      <Helmet>
        <title>Register Page</title>
      </Helmet>

      <div className="hero-content flex-col lg:flex-row">
        <div className="mr-12 w-1/2">
          <img src={logo} alt="" />
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit} >
            <h1 className="text-5xl font-bold text-center">Register</h1>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" placeholder="Name" className="input input-bordered" name='name' required />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" className="input input-bordered" name='email' required />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" className="input input-bordered" name='password' required />

            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary bg-[#FF3811] border-none text-white">Sign In</button>
            </div>

            <div className='flex flex-col items-center mt-4 gap-4'>
              <p className='text-gray-600 text-base font-medium'>Dont have an account? <Link className=' text-lg text-[#FF3811]' to='/login' >LogIn</Link> </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register