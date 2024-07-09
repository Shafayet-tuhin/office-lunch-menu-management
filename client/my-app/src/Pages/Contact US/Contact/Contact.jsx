import React from 'react'
import contactcover from '../../../assets/contact/banner.jpg'
import Cover from './../../Shared/Cover/Cover';
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { IoTimeSharp } from "react-icons/io5";
import ContactFrom from '../Contact Form/ContactFrom';
import { Helmet } from 'react-helmet-async';

const Contact = () => {


    return (
        <div>
            <Helmet>
        <title>Contact Us</title>
      </Helmet>

            <Cover img={contactcover} title="CONTACT US" para="Would you like to try a dish?" />

            <div className='flex flex-col items-center gap-4 mb-12'>
                <p className='text-[#D99904] italic text-xl font-normal'>---Visit Us---</p>
                <hr className='w-[22rem]' />
                <p className='text-[#151515] font-normal text-[2.5rem] font-abc'>OUR LOCATION</p>
                <hr className='w-[23rem]' />
            </div>


            <div className='flex flex-col lg:flex-row gap-6 justify-center lg:mb-[10rem] mb-16'>

                <div className='flex flex-col items-center'>
                    <p className='text-4xl lg:px-[12rem] px-44 lg:py-6 py-4 bg-[#D1A054] text-white rounded-xl'> <BiSolidPhoneCall /></p>
                    <div>
                        <div className='bg-[#F3F3F3] flex flex-col gap-4 items-center px-[6rem] py-6 lg:py-[3rem] rounded-xl' >
                            <p className='text-2xl font-medium'>PHONE</p>
                            <p className='text-base font-normal'>+38 (012) 34 56 789</p>
                        </div>
                    </div>
                </div>
                

                <div className='flex flex-col items-center'>
                    <p className='text-4xl lg:px-[12rem] px-44 lg:py-6 py-4 bg-[#D1A054] text-white rounded-xl'> <FaLocationDot /></p>
                    <div>
                        <div className='bg-[#F3F3F3] flex flex-col gap-4 items-center px-[6rem] py-6 lg:py-[3rem] rounded-xl' >
                            <p className='text-2xl font-medium'>ADDRESS</p>
                            <p className='text-base font-normal'>Chittagong , Bangladesh</p>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col items-center'>
                    <p className='text-4xl lg:px-[12rem] px-44 lg:py-6 py-4 bg-[#D1A054] text-white rounded-xl'> <IoTimeSharp /></p>
                    <div>
                        <div className='bg-[#F3F3F3] flex flex-col gap-4 items-center px-[6rem] py-6 lg:py-[3rem] rounded-xl' >
                            <p className='text-2xl font-medium'>WORKING HOURS</p>
                            <p className='text-base font-normal'>Mon - Fri: 08:00 - 22:00</p>
                        </div>
                    </div>
                </div>

            </div>

            <ContactFrom/>


        </div>
    )
}

export default Contact