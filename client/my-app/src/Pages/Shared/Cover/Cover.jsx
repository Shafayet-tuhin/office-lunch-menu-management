import React from 'react'

const Cover = ({ img, title, para }) => {
    return (
        <div style={{ backgroundImage: `url(${img})` }} className='bg-cover mb-32 rounded-lg'>

            <div className='text-white font-abc '>
                <div className='flex justify-center py-11 lg:py-32 '>
                    <div className='lg:px-40 px-8 py-11 lg:py-14 bg-opacity-60 bg-black text-center rounded-2xl'>
                        <p className='text-4xl lg:text-[5rem] font-bold '>{title}</p>
                        <p className='text-base lg:text-xl font-semibold'>{para}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Cover