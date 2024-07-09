import React, { useEffect, useState } from 'react'
import SingleMenuItem from '../../Shared/Menu Item/SingleMenuItem';
import useMenu from './../../../hooks/useMenu';
import { Link } from 'react-router-dom';

const Menu = () => {

    const [menu] = useMenu() 
    const popular = menu.filter(item => item.category === 'popular')


    return (
        <div className='mb-32'>
            <div className='flex flex-col items-center gap-4 mb-12'>
                <p className='text-[#D99904] italic text-xl font-normal'>---Check it out---</p>
                <hr className='w-[22rem]' />
                <p className='text-[#151515] font-normal text-[2.5rem] font-abc'>FROM OUR MENU</p>
                <hr className='w-[23rem]' />
            </div>

            <div className='grid lg:grid-cols-2 grid-cols-1 gap-6' >
                {
                    popular.map((item , ind) => {
                        return <SingleMenuItem key={ind} item={item} />
                    })
                }
            </div>

            <div className='flex justify-center mt-12'>
              <Link to= '/menu'>  <button style={{ borderRadius: "0.5rem", borderBottom: "3px solid #1F2937" }} className='btn btn-ghost hover:bg-black text-xl font-medium text-[#1F2937] hover:text-orange-400'> View Full  Menu</button></Link>
            </div>


            {/* Call Us Now */}

            <div className='mt-20'>
                <p className='text-center py-14 lg:px-[21rem] lg:py-24 bg-black text-orange-500 rounded-2xl font-semibold lg:text-5xl text-2xl'>Call Us: +880-01821853280</p>
            </div>

            {/* Chef recomendations */}

            <div className='mt-20'>
                <div className='flex flex-col items-center gap-4 mb-12'>
                    <p className='text-[#D99904] italic text-xl font-normal'> ---Should Try--- </p>
                    <hr className='lg:w-[22rem] w-full' />
                    <p className='text-[#151515] font-normal text-3xl lg:text-[2.5rem] font-abc'>CHEF RECOMMENDS</p>
                    <hr className='lg:w-[22rem] w-full' />
                </div>


                <div className='flex flex-col lg:flex-row justify-center gap-8 lg:gap-24' >



                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Caeser Salad</h2>
                            <p>ILettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
                        </div>
                        <figure><img src="https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-8-370x247.jpg"  alt="Shoes" /></figure>
                    </div>




                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Fish Parmentie</h2>
                            <p>Sautéed breaded veal escalope with watercress, lemon and veal jus</p>
                        </div>
                        <figure><img src="https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-4-370x247.jpg" alt="Shoes" /></figure>
                    </div>




                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Chicken and Walnut Salad</h2>
                            <p>Pan roasted pork belly with gratin potato, braised Savoy cabbage, apples</p>
                        </div>
                        <figure><img src="https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-3-370x247.jpg" alt="Shoes" /></figure>
                    </div>



                </div>


            </div>


        </div>
    )
}

export default Menu