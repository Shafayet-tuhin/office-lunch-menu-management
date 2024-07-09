import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import { MdFileDownloadDone } from "react-icons/md";
import { useQuery } from '@tanstack/react-query';


const PaymentHistory = () => {
  const { user } = useContext(AuthContext);

  // const [paymentHistory, setPaymentHistory] = useState([]);

  // useEffect(() => {
  //   if (user && user.email) {
  //     fetch(`https://bistro-boss-roan.vercel.app/payment/${user.email}`)
  //       .then(response => response.json())
  //       .then(data => {
  //         // console.log(data);
  //         setPaymentHistory(data);
  //       })
  //       .catch(error => {
  //         console.error("Error fetching payment history:", error);
  //       });
  //   }
  // }, [user]);


  const token = localStorage.getItem('token');

  const {data : paymentInfo= [] } = useQuery({
    queryKey : ['payment' , user.email] ,
    queryFn : async () => {
      const res = await fetch(`https://bistro-boss-roan.vercel.app/payment/${user.email}`,{
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      })
      return res.json();
    }
  })

  return (
    <div className='w-full'>
          <h2 className='text-2xl font-bold mb-4'>Total Transactions Done: {paymentInfo.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className='text-xl  bg-sky-800 text-white'>
            <tr>
              <th>#</th>
              <th>Item Names</th>
              <th>Amount</th>
              <th>Order Status</th>
              <th>Payment Status</th>
              <th>Date & Time</th>
            </tr>
          </thead>
          <tbody className='bg-slate-600 text-white text-lg'>
            {
              paymentInfo.map((payment, index) => {
                return (
                  <tr key={payment._id}>
                    <td>{index + 1}</td>
                    <td>
                      <ul>
                        {payment.itemName.map((name, i) => (
                          <li key={i}> {i+1} : {name}</li>
                        ))}
                      </ul>
                    </td>
                    <td>${payment.amount}</td>
                    <td>{payment.orderStatus}</td>
                    <td><MdFileDownloadDone className='text-green-500 text-3xl mx-auto'/></td>
                    <td>{new Date(payment.timestamp).toLocaleString()}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
