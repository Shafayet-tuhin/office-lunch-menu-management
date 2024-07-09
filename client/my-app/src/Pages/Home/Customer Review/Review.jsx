import React, { useEffect, useState } from 'react'
import SingleReview from './SingleReview'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import quote from '../../../assets/home/quote.png'

const Review = () => {

    const [review, setReview] = useState([])

    useEffect(() => {
        fetch('https://bistro-boss-roan.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReview(data))
    }, [])



    return (
        <div className='mb-32'>


            <div className='flex flex-col items-center gap-4 mb-12'>
                <p className='text-[#D99904] italic text-xl font-normal'>---What Our Clients Say---</p>
                <hr className='w-[22rem]' />
                <p className='text-[#151515] font-normal text-[2.5rem] font-abc'>TESTIMONIALS</p>
                <hr className='w-[23rem]' />
            </div>



            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                {
                    review.map((item, ind) => {
                        return (
                            <SwiperSlide key={ind}>
                                <div className='flex flex-col items-center gap-4 text-center' >
                                      <img src= { item.image } className='w-32 rounded-3xl' alt="" />  
                                    <Rating
                                        style={{ maxWidth: 180 }}
                                        value={item.rating}
                                        readOnly
                                    />

                                    <p className='text-[#444444] font-normal text-xl leading-8'>{item.details}</p>
                                    <p className='text-4xl font-medium text-[#CD9003]'>{item.name}</p>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    )
}

export default Review