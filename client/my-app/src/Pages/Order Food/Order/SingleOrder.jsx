import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useCart from "../../../hooks/useCart";


const SingleOrder = ({ item }) => {

    const { name, image, recipe, price, _id } = item
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [, , refetch] = useCart();
    const [loading, setLoading] = useState(false)


    const handleCart = item => {
        // console.log(item)

        if (user) {
            Swal.fire({
                title: "Are you sure?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
            }).then((result) => {
                if (result.isConfirmed) {
                    setLoading(true)
                    const cartItem = {
                        name: name,
                        image: image,
                        recipe: recipe,
                        price: price,
                        email: user.email
                    }

                    fetch('https://bistro-boss-roan.vercel.app/carts', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(cartItem)
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            // console.log(data)
                            setLoading(false)
                            if (data.insertedId) {

                                refetch();

                                Swal.fire({
                                    icon: "success",
                                    title: "Item Added Successfully",
                                });
                            }
                        })
                }
            });
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Login First",
            });
            navigate('/login')
        }
    }

    return (
        <div>

            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img
                        src={image}
                        alt="Shoes"
                        className="rounded-xl lg:h-[14rem] h-[5rem]"
                    />
                </figure>
                <p className="bg-orange-500 text-xl font-abc font-medium p-1 rounded-xl text-white absolute right-12 top-14">${price}</p>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions">
                       {
                        loading ?<span className="loading loading-ring loading-lg"></span> : 
                         <button onClick={() => handleCart(item)} style={{ borderRadius: "0.5rem", borderBottom: "3px solid #1F2937" }} className='btn btn-ghost hover:bg-black text-xl font-medium text-orange-500 hover:text-orange-400'>Add To Cart</button>
                       }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SingleOrder;
