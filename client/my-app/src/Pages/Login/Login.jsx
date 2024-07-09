import React, { useContext, useEffect, useRef, useState } from 'react';
import logo from '../../assets/login/signin.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../Context/AuthProvider';
import useCart from '../../hooks/useCart';

const Login = () => {
  const { signIn, GoogleSignIn } = useContext(AuthContext);
  const captchaRef = useRef(null);
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();
  const [isPending, cart, refetch] = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await signIn(email, password);
      const user = res.user;
      await refetch(); // Refetch cart data
      navigate('/');
      Swal.fire({
        title: `Signed In Successfully, Welcome, ${user.displayName}`,
        icon: "success",
      });
    } catch (err) {
      Swal.fire({
        title: "Please Enter correct email and password",
        icon: "error",
      });
    }
    e.target.reset();
  };

  const handleValidate = (e) => {
    e.preventDefault();
    const value = captchaRef.current.value;
    if (validateCaptcha(value)) {
      setDisable(false);
    } else {
      Swal.fire({
        title: "Entered captcha is incorrect",
        icon: "error",
      });
      setDisable(true);
    }
  };

  const handleGoogle = async () => {
    try {
      const res = await GoogleSignIn();
      await fetch('https://bistro-boss-roan.vercel.app/users', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: res.user.displayName,
          email: res.user.email,
          image: res.user.photoURL,
          role: "user",
        }),
      });
      await refetch(); // Refetch cart data
      navigate('/');
      Swal.fire({
        title: `Signed In Successfully, Welcome, ${res.user.displayName}`,
        icon: "success",
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  return (
    <div className="my-20">
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row">
        <div className="mr-12 w-1/2">
          <img src={logo} alt="" />
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <h1 className="text-5xl font-bold text-center">Login</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" className="input input-bordered" name="email" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" className="input input-bordered" name="password" required />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <LoadCanvasTemplate />
              </label>
              <input type="text" placeholder="Type the captcha above" className="input input-bordered" ref={captchaRef} name="captcha" required />
              <button onClick={handleValidate} className="btn mt-2">Validate</button>
            </div>
            <div className="form-control mt-6">
              <button disabled={disable} className="btn btn-primary bg-[#FF3811] border-none text-white">Login</button>
            </div>
            <div className="flex flex-col items-center mt-4 gap-4">
              <p className="text-gray-700 text-lg font-medium">Or Login In with</p>
              <button className="text-3xl btn" onClick={handleGoogle}> <FcGoogle /> </button>
              <p className="text-gray-600 text-base font-medium">Don't have an account? <Link className="text-lg text-[#FF3811]" to="/register">Sign Up</Link> </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
