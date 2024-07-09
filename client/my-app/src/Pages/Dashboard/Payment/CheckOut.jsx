import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { AuthContext } from '../../../Context/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './PaymentStyle.css'

const CheckOut = ({ cart, price, refetch }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const { user } = useContext(AuthContext);
  const [transactionId, setTransactionId] = useState('');
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('https://bistro-boss-roan.vercel.app/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ price })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setClientSecret(data.clientSecret);
      });
  }, [price]);



  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });

    if (error) {
      console.log(error);
      setCardError(error.message);
    } else {
      setCardError('');
      //   console.log(paymentMethod);
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user.displayName,
          email: user.email
        },
      }
    });

    if (confirmError) {
      console.log("Error in Payment");
    } else {
      console.log(paymentIntent);

      if (paymentIntent.status === 'succeeded') {
        setLoading(false)

        Swal.fire({
          title: "Payment Done Successfully",
          icon: "success",
        });

        setTransactionId(paymentIntent.id)

        const paymentInfo = {
          email: user.email,
          amount: price,
          transactionId: paymentIntent.id,
          timestamp: new Date(),
          orderStatus: 'Pending',
          items: cart.map(item => item._id),
          itemName: cart.map(item => item.name)
        }

        fetch('https://bistro-boss-roan.vercel.app/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(paymentInfo)
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            refetch()
            navigate('/dashboard/mycart')
          })
      }

    }


  }

  return (
    <div className='w-2/3 mx-8'>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        {
          loading ?
            <span className="loading loading-bars loading-lg"></span>
            :
            <button type="submit" className="btn btn-neutral" disabled={!stripe || !clientSecret}>
              Pay
            </button>
        }
      </form>
      {cardError && <p>{cardError}</p>}
    </div>
  );
}

export default CheckOut;
