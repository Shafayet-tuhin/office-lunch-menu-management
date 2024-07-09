import React from 'react';
import menuPic from '../../../assets/home/featured.jpg';
import { Link } from 'react-router-dom';

const MenuReview = () => {
    return (
        <div className='relative mb-32'> {/* Add relative positioning */}
            {/* Background image */}
            <div className='absolute inset-0 ' style={{ backgroundImage: `url(${menuPic})`, zIndex: -1 }}></div>

            {/* Tint overlay */}
            <div className='absolute inset-0 bg-black opacity-60'></div>

            <div className='lg:px-[11rem] py-8 lg:py-20 relative z-10'> {/* Ensure content appears above the overlay */}

                <div className='flex flex-col items-center gap-4 mb-12 text-white'>
                    <p className='italic text-xl font-normal'>---Check it out---</p>
                    <hr className='lg:w-[22rem] w-full' />
                    <p className=' font-normal lg:text-[2.5rem] text-3xl font-abc'>FROM OUR MENU</p>
                    <hr className='lg:w-[23rem] w-full' />
                </div>

                <div className='flex flex-col lg:flex-row items-center gap-4 lg:gap-16 text-[#FFF]'>
                    <img src={menuPic} alt="" className='lg:w-[40.5rem] lg:h-[22rem] w-48 h-32 rounded-2xl' />
                    <div className='flex items-center flex-col gap-4'>
                        <div className='text-2xl leading-9 font-normal lg:text-start text-center'>
                            <p >March 20, 2023</p>
                            <p>WHERE CAN I GET SOME?</p>
                            <p className='text-base leading-7 mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                        </div>
                        <div className=''>
                            <Link to='/menu' > <button style={{ borderRadius: "0.5rem", borderBottom: "3px solid #1F2937", borderColor: "white" }} className='btn btn-ghost border-none hover:bg-white text-xl font-medium hover:text-orange-400'> Read More</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuReview;
