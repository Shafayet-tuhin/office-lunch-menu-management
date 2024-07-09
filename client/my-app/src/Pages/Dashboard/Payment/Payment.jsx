import React from 'react'
import Cover from '../../Shared/Cover/Cover'
import img from '../../../assets/Payment/payment.jpg'
import { loadStripe } from '@stripe/stripe-js'
import CheckOut from './CheckOut'
import { Elements } from '@stripe/react-stripe-js'
import useCart from '../../../hooks/useCart'


const stripePromise = loadStripe(`${import.meta.env.VITE_Payment_TOKEN}`)


const Payment = () => {
  
    const [, cart, refetch ] = useCart()

    const total = cart.reduce((sum, item) => item.price + sum, 0)

    const price = parseFloat(total.toFixed(2)); 


    console.log(total)

    return (
        <div className='w-full'>
            <div className='ml-8'>
                <Cover img={img} title="Payment" para="How would you like to Pay ?" />
            </div>

            <Elements stripe={stripePromise}>
                <CheckOut cart={cart} price={price} refetch={refetch}/>
            </Elements>



        </div>
    )
}

export default Payment